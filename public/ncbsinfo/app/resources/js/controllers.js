//Start module
var app = angular.module('NCBSinfo', ['ngMaterial', 'ui.router', 'ngMessages', 'firebase']);
var isMobile = false;
var currentLocation = 'NCBSinfo';
var currentRoute = 1;
var AUTH_MODE = "";

app.service('setupService', function ($state, $location, $rootScope, $firebaseObject, $firebaseAuth) {
    console.log("Setup Service started in following state");
    console.log($state.current);
    if (localStorage.setupDone == undefined) {
        $location.path('app/views/modes.html');
    }
    var auth = $firebaseAuth();
    auth.$onAuthStateChanged(function (firebaseUser) {
        if (firebaseUser) {
            console.log(firebaseUser);
            var ref = firebase.database().ref();
            var refEmail = firebaseUser.email.replace("@", "_").replace(".", "_");
            var fireObject = $firebaseObject(ref.child('newUsers').child(refEmail));
            var firePublic = $firebaseObject(ref.child('public'));
            fireObject.$loaded().then(function () {
                localStorage.currentUser = fireObject.name;
                localStorage.currentUserEmail = fireObject.email;
                $rootScope.headerSubTitle = fireObject.email;
            });
            firePublic.$loaded().then(function () {
                localStorage.publicAPI = firePublic.fusionAPI;
                localStorage.tableID = firePublic.tableID;
            });
            localStorage.mode = "auth";
            localStorage.setupDone = "true";
            AUTH_MODE = "auth";
            $state.transitionTo($state.current, {name: 'home'}, {
                reload: true,
                inherit: false,
                notify: true
            });
        }
    });
});

var mainController = function ($scope, $state, $mdMedia, $rootScope, setupService) {
    $rootScope.kk = true;

};

var modeController = function ($scope, $state, $mdMedia, $rootScope, setupService) {
    $rootScope.kk = false;
    if (localStorage.setupDone == "true" && localStorage.mode == "guest") {
        $state.transitionTo($state.current, {name: 'home'}, {
            reload: true,
            inherit: false,
            notify: true
        });
        AUTH_MODE = "guest"
    }


    $scope.offset = function () {

        if ($mdMedia('xs')) {
            return {top: "0", left: "10"};
        }
        else {
            return {top: "30px", left: "0"};
        }
    };
    $scope.cardClass1 = "";
    $scope.cardClass2 = "";
    $scope.riseDiv = function (card) {
        if (card == 1) {
            $scope.cardClass1 = "md-whiteframe-9dp";
        }
        if (card == 2) {
            $scope.cardClass2 = "md-whiteframe-9dp";
        }
    };
    $scope.lowerDiv = function () {
        $scope.cardClass1 = "";
        $scope.cardClass2 = "";
    };

    $scope.goGuest = function () {

        localStorage.mode = "guest";
        localStorage.setupDone = "true";

        $state.transitionTo($state.current, {name: 'home'}, {
            reload: true,
            inherit: false,
            notify: true
        });

    };


    $scope.goLogin = function () {

        $state.transitionTo($state.current, {name: 'login'}, {
            reload: true,
            inherit: false,
            notify: true
        });

    }

};


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

