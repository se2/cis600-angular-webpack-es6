import template from './activities.html';
import $ from 'jquery';

var actCtrl = function (AppServices, $scope, $mdDialog) {
  var grantActivities = this;
  $scope.loading = false;

  AppServices.getPageData('grantActivities').then(function (data) {
    data = JSON.parse(data);
    grantActivities.data = data.grantActivities;
  });

  $scope.addPoint = function (model) {
    model.unshift({ 'edit': true, 'point': '' });
  };

  $scope.deletePoint = function (model, index) {
    var confirm = $mdDialog.confirm()
      .title('Are you sure you want to delete this activity?')
      .ariaLabel('Delete Activity Confirmation')
      .ok('YES')
      .cancel('CANCEL');

    $mdDialog.show(confirm).then(function () {
      model.splice(index, 1);
    }, function () { });
  };

  $scope.saveActs = function () {
    $scope.loading = true;
    grantActivities.data.map(function (x) { x.edit = false; return x });
    AppServices.updateData('grantActivities', { 'grantActivities': grantActivities.data })
      .then(function (data) {
        if (data.updated) {
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Grant Activities Updated')
              .ok('OK')
          );
        }
      })
      .finally(function (data) {
        $scope.loading = false;
      });
  };
}

export default {
  template: template,
  controller: ['AppServices', '$scope', '$mdDialog', actCtrl],
  controllerAs: 'grantActivities'
};
