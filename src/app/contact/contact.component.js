import template from './contact.html';
import $ from 'jquery';

var contactCtrl = function (AppServices) {
  var contactInfo = this;
  AppServices.getHomeData().then(function (data) {
    contactInfo.director = data.contactInfo.director;
    contactInfo.staff = data.contactInfo.staff;
    contactInfo.location = data.contactInfo.location;
  });
}

export default {
  template: template,
  controller: ['AppServices', contactCtrl],
  controllerAs: 'contactInfo'
};
