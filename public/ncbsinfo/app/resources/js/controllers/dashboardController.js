/**
 * Created by Dexter on 18-09-16.
 */
app.controller('dashboardController', function ($scope, setupService, authService, $mdDialog) {
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

    $scope.FireUser = authService.getUserData();

    $scope.dataSaving = function () {
        return authService.isDataSending().isIt;
    };

    $scope.saveData = function () {
        var tempUser = {
            name: $scope.FireUser.name,
            email: $scope.FireUser.email,
            defaultRoute: $scope.FireUser.defaultRoute,
            notifications: $scope.FireUser.notifications
        };
        authService.saveData(tempUser);
    };

    $scope.changPass = function () {
        var confirm = $mdDialog.confirm()
            .title('Reset Password')
            .textContent('For security reason, we will send reset password link to your email ' + $scope.FireUser.email)
            .clickOutsideToClose(true)
            .ok('Send')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function (result) {
            authService.sendResetPassword($scope.FireUser.email);
        }, function () {

        });

    };

});