var sideNavController = function ($scope, $rootScope, $stateParams, $state, $mdSidenav) {
    $scope.isOfflinemode = AUTH_MODE == 'guest';
    $scope.headerTitle = "NCBSinfo";

    if (localStorage.currentUserEmail != undefined) {
        $rootScope.headerSubTitle = localStorage.currentUserEmail;
    }
    else {
        $rootScope.headerSubTitle = "web beta";
    }

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

var loginController = function ($scope, $state, $rootScope, $mdDialog, $mdToast, $firebaseAuth) {
        $scope.dataSending = true;
        var auth = $firebaseAuth();
        auth.$onAuthStateChanged(function (firebaseUser) {
            if (firebaseUser) {

                console.log(firebaseUser);
                localStorage.mode = "auth";
                localStorage.setupDone = "true";
                AUTH_MODE = "auth";

                $state.transitionTo($state.current, {name: 'home'}, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }
        });

        $rootScope.kk = false;
        $scope.user = {
            email: "",
            password: ""
        };
        $scope.registerAlert = function (userForm) {
            if (userForm.$valid) {
                var confirm = $mdDialog.confirm()
                    .title('You are sure?')
                    .textContent('You are about to register with email id \"' + $scope.user.email + '\"')
                    .ariaLabel('Lucky day')
                    .clickOutsideToClose(true)
                    .ok('Yes')
                    .cancel('Cancel');

                $mdDialog.show(confirm).then(function (result) {
                    console.log("Clicked Ok : " + result);
                }, function () {
                    console.log("canccelled");
                });
            }
            else {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Fill details correctly before submit')
                        .position('right bottom')
                        .hideDelay(3000)
                );

            }
        };
        $scope.signIn = function (userForm) {

            if (userForm.$valid) {

                auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password)
                    .then(function (firebaseUser) {
                        console.log("Signed in as:", firebaseUser.uid);

                    }).catch(function (error) {
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent(error.message)
                                .position('right bottom')
                                .hideDelay(3000)
                        );
                    });

            }
            else {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Fill details correctly before submit')
                        .position('right bottom')
                        .hideDelay(3000)
                );
            }

        };

    }
    ;

var homeController = function ($scope, $mdMedia, $state, $rootScope) {
    $rootScope.kk = true;
    $scope.mapWidth = 100;
    $scope.mapHeight = 40;
    $scope.mapMarginBottom = 3;
    if ($mdMedia('xs')) {
        $scope.mapMarginBottom = 15;
    }

    var homeButtons = [];
    for (var i = 0; i < navBarMenu.length; i++) {
        if (navBarMenu[i].onHome) {
            if (navBarMenu[i].name.toLowerCase() == "events") {
                console.log(AUTH_MODE);
                if (AUTH_MODE != "guest") {
                    homeButtons.push(navBarMenu[i]);
                }
            }
            else if (navBarMenu[i].name.toLowerCase() == "settings") {
                if (AUTH_MODE == "guest") {
                    homeButtons.push(navBarMenu[i]);
                }
            }
            else {
                homeButtons.push(navBarMenu[i]);
            }
        }
    }
    $scope.homeButtons = homeButtons;


    $scope.routes = routes;
    $scope.currentRoute = currentRoute;
    loadMap(routes[currentRoute].lat, routes[currentRoute].lng, currentRoute);
    $scope.goNext = function () {
        if (currentRoute == routes.length - 1) {
            currentRoute = 0;
        }
        else {
            currentRoute = currentRoute + 1;
        }
        $scope.currentRoute = currentRoute;
        loadMap(routes[currentRoute].lat, routes[currentRoute].lng, currentRoute);
    };

    $scope.goPrevious = function () {
        if (currentRoute == 0) {
            currentRoute = routes.length - 1;
        }
        else {
            currentRoute = currentRoute - 1;
        }
        $scope.currentRoute = currentRoute;
        loadMap(routes[currentRoute].lat, routes[currentRoute].lng, currentRoute);
    };

    $scope.nextTransport = function () {
        return nextTransport(routes[currentRoute].weekTrip, routes[currentRoute].sundayTrip).format('hh:mm A');
    };

    $scope.timeLeft = function () {
        var diffMin = nextTransport(routes[currentRoute].weekTrip, routes[currentRoute].sundayTrip).diff(moment(), 'minutes');
        var diffHours = nextTransport(routes[currentRoute].weekTrip, routes[currentRoute].sundayTrip).diff(moment(), 'hours');
        var minLeft = Math.abs(diffMin - diffHours * 60);
        return {
            hours: diffHours,
            mins: minLeft
        };
    };

    $scope.buttonClick = function (x) {
        currentLocation = x;
        $state.transitionTo($state.current, {name: x.toLowerCase()}, {
            reload: true,
            inherit: false,
            notify: true
        });
    };

};

