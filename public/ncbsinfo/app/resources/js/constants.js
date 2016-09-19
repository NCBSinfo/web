/**
 * Created by Dexter on 16-09-16.
 */

/**Main configuration files
 * Load this at the end of all files**/

var app = angular.module('NCBSinfo', ['ngMaterial', 'ui.router', 'ngMessages', 'firebase']);

app.constant('appConstants', {
    name: 'NCBSinfo',
    version: '1.0.1',
    versionName: 'beta'
});

function getTemplate(item) {
    switch (item) {
        case 'mainTemplate':
            return {url: 'app/views/static/template.html', controller: ''};
        case 'header':
            return {url: 'app/views/static/header.html', controller: ''};
        case 'sideNav' :
            return {url: 'app/views/static/sideNav.html', controller: 'sideNavController'};
        case '':
            return {url: 'app/views/modes.html', controller: 'modesController'};
        case 'home':
            return {url: 'app/views/home.html', controller: 'homeController'};
        case 'events':
            return {url: 'app/views/events.html', controller: 'eventsController'};
        case  'transport':
            return {url: 'app/views/transport.html', controller: 'transportController'};
        case 'actionView':
            return {url: 'app/views/actions/reset.html', controller: 'actionController'};
        case 'contacts':
            return {url: 'app/views/contacts.html', controller: 'contactController'};
        case 'locations':
            return {url: 'app/views/locations.html', controller: 'locationController'};
        case 'settings':
            return {url: 'app/views/settings.html', controller: 'settingsController'};
        case 'login':
            return {url: 'app/views/login.html', controller: 'loginController'};
        case 'dashboard':
            return {url: 'app/views/dashboard.html', controller: 'dashboardController'};
        default:
            return {url: 'app/views/static/404.html', controller: 'errorController'};
    }
}