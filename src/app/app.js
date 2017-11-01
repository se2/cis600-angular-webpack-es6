/* global process */
import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngCookies from 'angular-cookies';
import ngMessages from 'angular-messages';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
import ngTranslate from 'angular-translate';
import ngTranslateLoaderStaticFiles from 'angular-translate-loader-static-files';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import ngFileUpload from 'ng-file-upload';
import filter from 'angular-filter';
import $ from 'jquery';

import '../styles/main.scss';
import 'angular-material/angular-material.css';

import config from 'app.config';

import appConfig from './app.config';
import appRoute from './app.route';
import appServices from './app.services';

// components
import homeComponent from './home/home.component';
import pubComponent from './publications/pub.component';
import gradComponent from './graduate/grad.component';
import actComponent from './activities/act.component';
import contactComponent from './contact/contact.component';
import profileComponent from './profile/profile.component';
import peopleComponent from './people/people.component';

export default angular.module('csel', [
  ngAnimate,
  ngAria,
  ngCookies,
  ngMessages,
  ngSanitize,
  ngMaterial,
  ngTranslate,
  ngTranslateLoaderStaticFiles,
  ngResource,
  ngFileUpload,
  uiRouter,
  filter
])
  .config(appConfig)
  .config(appRoute)
  .constant('CONFIG', config)
  .constant('ENVIRONNEMENT', process.env.ENV_NAME)
  .factory('AppServices', ['$http', appServices])
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
  .component('home', homeComponent)
  .component('publications', pubComponent)
  .component('gradStudents', gradComponent)
  .component('grantActivities', actComponent)
  .component('contactInfo', contactComponent)
  .component('people', peopleComponent)
  .component('profile', profileComponent)
  .controller('AppCtrl', [
    '$rootScope',
    '$location',
    '$scope',
    '$compile',
    '$window',
    function ($rootScope, $location, $scope, $compile, $window) {

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
        $(this).find('.sub-nav li a').removeClass('active');
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

      $window.onload = function () {
        $('#navTabs').animate({
          opacity: 1
        }, 300);
        $('#viewContainer').css({
          "display": "block"
        });
        $('#viewContainer').animate({
          opacity: 1
        }, 300);
      };

    }])
  .name;