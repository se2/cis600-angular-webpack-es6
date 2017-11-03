import template from './activities.html';
import $ from 'jquery';

var actCtrl = function (AppServices) {
  var grantActivities = this;
  AppServices.getHomeData().then(function (data) {
    data = JSON.parse(data);
    grantActivities.data = data.grantActivities;
  });
}

export default {
  template: template,
  controller: ['AppServices', actCtrl],
  controllerAs: 'grantActivities'
};
