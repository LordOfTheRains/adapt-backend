angular.module('app').controller('LoginCtlr', function($scope) {
    $scope.user = {
        email: 'foo@bar.com',
        password: 'foobar',
    }
    $scope.both = function() {
        return $scope.email + " " + $scope.lastname;
    }
});