var transportController = function ($scope, setupService) {
    $scope.tabs = getArray();
    $scope.selectedIndex = 0;
};

var contactController = function ($scope, setupService) {

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

var eventController = function ($scope, $http, $mdToast, $state, setupService) {
    if (AUTH_MODE == "guest") {
        $state.transitionTo($state.current, {name: 'home'}, {
            reload: true,
            inherit: false,
            notify: true
        });
    }
    $scope.dataLoading = true;
    $scope.upcomingEmpty = false;
    $scope.pastEmpty = false;
    $scope.emptyMessage = 'No further events can be retrieved! We will update you soon :)';
    var tableID = localStorage.getItem("tableID");
    var API_KEY = localStorage.getItem("publicAPI");
    var URL = "https://www.googleapis.com/fusiontables/v2/query";

    var data = $.param({
        sql: "SELECT * FROM " + tableID,
        key: API_KEY
    });

    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    };

    $scope.getEventDate = function (item) {
        return moment(item.date + ' ' + item.time, 'DD/MM/YYYY HH:mm:ss').format('DD');
    };

    $scope.getEventMonth = function (item) {
        return moment(item.date + ' ' + item.time, 'DD/MM/YYYY HH:mm:ss').format('MMM').toUpperCase();
    };

    if (isConnected) {
        $http.post(URL, data, config)
            .success(function (data, status, headers, config) {

                var allEvents = [];
                var upcomingEvents = [];
                var pastEvents = [];
                for (var i = 0; i < data.rows.length; i++) {
                    var item = data.rows[i];
                    allEvents.push({
                        timeStamp: item[0],
                        notificationTitle: item[1],
                        date: item[2],
                        time: item[3],
                        venue: item[4],
                        speaker: item[5],
                        affiliation: item[6],
                        title: item[7],
                        host: item[8],
                        dataCode: item[9]
                    });
                }

                for (var k = 0; k < allEvents.length; k++) {
                    if (moment() < moment(allEvents[k].date + ' ' + allEvents[k].time, 'DD/MM/YYYY HH:mm:ss')) {
                        upcomingEvents.push(allEvents[k]);
                    }
                    else {
                        pastEvents.push(allEvents[k]);
                    }
                }

                $scope.upComings = upcomingEvents;
                $scope.past = pastEvents;
                if (upcomingEvents.length == 0) {
                    $scope.upcomingEmpty = true;
                }
                if (pastEvents.length == 0) {
                    $scope.pastEmpty = true;
                }
                $scope.dataLoading = false;

            })
            .error(function (data, status, header, config) {
                console.log(status);
                $scope.dataLoading = false;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Error ' + status + "! contact Admin")
                        .position('right bottom')
                        .hideDelay(3000)
                );

            });

    }
    else {
        $scope.emptyMessage = "No internet connect found";
        $scope.dataLoading = false;
        $scope.upcomingEmpty = true;
        $scope.pastEmpty = true;
        $mdToast.show(
            $mdToast.simple()
                .textContent('No internet connection!')
                .position('right bottom')
                .hideDelay(3000)
        );
    }

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

var logoutController = function ($window, $state, $mdDialog, $firebaseAuth) {


    var confirm = $mdDialog.confirm()
        .title('You are sure?')
        .textContent('You are about to log out')
        .clickOutsideToClose(false)
        .ok('Yes')
        .cancel('Cancel');
    $mdDialog.show(confirm).then(function (result) {
        $firebaseAuth().$signOut();
        localStorage.clear();
        $state.transitionTo($state.current, {name: 'setup'}, {
            reload: true,
            inherit: false,
            notify: true
        });
    }, function () {
        $window.history.back();
    });
};


