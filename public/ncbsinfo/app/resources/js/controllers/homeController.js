/**
 * Created by Dexter on 17-09-16.
 */
/**
 * Created by Dexter on 17-09-16.
 */
var currentRoute = 0;
var currentLocation = 'NCBSinfo';

app.controller('homeController', function ($state, $scope, setupService, $mdMedia) {
        setupService.setup();
        $scope.mapWidth = 100;
        $scope.mapHeight = 40;
        $scope.mapMarginBottom = 3;
        if ($mdMedia('xs')) {
            $scope.mapMarginBottom = 15;
        }


        var homeButtons = [];

        for (var key in sideNavList) {
            if (sideNavList.hasOwnProperty(key)) {
                if (sideNavList[key].onHome) {
                    if (setupService.getMode() == "guest" && sideNavList[key].onOffline) {
                        homeButtons.push(sideNavList[key]);
                    }
                    else if (setupService.getMode() == "auth" && sideNavList[key].onAuth) {
                        homeButtons.push(sideNavList[key]);
                    }
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
            $state.transitionTo($state.current, {param: x.toLowerCase()}, {
                reload: true,
                inherit: false,
                notify: true
            });
        };

    }
)
;

function loadMap(lat, lng, route) {

    try {
        var map = new google.maps.Map(document.getElementById('map_canvas'), {
            center: {lat: lat, lng: lng},
            zoom: 15
        });

        if (route != 8) {

            var marker = new google.maps.Marker({
                position: {lat: lat, lng: lng},
                map: map
            });
        }
        else {

            var CBLCoords = [
                {lat: 13.066134, lng: 77.578620},
                {lat: 13.070068, lng: 77.581155},
                {lat: 13.071615, lng: 77.575383},
                {lat: 13.069755, lng: 77.574868},
                {lat: 13.069441, lng: 77.575661},
                {lat: 13.069337, lng: 77.575661},
                {lat: 13.069044, lng: 77.576370},
                {lat: 13.067288, lng: 77.575769}
            ];

            // Construct the polygon.
            new google.maps.Polygon({
                paths: CBLCoords,
                strokeColor: '#9d3a9bea',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#9d3a9bea',
                fillOpacity: 0.35
            }).setMap(map);

        }
    }
    catch (error) {
        console.log('Google maps can not be loaded due to error');
    }


}

function convertToDate(input) {
    return moment(moment().format('DD-MM-YYYY') + " " + input, "DD-MM-YYYY HH:mm");
}

function convertToWeekFormat(weekTrips, sundayTrips) {
    var monday = [];
    var sunday = [];
    var week = [];
    monday.push(weekTrips[0]);
    for (var j = 1; j < weekTrips.length; j++) {

        if (convertToDate(monday[0]) < convertToDate(weekTrips[j])) {
            monday.push(weekTrips[j]);
        }
        else {
            week.push(weekTrips[j]);
            sunday.push(weekTrips[j]);
        }
    }

    for (var k = 0; k < monday.length; k++) {
        week.push(monday[k]);
    }

    sunday.push(sundayTrips[0]);

    for (var i = 1; i < sundayTrips.length; i++) {
        if (convertToDate(sunday[0]) < convertToDate(sundayTrips[i])) {
            sunday.push(sundayTrips[i]);
        }
        else {
            monday.unshift(sundayTrips[i]);
            sunday.push(sundayTrips[i]);
        }
    }


    return {
        sunday: sunday,
        monday: monday,
        weekFormat: week
    }
}

function nextTransport(weekTrips, sundayTrips) {
    var now = moment();
    var allTrips = convertToWeekFormat(weekTrips, sundayTrips);
    var gotTrip = false;
    var nextTrip;
    if (now.weekday() == 0) { //0 is Monday
        for (var i = 0; i < allTrips.monday.length; i++) {
            if (now < convertToDate(allTrips.monday[i])) {
                gotTrip = true;
                nextTrip = convertToDate(allTrips.monday[i]);
                break;
            }
        }
        if (!gotTrip) {
            nextTrip = convertToDate(allTrips.weekFormat[0]).add(1, 'days');
        }
    }
    else if (now.weekday() == 6) { //6 is Sunday
        for (var j = 0; j < allTrips.sunday.length; j++) {
            if (now < convertToDate(allTrips.sunday[j])) {
                gotTrip = true;
                nextTrip = convertToDate(allTrips.sunday[j]);
                break;
            }
        }
        if (!gotTrip) {
            nextTrip = convertToDate(allTrips.monday[0]).add(1, 'days');
        }
    }
    else {
        for (var k = 0; k < allTrips.sunday.length; k++) {
            if (now < convertToDate(allTrips.weekFormat[k])) {
                gotTrip = true;
                nextTrip = convertToDate(allTrips.weekFormat[k]);
                break;
            }
        }
        if (!gotTrip) {
            nextTrip = convertToDate(allTrips.weekFormat[0]).add(1, 'days');
        }
    }

    return nextTrip;

}
