app.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {


    // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/home');
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


    $stateProvider.state(mainView);

})
;

app.controller('headerController', headerController);
app.controller('sideNavController', ['$scope', '$stateParams', '$state', '$mdSidenav', sideNavController]);
app.controller('homeController', homeController);
app.controller('transportController', transportController);
app.controller('contactController', contactController);
app.controller('errorController', errorController);

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
        default :
            return '404';

    }
}