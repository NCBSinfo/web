//Start module
var app = angular.module('NCBSinfo', ['ngMaterial', 'ui.router']);
var isMobile = false;
var currentLocation = 'Home';
var AUTH_MODE = "authenticated";

var headerController = function ($scope, $mdMedia, $mdSidenav) {
    $scope.title = "NCBSinfo";
    $scope.showNav = function () {
        $mdSidenav('left').toggle();
    };

    isMobile = $mdMedia('gt-sm');
    if (isMobile) {
        $scope.title = currentLocation;
    }
    else {
        $scope.title = "NCBSinfo";
    }
};

var sideNavController = function ($scope, $stateParams, $state, $mdSidenav) {
    $scope.isOfflinemode = false;
    $scope.headerTitle = "NCBSinfo";
    $scope.headerSubTitle = "web beta";
    $scope.menu = navBarMenu;
    $scope.isActive = function (value) {
        if (value.toLowerCase() == $stateParams.name.toLowerCase()) {
            return 'teal';
        }
    };
    $scope.textColor = function (value) {
        if (value.toLowerCase() == $stateParams.name.toLowerCase()) {
            return 'white';
        }
    };
    $scope.sideNavClick = function (x) {
        currentLocation = x;
        $state.transitionTo($state.current, {name: x.toLowerCase()}, {
            reload: true,
            inherit: false,
            notify: true
        }).then(function () {
            $mdSidenav('left').close();
        });
    };

};

var homeController = function ($scope, $mdMedia) {
    $scope.mapWidth = 100;
    $scope.mapHeight = 40;
    $scope.mapMarginBottom = 3;
    if($mdMedia('xs')){
        $scope.mapMarginBottom = 15;
    }
    loadMap();
    var homeButtons = [];
    for (var i = 0; i < navBarMenu.length; i++) {
        if (navBarMenu[i].onHome) {
            homeButtons.push(navBarMenu[i]);
        }
    }
    $scope.homeButtons = homeButtons;
    console.log(nextTransport(routes[8].weekTrip, routes[8].sundayTrip));
};

var transportController = function ($scope) {
    $scope.tabs = getArray();
    $scope.selectedIndex = 0;
};

var contactController = function ($scope) {

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

};

var errorController = function ($scope, $state) {

    $scope.goHome = function () {
        $state.transitionTo($state.current, {name: 'home'}, {
            reload: true,
            inherit: false,
            notify: true
        });
    };
};


