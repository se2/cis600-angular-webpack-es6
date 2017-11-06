import $ from 'jquery';
import template from './grad.html';

var researchCtrl = function (AppServices, $scope, $mdDialog) {
  var research = this;
  //Get the json data from the service($http)
  AppServices.getStudentData().then(function (data) {
    data = JSON.parse(data);
    research.gradStudents = data.research.gradStudents;
    research.visitingScholar = data.research.visitingScholar;
    research.alumni = data.research.alumni;
  });

  $scope.sortingOptionsResearch = {
    'ui-floating': true,
    connectWith: ['.grad-project', '.grad-thesis', '.grad-phd', '.visit-scholar', '.alumni-project', '.alumni-thesis', '.alumni-phd'],
    cursor: 'move',
    cancel: ".unsortable",
    update: function (e, ui) {
      console.log(research);
    }
  }

  $scope.addPoint = function (model) {
    model.unshift({ 'edit': true, 'point': '' });
  };

  $scope.deletePoint = function (model, index) {
    var confirm = $mdDialog.confirm()
      .title('Are you sure you want to delete this research?')
      .ariaLabel('Delete Confirmation')
      .ok('YES')
      .cancel('CANCEL');

    $mdDialog.show(confirm).then(function () {
      model.splice(index, 1);
    }, function () {});
  }

  /*-- Scroll to link --*/
  $('.scroller-link').click(function (e) {
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
}

export default {
  template: template,
  controller: ['AppServices', '$scope', '$mdDialog', researchCtrl],
  controllerAs: 'research'
};
