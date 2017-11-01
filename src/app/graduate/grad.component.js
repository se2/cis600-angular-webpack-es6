import template from './grad.html';
import $ from 'jquery';

var gradCtrl = function (AppServices) {
  var gradStudents = this;
  //Get the json data from the service($http)
  AppServices.getStudentData().then(function (data) {
    gradStudents.mastersThesisUnder = data.gradStudents.mastersThesisUnder;
    gradStudents.mastersProjectUnder = data.gradStudents.mastersProjectUnder;
    gradStudents.phdDissertationUnder = data.gradStudents.phdDissertationUnder;
    gradStudents.visitingScholar = data.gradStudents.visitingScholar;
    gradStudents.mastersThesisCommittee = data.gradStudents.mastersThesisCommittee;
    gradStudents.mastersProjectCommittee = data.gradStudents.mastersProjectCommittee;
    gradStudents.phdDissertationCommittee = data.gradStudents.phdDissertationCommittee;
  });

  /*-- Scroll to link --*/
  $(function () {
    /*-- Scroll to link --*/
    $('.scroller-link').click(function (e) {
      console.log("click");
      e.preventDefault(); //Don't automatically jump to the link
      var id;
      id = $(this).attr('href').replace('#', ''); //Extract the id of the element to jump to
      $('html,body').animate({
        scrollTop: $("#" + id).offset().top - 40
      }, 'normal');
    });

    //For Fixed Nav after offset
    var navpos = $('#viewContainer').offset();
    //console.log(navpos.top);
    $(window).bind('scroll', function () {
      if ($(window).scrollTop() > navpos.top - 8) {
        $('#sideNav').addClass('fixed');
      } else {
        $('#sideNav').removeClass('fixed');
      }
    });
  });
}

export default {
  template: template,
  controller: ['AppServices', gradCtrl],
  controllerAs: 'gradStudents'
};
