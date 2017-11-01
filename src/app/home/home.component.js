import template from './home.html';

var homeCtrl = function (AppServices) {
  var home = this;
  AppServices.getHomeData().then(function (data) {
    home.mainPara = data.home.mainPara;
    home.subParas = data.home.subParas;
  });
}

export default {
  template: template,
  controller: ['AppServices', homeCtrl],
  controllerAs: 'home'
};
