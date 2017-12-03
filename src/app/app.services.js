export default function ($http) {
  var rootURL = 'http://www.cis.umassd.edu/~dluong1/csel-test';
  return {
    getPageData: function (file) {
      return $http.post(rootURL + '/data/getPageData.php', { 'file': file })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getUsersData: function () {
      return $http.post(rootURL + '/data/getUsers.php')
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getUserData: function (userId) {
      return $http.post(rootURL + '/data/getUser.php', {
        'userId': userId
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getSearchUser: function (searchInput) {
      return $http.post(rootURL + '/data/searchUser.php', {
        'search': searchInput
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    login: function (username, password) {
      return $http.post(rootURL + '/data/login.php', {
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
      return $http.post(rootURL + '/data/register.php', {
        'data': formData
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    updatePass: function (credentials) {
      return $http.post(rootURL + '/data/updatePass.php', {
        'account': credentials
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    resetPass: function (email) {
      return $http.post(rootURL + '/data/resetPass.php', {
        'email': email
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    updateStudent: function (studentData) {
      return $http.post(rootURL + '/data/updateStudent.php', {
        'data': studentData
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    updateSocial: function (studentData) {
      return $http.post(rootURL + '/data/updateSocial.php', {
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
      return $http.post(rootURL + '/data/updateData.php', {
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
      return $http.post(rootURL + '/data/backupData.php', {
        'file': file
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    revertData: function (file) {
      return $http.post(rootURL + '/data/revertData.php', {
        'file': file
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    sendEmail: function (account, email, selected) {
      return $http.post(rootURL + '/data/sendEmail.php', {
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
      return $http.post(rootURL + '/downloadData.php', {
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