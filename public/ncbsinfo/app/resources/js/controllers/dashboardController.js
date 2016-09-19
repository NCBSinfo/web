/**
 * Created by Dexter on 18-09-16.
 */
app.controller('dashboardController', function ($scope, setupService, authService) {
    setupService.setup();
    $scope.routes = routes;
    $scope.suffix = function (type) {
        if (type == SHUTTLE) {
            return "";
        }
        else {
            return " Buggy";
        }
    };

    $scope.dataSaving = function () {
        return authService.isDataSending().isIt;
    };

    var User = function () {
        return authService.getUserData();
    };
    $scope.email = function () {
        return User().email
    };
    $scope.name.$viewValue = "uuu";

    $scope.defaultRoute = function () {
        return User().defaultRoute
    };
    $scope.notifications = function () {
        return User().notifications
    };

    $scope.saveData = function () {
        console.log($scope.email());
        console.log($scope.userForm.name.$viewValue);
        console.log($scope.user.route);
        console.log($scope.notifications());
    }


});