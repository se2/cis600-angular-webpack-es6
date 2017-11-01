/**
 * Application route definition.
 */
export default function ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      component: 'home'
    })
    .state('publications', {
      url: '/publications',
      component: 'publications'
    })
    .state('research', {
      url: '/research',
      component: 'gradStudents'
    })
    .state('grantActivities', {
      url: '/grantActivities',
      component: 'grantActivities'
    })
    .state('contactInfo', {
      url: '/contactInfo',
      component: 'contactInfo'
    })
    .state('people', {
      url: '/people',
      component: 'people'
    })
    .state('profile', {
      url: '/profile',
      component: 'profile'
    });
  $urlRouterProvider.otherwise('/');
}