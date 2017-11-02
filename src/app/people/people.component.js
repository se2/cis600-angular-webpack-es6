import template from './people.html';
import dialog from './dialog.html';
import $ from 'jquery';

var peopleCtrl = function (AppServices, $rootScope, $scope, $mdDialog) {
  var people = this;
  $scope.defaultAvatar = 'images/noimage.png';

  AppServices.getUsersData().then(function (data) {
    people.data = data;
  });

  $scope.showDialog = function (userId, ev) {
    var idx = people.data.findIndex(x => x.id == userId);
    $rootScope.selectedUser = people.data[idx];
    $mdDialog.show({
      controller: ['$rootScope', '$scope', '$mdDialog', DialogController],
      template: dialog,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
  };

  var DialogController = function ($rootScope, $scope, $mdDialog) {
    $scope.hide = function () {
      $mdDialog.hide();
    };
    $scope.cancel = function () {
      $mdDialog.cancel();
    };
  }

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
  controller: ['AppServices', '$rootScope', '$scope', '$mdDialog', peopleCtrl],
  controllerAs: 'people'
};
