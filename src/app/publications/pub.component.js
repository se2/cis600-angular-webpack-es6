import template from './publications.html';
import $ from 'jquery';

var pubCtrl = function (AppServices, $scope, $mdDialog) {
  var publications = this;
  $scope.loading = true;

  // Get the json data from the service($http)
  AppServices.getPageData('publicationData')
    .then(function (data) {
      data = JSON.parse(data);
      publications.umd09JP = data.publications.umd09JP;
      publications.umd03JP = data.publications.umd03JP;
      publications.umd91JP = data.publications.umd91JP;
      publications.books = data.publications.books;
      publications.proceedings = data.publications.proceedings;
      publications.umd09CP = data.publications.umd09CP;
      publications.umd03CP = data.publications.umd03CP;
      publications.umd91CP = data.publications.umd91CP;
      publications.techReports = data.publications.techReports;
      publications.thesisProject = data.publications.thesisProject;
    })
    .finally(function (data) {
      $scope.loading = false;
    });

  $scope.addPoint = function (model) {
    model.unshift({ 'edit': true, 'point': '' });
  };

  $scope.deletePoint = function (model, index) {
    if (!model[index].point || model[index].point == '') {
      model.splice(index, 1);
    } else {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete this publication?')
        .ariaLabel('Delete Publication Confirmation')
        .ok('YES')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function () {
        model.splice(index, 1);
      }, function () { });
    }
  };

  $scope.savePub = function () {
    $scope.loading = true;
    var models = [
      publications.umd09JP,
      publications.umd03JP,
      publications.umd91JP,
      publications.books,
      publications.proceedings,
      publications.umd09CP,
      publications.umd03CP,
      publications.umd91CP,
      publications.techReports,
      publications.thesisProject
    ];
    models.forEach(function (element) {
      element.map(function (x) { x.edit = false; return x });
    }, this);
    AppServices.backupData('publicationData')
      .then(function (backupResp) {
        if (backupResp.backup) {
          AppServices.updateData('publicationData', { 'publications': publications })
            .then(function (data) {
              if (data.updated) {
                $mdDialog.show(
                  $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Publications Updated')
                    .ok('OK')
                );
              }
            })
            .finally(function (data) {
              $scope.loading = false;
            });
        }
      });
  };

  /*-- Scroll to link --*/
  $('.scroller-link').click(function (e) {
    e.preventDefault(); //Don't automatically jump to the link
    var id;
    id = $(this).attr('href').replace('#', ''); //Extract the id of the element to jump to
    $('html,body').animate({
      scrollTop: $("#" + id).offset().top - 40
    }, 'slow');
  });
}

export default {
  template: template,
  controller: ['AppServices', '$scope', '$mdDialog', pubCtrl],
  controllerAs: 'publications'
};
