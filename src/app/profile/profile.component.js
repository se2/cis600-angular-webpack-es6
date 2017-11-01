import template from './profile.html';

var profileCtrl = function (AppServices, $rootScope, $scope, $http, Upload) {
  $scope.defaultAvatar = "images/noimage.png";
  // $scope variables
  $scope.isEdit = false;
  $scope.formdata = {};
  $scope.credentials = {};
  $scope.forms = {};
  $scope.msg = {};
  $scope.users = {};
  $scope.ids = {};
  $scope.formdata.avatar = $scope.defaultAvatar;

  // check logged-in state
  if (sessionStorage.getItem('csel-users') && sessionStorage.getItem('csel-users') != '') {
    AppServices.getUsersData().then(function (result) {
      $scope.users = result;
      $scope.ids = result.map(function (item) { return item["id"]; });
      sessionStorage.setItem('csel-users', JSON.stringify($scope.ids));
    })
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
    AppServices.login($scope.credentials.username, $scope.credentials.password).then(function (result) {
      if (result.found) {
        $scope.error = '';
        $rootScope.loggedIn = true;
        $scope.isEdit = false;
        $scope.users = result.users;
        $scope.ids = result.users.map(function (item) { return item["id"]; });
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
    $scope.formdata = {};
    $scope.isEdit = false;
  }

  $scope.register = function () {
    $scope.formdata.avatar = $scope.formdata.avatar ? $scope.formdata.avatar : $scope.defaultAvatar;
    AppServices.register($scope.formdata)
      .then(function (result) {
        if (Object.keys(result).length > 0) {
          // update current users list
          $scope.users.push($scope.formdata);
          // update user data
          $scope.formdata = {};
          $scope.formdata.type = 'graduate';
          $scope.formdata.avatar = $scope.defaultAvatar;
          $scope.forms.registerForm.$setPristine();
          $scope.forms.registerForm.$setUntouched();
          $scope.msg = {};
          $scope.msg.successRegister = 'Registered Successfully';
        } else {
          $scope.msg = {};
          $scope.msg.errorRegister = 'Email already exists!';
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
      url: 'http://www.cis.umassd.edu/~dluong1/csel/data/changeAvatar.php',
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
      AppServices.updatePass($scope.formdata.email, $scope.credentials.currentPassword, $scope.credentials.newPassword)
        .then(function (result) {
          if (result.updated) {
            $scope.msg.errorUpdatePass = '';
            $scope.msg.successUpdatePass = 'Password updated';
            $scope.credentials = {};
            $scope.forms.updatePasswordForm.$setPristine();
            $scope.forms.updatePasswordForm.$setUntouched();
          } else {
            $scope.msg.successUpdatePass = '';
            $scope.msg.errorUpdatePass = result.error;
          }
        });
    } else {
      $scope.msg.errorUpdatePass = "Confirm password mismatch";
    }
  }

  $scope.logout = function () {
    $rootScope.loggedIn = false;
    $rootScope.isEdit = false;
    // reset formdata
    $scope.formdata = {};
    $scope.credentials = {};
    $scope.formdata.avatar = $scope.defaultAvatar;
    // reset messages
    $scope.msg = {};
    // reset sessionStorage
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
