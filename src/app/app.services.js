export default function ($http) {
  var dataURL = 'http://www.cis.umassd.edu/~dluong1/csel-test/data/';
  return {
    getHomeData: function () {
      return $http.get(dataURL + 'getHomeData.php')
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getPubData: function () {
      return $http.get(dataURL + 'getPubData.php')
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getStudentData: function () {
      return $http.get(dataURL + 'getStudentData.php')
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getUsersData: function () {
      return $http.post(dataURL + 'getUsers.php')
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getUserData: function (userId) {
      return $http.post(dataURL + 'getUser.php', {
        'userId': userId
      })
      .then(function (response) {
        console.log(response);
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    login: function (username, password) {
      return $http.post(dataURL + 'login.php', {
          'username': username,
          'password': password
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    register: function (formData) {
      return $http.post(dataURL + 'register.php', {
        'data': formData
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    updatePass: function (email, currentPassword, newPassword) {
      return $http.post(dataURL + 'updatePass.php', {
        'email': email,
        'currentPassword': currentPassword,
        'newPassword': newPassword
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    resetPass: function (email) {
      return $http.post(dataURL + 'resetPass.php', {
        'email': email
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    updateStudent: function (studentData) {
      return $http.post(dataURL + 'updateStudent.php', {
        'data': studentData
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    updateSocial: function (studentData) {
      return $http.post(dataURL + 'updateSocial.php', {
        'userId': studentData.id,
        'facebook': studentData.facebook,
        'linkedin': studentData.linkedin
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    }
  };
}