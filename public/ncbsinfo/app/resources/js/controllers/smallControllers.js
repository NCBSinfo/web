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

app.controller('headController', function ($state, $scope, appConstants, $mdSidenav, setupService) {
    $scope.title = appConstants.name;
    $scope.isShown = setupService.isNavOpen() && $state.params.param != '404';
    $scope.toggleNav = function () {
        $mdSidenav('left').toggle();
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
    $scope.locationList = lectureHalls;


});

app.controller('settingsController', function ($scope, commonFunctions, setupService) {

    setupService.setup();

});


app.controller('templateController', function ($scope, $state) {
    console.log();
    $scope.isShown = function () {
        return !($state.params.param == '' || $state.params.param == 'login' || $state.current.name=='actionView');
    }
});
