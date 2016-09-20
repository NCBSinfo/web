/**
 * Created by Dexter on 17-09-16.
 */

app.controller('errorController', function ($scope, setupService, commonFunctions) {


    setupService.setup();

    $scope.goHome = function () {
        commonFunctions.goTo('home');
    };
});