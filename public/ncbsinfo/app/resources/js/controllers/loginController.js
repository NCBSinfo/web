/**
 * Created by Dexter on 18-09-16.
 */

app.controller('loginController', function ($scope, setupService, commonFunctions, $mdDialog, $mdToast, authService) {
    setupService.setup();

    $scope.sendingData = function () {
        return authService.isDataSending().isIt;
    };

    $scope.signIn = function (form) {
        if (form.$valid) {
            authService.signIn($scope.user.email, $scope.user.password);
        }
        else {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Fill the details correctly before submit')
                    .position('right bottom')
                    .hideDelay(2000)
            );
        }
    };


    $scope.registerAlert = function (form) {
        if (form.$valid) {

            var confirm = $mdDialog.confirm()
                .title('You are sure?')
                .textContent('You are about to register with email id \"' + $scope.user.email + '\"')
                .ariaLabel('Lucky day')
                .clickOutsideToClose(true)
                .ok('Yes')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function (result) {
                if (form.$valid) {
                    authService.createUser($scope.user.email, $scope.user.password);
                }
                else {
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent('Fill the details correctly before submit')
                            .position('right bottom')
                            .hideDelay(2000)
                    );
                }
                ;
            }, function () {
                console.log("canccelled");
            });
        }
        else {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Fill the details correctly before submit')
                    .position('right bottom')
                    .hideDelay(2000)
            );
        }
    };

    $scope.forgotPass = function (form) {
        if (form.email.$valid) {
            var confirm = $mdDialog.confirm()
                .title('You are sure?')
                .textContent('We will send reset password email to \"' + form.email.$viewValue + '\"')
                .clickOutsideToClose(true)
                .ok('Yes')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function (result) {
                authService.sendResetPassword(form.email.$viewValue);
            });
        }
        else {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Email address is badly formatted')
                    .position('right bottom')
                    .hideDelay(2000)
            );
        }

    }

});