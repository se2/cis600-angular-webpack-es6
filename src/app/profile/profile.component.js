import template from './profile.html';
import $ from 'jquery';

var profileCtrl = function (AppServices, $rootScope, $scope, $http, Upload) {
  $scope.defaultAvatar = "images/noimage.png";
  $scope.defaultForm = {
    avatar: $scope.defaultAvatar,
    type: 'graduate',
    year: 2016,
    school: 'UMass Dartmouth'
  }
  // $scope variables
  $scope.isEdit = false;
  $scope.formdata = {};
  $scope.credentials = {};
  $scope.common = {},
    $scope.forms = {};
  $scope.msg = {};
  $scope.users = [];
  $scope.ids = {};
  $scope.formdata = $scope.defaultForm;

  // check logged-in state
  if ((sessionStorage.getItem('csel-users') && sessionStorage.getItem('csel-users') != '')
    && (sessionStorage.getItem('csel-account') && sessionStorage.getItem('csel-account') != '')) {
    if ($rootScope.isAdmin) {
      $scope.credentials = $rootScope.account;
      if (sessionStorage.getItem('csel-common') && sessionStorage.getItem('csel-common') != '') {
        $scope.common = JSON.parse(sessionStorage.getItem('csel-common'));
      }
      AppServices.getUsersData().then(function (result) {
        $scope.users = result;
        $scope.ids = result.map(function (item) { return item["id"]; });
        sessionStorage.setItem('csel-users', JSON.stringify($scope.ids));
      });
    }
    $rootScope.loggedIn = true;
  } else {
    $rootScope.loggedIn = false;
  }

  $scope.range = function (min, max, step) {
    step = step || 1;
    var input = [];
    for (var i = min; i <= max; i += step) {
      input.push(i);
    }
    return input;
  };

  $scope.resetMsg = function () {
    $scope.msg = {};
  }

  $scope.submit = function (credentials) {
    $scope.formdata.searchInput = '';
    $scope.formdata = $scope.defaultForm;
    $scope.msg = {};
    AppServices.login($scope.credentials.username, $scope.credentials.password).then(function (result) {
      if (result.found) {
        if (result.common && result.common != {}) {
          $scope.common = result.common;
        }
        $rootScope.loggedIn = true;
        $rootScope.account = result.account;
        $rootScope.isAdmin = (result.account.role == 'admin') ? true : false;
        $scope.isEdit = false;
        $scope.users = result.users;
        $scope.ids = result.users.map(function (item) { return item["id"]; });
        sessionStorage.setItem('csel-account', JSON.stringify(result.account));
        sessionStorage.setItem('csel-common', JSON.stringify(result.common));
        sessionStorage.setItem('csel-users', JSON.stringify($scope.ids));
      } else {
        $rootScope.loggedIn = false;
        $scope.msg.error = "Incorrect username or password!";
      }
    });
  };

  $scope.editUser = function (selectedId) {
    AppServices.getUserData(selectedId).then(function (result) {
      if (result.found) {
        $scope.formdata = result.user;
        $scope.isEdit = true;
      }
    });
  };

  $scope.backToList = function () {
    $scope.msg = {};
    $scope.formdata = $scope.defaultForm;
    $scope.isEdit = false;
  }

  $scope.register = function () {
    $scope.formdata.avatar = $scope.defaultAvatar;
    if ($scope.formdata.middlename && $scope.formdata.middlename != '') {
      $scope.formdata.fullname = $scope.formdata.firstname + ' ' + $scope.formdata.middlename + '. ' + $scope.formdata.lastname;
    } else {
      $scope.formdata.fullname = $scope.formdata.firstname + ' ' + $scope.formdata.lastname;
    }
    if ($scope.formdata.type != 'alumni') {
      $scope.formdata.year = '';
    }
    AppServices.register($scope.formdata)
      .then(function (result) {
        if (Object.keys(result).length > 0) {
          // update current users list
          $scope.users.push(result);
          // reset form data
          $scope.formdata = $scope.defaultForm;
          $scope.forms.registerForm.$setPristine();
          $scope.forms.registerForm.$setUntouched();
          $scope.msg = {};
          $scope.msg.successRegister = 'Registered Successfully';
        } else {
          $scope.msg = {};
          // $scope.msg.errorRegister = 'Email already exists!';
        }
      });
  }

  $scope.changeAvatar = function () {
    if ($scope.forms.avatarForm.file.$valid && $scope.formdata.file) {
      $scope.upload($scope.formdata.file);
    }
  }

  $scope.upload = function (file) {
    Upload.upload({
      url: 'http://www.cis.umassd.edu/~dluong1/csel-test/data/changeAvatar.php',
      data: { file: file, 'userId': $scope.formdata.id }
    }).then(function (resp) {
      console.log('Success ' + resp.config.data.file.name + ' uploaded.');
      $scope.formdata.file = '';
      $scope.formdata.avatar = resp.data.avatar;
      delete resp.data.password;
      sessionStorage.setItem('csel-user', JSON.stringify(resp.data));
    }, function (resp) {
      console.log('Error status: ' + resp.status);
    }, function (evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      $scope.msg.uploadProgress = progressPercentage;
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  };

  $scope.studentSubmit = function () {
    if ($scope.formdata.middlename && $scope.formdata.middlename != '') {
      $scope.formdata.fullname = $scope.formdata.firstname + ' ' + $scope.formdata.middlename + '. ' + $scope.formdata.lastname;
    } else {
      $scope.formdata.fullname = $scope.formdata.firstname + ' ' + $scope.formdata.lastname;
    }
    if ($scope.formdata.type != 'alumni') {
      $scope.formdata.year = '';
    }
    AppServices.updateStudent($scope.formdata)
      .then(function (result) {
        if (result.updated) {
          var updatedIndex = $scope.users.findIndex(x => x.id == $scope.formdata.id);
          $scope.users[updatedIndex] = $scope.formdata;
          $scope.msg.successUpdate = 'Information updated';
        }
      });
  };

  $scope.socialSubmit = function () {
    AppServices.updateSocial($scope.formdata)
      .then(function (result) {
        if (result.updated) {
          $scope.msg.successSocial = 'Social profiles updated';
        }
      });
  };

  $scope.updatePassword = function (credentials) {
    if ($scope.credentials.newPassword == $scope.credentials.confirmPassword) {
      AppServices.updatePass($scope.credentials)
        .then(function (result) {
          if (result.updated) {
            delete result.account.hashed;
            $scope.credentials = $rootScope.account = result.account;
            sessionStorage.setItem('csel-account', JSON.stringify($scope.credentials));
            $scope.msg.errorUpdatePass = '';
            $scope.msg.successUpdatePass = 'Account updated';
            $scope.forms.updatePasswordForm.$setPristine();
            $scope.forms.updatePasswordForm.$setUntouched();
          } else {
            $scope.credentials = $rootScope.account;
            $scope.msg.successUpdatePass = '';
            $scope.msg.errorUpdatePass = result.error;
          }
        });
    } else {
      $scope.msg.errorUpdatePass = "Confirm password mismatch.";
    }
  };

  $scope.updateCommonPassword = function (common) {
    if ($scope.common.newPassword == $scope.common.confirmPassword) {
      AppServices.updatePass($scope.common)
        .then(function (result) {
          if (result.updated) {
            delete result.account.hashed;
            $scope.common = result.account;
            sessionStorage.setItem('csel-common', JSON.stringify($scope.common));
            $scope.msg.errorUpdateCommonPass = '';
            $scope.msg.successUpdateCommonPass = 'Account updated';
            $scope.forms.updateCommonPasswordForm.$setPristine();
            $scope.forms.updateCommonPasswordForm.$setUntouched();
          } else {
            $scope.msg.successUpdateCommonPass = '';
            $scope.msg.errorUpdateCommonPass = result.error;
          }
        });
    } else {
      $scope.msg.errorUpdateCommonPass = "Confirm password mismatch.";
    }
  }

  $scope.searchUser = function () {
    if (!$rootScope.isAdmin) {
      AppServices.getSearchUser($scope.formdata.searchInput.toLowerCase())
        .then(function (result) {
          $scope.msg = {};
          $scope.users = result;
          if ($scope.users.length == 0) {
            $scope.msg.searchNotFound = 'User Not Found. Please Register!'
          }
        });
    }
  };

  $scope.logout = function () {
    $rootScope.loggedIn = false;
    $rootScope.isAdmin = false;
    $rootScope.isEdit = false;
    // reset formdata
    $scope.formdata = $scope.defaultForm;
    $scope.credentials.username = {};
    $scope.common = {};
    // reset messages
    $scope.msg = {};
    // reset sessionStorage
    sessionStorage.removeItem('csel-account');
    sessionStorage.removeItem('csel-common');
    sessionStorage.removeItem('csel-users');
  };
}

export default {
  template: template,
  controller: [
    'AppServices',
    '$rootScope',
    '$scope',
    '$http',
    'Upload',
    profileCtrl
  ],
  controllerAs: 'profile'
};
