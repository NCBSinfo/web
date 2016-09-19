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


});