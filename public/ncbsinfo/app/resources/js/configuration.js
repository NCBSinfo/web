/**
 * Created by Dexter on 16-09-16.
 */




app.config(function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {




    //To remove trailing slashes
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path();
        var hasTrailingSlash = path[path.length - 1] === '/';
        if (hasTrailingSlash) {
            return path.substr(0, path.length - 1);
        }
    });


    $mdThemingProvider.theme('default')
        .primaryPalette('teal', {
            'default': '400',
            'hue-1': '100',
            'hue-2': '600',
            'hue-3': '700'
        })
        .accentPalette('red');


    /**
     * Main template of website
     */

    var extractStatePara = "";
    var mainView = {
        name: 'mainView',
        url: "/:param",
        views: {
            '': {templateUrl: getTemplate('mainTemplate').url},
            'header@mainView': {templateUrl: getTemplate('header').url},
            'sideNav@mainView': {
                templateUrl: getTemplate('sideNav').url,
                controller: getTemplate('sideNav').controller
            },
            'viewContent@mainView': {
                templateUrl: function ($stateParams) {
                    extractStatePara = $stateParams.param;
                    return getTemplate(extractStatePara).url
                },
                controller: getTemplate(extractStatePara).controller
            }
        }
    };

    var actionView = {
        name: 'actionView',
        url: "/action/set?mode=:&oobCode=:&apiKey=:",
        views: {
            '': {templateUrl: getTemplate('mainTemplate').url},
            'header@actionView': {templateUrl: getTemplate('header').url},
            'viewContent@actionView': {
                templateUrl: getTemplate('actionView').url,
                controller: getTemplate('actionView').controller
            }
        }
    };

    $stateProvider
        .state(mainView)
        .state(actionView);

    $urlRouterProvider
        .otherwise("/")

});







