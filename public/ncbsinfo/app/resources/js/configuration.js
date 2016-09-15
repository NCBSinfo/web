app.factory("Auth", ["$firebaseAuth",
    function ($firebaseAuth) {
        return $firebaseAuth();
    }
]);


app.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {


    // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/setup");

    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('deep-orange');


    var mainView = {
        name: 'mainView',
        url: "/:name",
        views: {
            mainContent: {
                templateUrl: function ($stateParams) {
                    return 'app/views/' + getParameter($stateParams.name) + '.html';
                }
            },
            defaultHeader: {
                templateUrl: 'app/static/header.html',
                controller: 'headerController'

            },
            defaultFooter: {
                templateUrl: 'app/static/footer.html'
            },
            defaultSideNav: {
                templateUrl: 'app/static/sideNav.html',
                controller: 'sideNavController'
            }
        }

    };


    $stateProvider
        .state(mainView);

})
;

app.controller('mainController', mainController);
app.controller('modeController', modeController);
app.controller('loginController', loginController);
app.controller('headerController', headerController);
app.controller('sideNavController', ['$scope', '$rootScope', '$stateParams', '$state', '$mdSidenav', 'setupService', sideNavController]);
app.controller('homeController', homeController);
app.controller('transportController', transportController);
app.controller('contactController', contactController);
app.controller('eventController', eventController);
app.controller('errorController', errorController);
app.controller('logoutController', logoutController);

function getParameter(input) {

    switch (input.toLowerCase().trim()) {
        case 'home':
            return 'home';
        case 'transport':
            return 'transport';
        case 'contacts':
            return 'contacts';
        case 'events':
            return 'events';
        case 'setup':
            return 'modes';
        case 'login':
            return 'login';
        case 'register':
            return 'login';
        case 'logout':
            return 'logout';
        default :
            return '404';

    }
}

