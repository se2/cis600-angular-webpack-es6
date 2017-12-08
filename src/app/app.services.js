export default function ($rootScope, $http) {
  return {
    getPageData: function (file) {
      return $http.post($rootScope.baseURL + 'data/getPageData.php', { 'file': file })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getUsersData: function () {
      return $http.post($rootScope.baseURL + 'data/getUsers.php')
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getUserData: function (userId) {
      return $http.post($rootScope.baseURL + 'data/getUser.php', {
        'userId': userId
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getSearchUser: function (searchInput) {
      return $http.post($rootScope.baseURL + 'data/searchUser.php', {
        'search': searchInput
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    login: function (username, password) {
      return $http.post($rootScope.baseURL + 'data/login.php', {
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
      return $http.post($rootScope.baseURL + 'data/register.php', {
        'data': formData
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    updatePass: function (credentials) {
      return $http.post($rootScope.baseURL + 'data/updatePass.php', {
        'account': credentials
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    resetPass: function (email) {
      return $http.post($rootScope.baseURL + 'data/resetPass.php', {
        'email': email
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    updateStudent: function (studentData) {
      return $http.post($rootScope.baseURL + 'data/updateStudent.php', {
        'data': studentData
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    updateSocial: function (studentData) {
      return $http.post($rootScope.baseURL + 'data/updateSocial.php', {
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
      return $http.post($rootScope.baseURL + 'data/updateData.php', {
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
      return $http.post($rootScope.baseURL + 'data/backupData.php', {
        'file': file
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    revertData: function (file) {
      return $http.post($rootScope.baseURL + 'data/revertData.php', {
        'file': file
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    sendEmail: function (account, email, selected) {
      return $http.post($rootScope.baseURL + 'data/sendEmail.php', {
        'account': account,
        'receivingEmail': email.receivingEmail,
        'selected': selected,
        'from': email.from,
        'cc': email.cc,
        'subject': email.subject,
        'body': email.body
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    downloadData: function (account) {
      return $http.post($rootScope.baseURL + 'downloadData.php', {
        'account': account
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    }
  };
}