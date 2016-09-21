var app = angular.module('notif', []);

var apiUrl = 'https://shoutout.hackgt.com';

app.controller('AppController', function($scope, $http, $timeout) {
  var getNotifications = function() {
    $http.get(apiUrl + '/api/notifications', {})
      .then(
        function(res) {
          $scope.notifs = res.data;
          checkRecent();
        },
        function(err) {
          console.error(err);
        }
      );
  };

  var checkRecent = function() {
    $http.get(apiUrl + '/api/notifications/recent', {})
      .then(
        function(res) {
          if (res.data._id != $scope.notifs[0]._id) {
            $scope.notifs.unshift(res.data);
          }
        },
        function(err) {
          console.error(err);
        }
      );

    $timeout(function(){
      checkRecent();
    },15000);
  }
  getNotifications();
});
