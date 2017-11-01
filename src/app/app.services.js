export default function ($http) {
  return {
    getPageData: function () {
      return $http.get('./data/data.json')
        .then(function (response) { // success
          return response.data;
        }, function (response) { // error
          return response.data;
        });
    },
    getHomeData: function () {
      return $http.get('./data/homeData.json')
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getPubData: function () {
      return $http.get('./data/publicationData.json')
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getStudentData: function () {
      return $http.get('./data/studentData.json')
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getUsersData: function () {
      return $http.post('http://www.cis.umassd.edu/~dluong1/csel/data/getUsers.php')
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    getUserData: function (userId) {
      return $http.post('http://www.cis.umassd.edu/~dluong1/csel/data/getUser.php', {
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
      return $http.post('http://www.cis.umassd.edu/~dluong1/csel/data/login.php', { 'username': username, 'password': password })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    register: function (formData) {
      return $http.post('http://www.cis.umassd.edu/~dluong1/csel/data/register.php', {
        'data': formData
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    updatePass: function (email, currentPassword, newPassword) {
      return $http.post('http://www.cis.umassd.edu/~dluong1/csel/data/updatePass.php', {
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
      return $http.post('http://www.cis.umassd.edu/~dluong1/csel/data/resetPass.php', {
        'email': email
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    updateStudent: function (studentData) {
      return $http.post('http://www.cis.umassd.edu/~dluong1/csel/data/updateStudent.php', {
        'data': studentData
      })
        .then(function (response) {
          return response.data;
        }, function (response) {
          return response.data;
        });
    },
    updateSocial: function (studentData) {
      return $http.post('http://www.cis.umassd.edu/~dluong1/csel/data/updateSocial.php', {
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