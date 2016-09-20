/**
 * Created by Dexter on 17-09-16.
 */

app.controller('actionController', function ($scope, $state, $mdToast) {

    var auth = firebase.auth();
    var code = $state.params.oobCode;

    $scope.error = "";
    $scope.isInvalid = false;
    $scope.email = "";
    $scope.header = "";

    auth.verifyPasswordResetCode(code).then(function (email) {
        $scope.email = email;
        console.log("Code verified");
        $scope.$apply();

    }).catch(function (e) {
        $scope.error = "This link is invalid. This can happen if the link is malformed, expired, or has already been used.";
        $scope.isInvalid = true;
        $scope.header = "Oh no..";
        $scope.$apply();
        console.log(e.message);
    });

    $scope.goHome = function () {
        $state.transitionTo('mainView', {param: ""}, {
            reload: true,
            inherit: false,
            notify: true
        });
    };

    $scope.resetPass = function (actionForm) {
        if (actionForm.$valid) {
            if (actionForm.confirmPassword.$viewValue == actionForm.password.$viewValue) {
                auth.confirmPasswordReset(code, actionForm.password.$viewValue).then(function (resp) {
                    // Password reset has been confirmed and new password updated.
                    $scope.error = "Password reset was Successful! Please login with your new password";
                    $scope.header = "Successful!";
                    $scope.isInvalid = true;
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent("Password reset was Successful!")
                            .position('right bottom')
                            .hideDelay(3000)
                    );
                    $scope.$apply();

                }).catch(function (error) {
                    // Error occurred during confirmation. The code might have expired or the
                    console.log(error.message);
                    $mdToast.show(
                        $mdToast.simple()
                            .textContent(error.message)
                            .position('right bottom')
                            .hideDelay(3000)
                    );

                });

            } else {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Both passwords should be same')
                        .position('right bottom')
                        .hideDelay(3000)
                );
            }


        }
        else {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Fill the details correctly before submit')
                    .position('right bottom')
                    .hideDelay(2000)
            );
        }
    }


})
;