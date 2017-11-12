export default function ($http) {
  var dataURL = 'http://www.cis.umassd.edu/~dluong1/csel-test/data/';
  return {
    getPageData: function (file) {
      return $http.post(dataURL + 'getPageData.php', { 'file': file })
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
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getSearchUser: function (searchInput) {
      return $http.post(dataURL + 'searchUser.php', {
        'search': searchInput
      })
        .then(function (response) {
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
    updatePass: function (credentials) {
      return $http.post(dataURL + 'updatePass.php', {
        'account': credentials
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
    },
    updateData: function (file, data) {
      return $http.post(dataURL + 'updateData.php', {
        'file': file,
        'data': data
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    backupData: function (file) {
      return $http.post(dataURL + 'backupData.php', {
        'file': file
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    revertData: function (file) {
      return $http.post(dataURL + 'revertData.php', {
        'file': file
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    }
  };
}