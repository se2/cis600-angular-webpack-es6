import template from './people.html';
import $ from 'jquery';

var peopleCtrl = function (AppServices, $scope) {
  var people = this;
  $scope.defaultAvatar = 'images/noimage.png';

  AppServices.getUsersData().then(function (data) {
    people.data = data;
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
  controller: ['AppServices', '$scope', peopleCtrl],
  controllerAs: 'people'
};
