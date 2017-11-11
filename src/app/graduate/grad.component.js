import $ from 'jquery';
import template from './grad.html';

var researchCtrl = function (AppServices, $scope, $mdDialog) {
  var research = this;
  $scope.loading = false;

  //Get the json data from the service($http)
  AppServices.getPageData('studentData').then(function (data) {
    data = JSON.parse(data);
    research.gradStudents = data.research.gradStudents;
    research.visitingScholar = data.research.visitingScholar;
    research.alumni = data.research.alumni;
  });

  $scope.sortingOptionsResearch = {
    'ui-floating': true,
    connectWith: ['.grad-project', '.grad-thesis', '.grad-phd', '.visit-scholar', '.alumni-project', '.alumni-thesis', '.alumni-phd'],
    cursor: 'move',
    cancel: ".unsortable",
    update: function (e, ui) { }
  };

  $scope.addPoint = function (model) {
    model.unshift({ 'edit': true, 'point': '' });
  };

  $scope.deletePoint = function (model, index) {
    if (!model[index].point || model[index].point == '' ) {
      model.splice(index, 1);
    } else {
      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to delete this research?')
        .ariaLabel('Delete Research Confirmation')
        .ok('YES')
        .cancel('CANCEL');

      $mdDialog.show(confirm).then(function () {
        model.splice(index, 1);
      }, function () { });
    }
  };

  $scope.saveResearch = function () {
    $scope.loading = true;
    var models = [
      research.gradStudents.mastersThesis,
      research.gradStudents.mastersProject,
      research.gradStudents.phdDissertation,
      research.alumni.mastersThesis,
      research.alumni.mastersProject,
      research.alumni.phdDissertation,
      research.visitingScholar
    ];
    models.forEach(function(element) {
      element.map(function (x) { x.edit = false; return x });
    }, this);
    AppServices.updateData('studentData', { 'research': research })
      .then(function (data) {
        if (data.updated) {
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Research Updated')
              .ok('OK')
          );
        }
      })
      .finally(function (data) {
        $scope.loading = false;
      });
  };

  /*-- Scroll to link --*/
  $('.scroller-link').click(function (e) {
    e.preventDefault(); //Don't automatically jump to the link
    var id;
    id = $(this).attr('href').replace('#', ''); //Extract the id of the element to jump to
    $('html,body').animate({
      scrollTop: $("#" + id).offset().top - 40
    }, 'normal');
  });
}

export default {
  template: template,
  controller: ['AppServices', '$scope', '$mdDialog', researchCtrl],
  controllerAs: 'research'
};
