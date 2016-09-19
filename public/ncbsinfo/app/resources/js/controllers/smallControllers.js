/**
 * Created by Dexter on 17-09-16.
 */



app.controller('modesController', function ($scope, commonFunctions, setupService) {

    setupService.setup();
    $scope.goGuest = function () {
        localStorage.setItem('mode', 'guest');
        commonFunctions.goTo('home');
    };
    $scope.goLogin = function () {
        console.log('clicked');
        commonFunctions.goTo('login');
    };
});

//TODO: use some proper function for toggle
app.controller('headController', function ($scope, appConstants, $mdSidenav, $timeout) {
    $scope.title = appConstants.name;

    $scope.toggleNav = function () {
        $timeout(function () {
            $mdSidenav('left').open();
        }, false);
    }


});

app.controller('contactController', function ($scope, commonFunctions, setupService) {

    setupService.setup();
    $scope.color = function () {
        return colors[Math.floor((Math.random() * (colors.length - 1)) + 0)];
    };

    $scope.letter = function (word) {
        return word.charAt(0);
    };
    $scope.tabs = {
        impTab: {name: "Important", list: impContacts},
        pinnedTab: {name: "Sections", list: pinnedContacts},
        allTab: {name: "All Contacts", list: allcontacts}
    };

});


app.controller('locationController', function ($scope, commonFunctions, setupService) {

    setupService.setup();

});

app.controller('settingsController', function ($scope, commonFunctions, setupService) {

    setupService.setup();

});