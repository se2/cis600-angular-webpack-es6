/* global process */
import 'tinymce/tinymce.min.js';
import 'tinymce/themes/modern/theme.min.js';

/* import TinyMCE plugins */
import 'tinymce/plugins/textcolor/plugin.min.js';
import 'tinymce/plugins/colorpicker/plugin.min.js';
import 'tinymce/plugins/image/plugin.min.js';
import 'tinymce/plugins/link/plugin.min.js';
import 'tinymce/plugins/preview/plugin.min.js';
import 'tinymce/plugins/insertdatetime/plugin.min.js';

/* Angular */
import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngMessages from 'angular-messages';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import ngFileUpload from 'ng-file-upload';
import filter from 'angular-filter';
import $ from 'jquery';
import 'jquery-ui-bundle';
import uiSortable from 'angular-ui-sortable';
import uiTinymce from 'angular-ui-tinymce';

/* import CSS */
import 'tinymce/skins/lightgray/skin.min.css';
import 'tinymce/skins/lightgray/content.min.css';
import '../styles/main.scss';
import 'angular-material/angular-material.css';

/* app config */
import appConfig from './app.config';

/* app routing and services */
import appRoute from './app.route';
import appServices from './app.services';

// app components
import homeComponent from './home/home.component';
import pubComponent from './publications/pub.component';
import researchComponent from './graduate/grad.component';
import actComponent from './activities/act.component';
import contactComponent from './contact/contact.component';
import profileComponent from './profile/profile.component';
import peopleComponent from './people/people.component';

export default angular.module('csel', [
  ngAnimate,
  ngAria,
  ngMessages,
  ngSanitize,
  ngMaterial,
  ngResource,
  ngFileUpload,
  uiRouter,
  'ui.sortable',
  'ui.tinymce',
  filter
])
  .config(appConfig)
  .config(appRoute)
  .factory('AppServices', ['$rootScope', '$http', appServices])
  .directive('errSrc', function () {
    return {
      link: function (scope, element, attrs) {
        element.bind('error', function () {
          if (attrs.src != attrs.errSrc) {
            attrs.$set('src', attrs.errSrc);
          }
        });
      }
    }
  })
  .directive('autofocus', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      link: function ($scope, $element) {
        $timeout(function () {
          $element[0].focus();
        });
      }
    }
  }])
  .controller('AppCtrl', [
    '$rootScope',
    '$location',
    '$scope',
    '$compile',
    '$window',
    '$state',
    function ($rootScope, $location, $scope, $compile, $window, $state) {
      $rootScope.baseURL = 'http://www.cis.umassd.edu/~dluong1/csel-test/';
      // check logged-in state
      if ((sessionStorage.getItem('csel-users') && sessionStorage.getItem('csel-users') != '')
        && (sessionStorage.getItem('csel-account') && sessionStorage.getItem('csel-account') != '')) {
        $rootScope.loggedIn = true;
        $rootScope.account = JSON.parse(sessionStorage.getItem('csel-account'));
        if ($rootScope.account && $rootScope.account.role == 'admin') {
          $rootScope.isAdmin = true;
        } else {
          $rootScope.isAdmin = false;
        }
      } else {
        $rootScope.loggedIn = false;
      }

      // watch url
      var path = function () {
        return $location.path();
      };

      var urlWatch = $rootScope.$watch(path, function (newVal) {
        if (newVal === '/') {
          $('#navTabs li a').removeClass('active');
          $('#navTabs li.home a').addClass('active');
        } else {
          $('#navTabs li a').removeClass('active');
          $('#navTabs li.' + newVal.substr(1) + ' a').addClass('active');
        }
      });

      $rootScope.logout = function () {
        $rootScope.isAdmin = false;
        $rootScope.loggedIn = false;
        $rootScope.isEdit = false;
        // reset sessionStorage
        sessionStorage.removeItem('csel-common');
        sessionStorage.removeItem('csel-account');
        sessionStorage.removeItem('csel-users');
        if ($state.current.name == 'profile') {
          $state.go('home');
        }
      };

      // onClick Mobile Menu
      $rootScope.mobileMenu = function () {
        $('#navTabs').toggleClass('displayBlock');
        $('#navTabs').css({ opacity: 0 });
        $('#navTabs').animate({ opacity: 1 }, 300);
      };

      // onClick of the Nav Tabs Change Active Class
      $('#navTabs a').on('click', function () {
        $('#navTabs').removeClass('displayBlock');
        $(this).css({
          'border-size': 0 + 'px'
        });

        $('#navTabs a').removeClass('active');
        $(this).addClass('active');

        $('#viewContainer').css({
          display: 'none',
          opacity: 0
        });
        $('#viewContainer').animate({
          opacity: 1
        }, 300);
        $('#viewContainer').css({
          display: 'block'
        });
      });

      $('#navTabs').animate({
        opacity: 1
      }, 300);
      $('#viewContainer').css({
        "display": "block"
      });
      $('#viewContainer').animate({
        opacity: 1
      }, 300);

      //For Fixed Nav after offset
      var navpos = $('#viewContainer').offset();
      $(window).bind('scroll', function () {
        if ($(window).scrollTop() > navpos.top - 8) {
          $('#sideNav').addClass('fixed');
        } else {
          $('#sideNav').removeClass('fixed');
        }
      });

    }])
  .component('home', homeComponent)
  .component('publications', pubComponent)
  .component('research', researchComponent)
  .component('grantActivities', actComponent)
  .component('contactInfo', contactComponent)
  .component('people', peopleComponent)
  .component('profile', profileComponent);