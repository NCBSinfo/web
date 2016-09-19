/**
 * Created by Dexter on 17-09-16.
 */
app.controller('sideNavController', function ($state, $scope, setupService, commonFunctions, $mdDialog, authService) {
    $scope.isOpen = setupService.isNavOpen() && $state.current.param != '404';

    $scope.title = setupService.getInfo().name;
    $scope.subtile = setupService.getInfo().email;
    $scope.isActive = setupService.getState();

    $scope.tabs = sideNavList;

    if (setupService.getMode() == 'auth') {
        $scope.isAuthenticated = true;
        $scope.buttonTitle = "Log Out";
    }
    else {
        $scope.isAuthenticated = false;
        $scope.buttonTitle = "Login";
    }

    $scope.changeMode = function () {
        var confirm = $mdDialog.confirm()
            .title('You are sure?')
            .textContent('You are about to change the mode. You can switch back again anytime :)')
            .clickOutsideToClose(true)
            .ok('Yes')
            .cancel('Cancel');
        $mdDialog.show(confirm).then(function (result) {
            if (setupService.getMode() == 'auth') {
                authService.signOut();
            }
            localStorage.clear();
            commonFunctions.goTo('');
        }, function () {

        });

    };


});