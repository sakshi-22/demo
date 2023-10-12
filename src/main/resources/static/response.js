var app = angular.module('chatbotApp', []);

app.controller('myCtrl', ['$scope', '$http', function($scope, $http) {
    // ...

    // Define the fetchSubModule function within the controller's scope
    $scope.fetchSubModule = function(moduleId) {
        return $http({
            method: 'GET',
            url: `/api/submodules/by-module/${moduleId}`,
        }).then(function(response) {
            if (response && response.data) {
                return response.data;
            } else {
                return null;
            }
        });
    };
}]);
