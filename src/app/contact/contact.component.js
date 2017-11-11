import template from './contact.html';
import $ from 'jquery';

var contactCtrl = function (AppServices) {
  var contactInfo = this;
  AppServices.getPageData('homeData').then(function (data) {
    data = JSON.parse(data);
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
