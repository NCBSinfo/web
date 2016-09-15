/**
 * Created by Dexter on 13-09-16.
 */

var colors = ['#F44336', '#9C27B0', '#3F51B5', '#4CAF50', '#009688', '#795548'];
var isConnected = true;
var request = new XMLHttpRequest();
request.open('GET', "app/views/home.html", true);
request.setRequestHeader("Content-Type", "application/json");
request.send(JSON.stringify({search: 'NCBSinfo'}));
request.onreadystatechange = function () {
    if (request.status == 0) {
        isConnected = false;
        console.log('No internet connection found');
    }
    else {
        console.log('Successfully connected.');
    }
};

function convertToReadable(data) {

    if (data.toLowerCase().indexOf('am') == -1 && data.toLowerCase().indexOf('pm') == -1) {

        data = data.trim();
        var split = data.split(":");
        var hour = parseInt(split[0]);
        var suffix;

        if (hour > 12) {
            suffix = " PM";
            hour = hour - 12;
        } else {
            suffix = " AM";
        }
        if (String(hour).length === 1) {
            hour = "0" + hour;
        }
        return hour + ":" + split[1] + suffix;
    }
    else {
        return data;
    }

}

function convertAll(myList) {
    for (var i = 0; i < myList.length; i++) {
        myList[i] = convertToReadable(myList[i]);
    }
    return myList;
}

function getArray() {
    var refinedModel = [];
    var singleBuggy = true;
    for (var r = 0; r < routes.length; r++) {
        if (String(routes[r].type) === 'shuttle') {
            refinedModel.push(
                {
                    tabName: routes[r].from.toUpperCase() + "-" + routes[r].to.toUpperCase(),
                    weekTitle: "Weekdays",
                    weekTrips: convertAll(routes[r].weekTrip),
                    sundayTitle: "Sunday",
                    sundayTrips: convertAll(routes[r].sundayTrip)
                }
            );
        }
        else {
            if (singleBuggy) {
                refinedModel.push(
                    {
                        tabName: "Buggy",
                        weekTitle: "From NCBS",
                        weekTrips: convertAll(routes[4].weekTrip),
                        sundayTitle: "From Mandara",
                        sundayTrips: convertAll(routes[5].weekTrip)
                    });
                singleBuggy = false;
            }
        }

    }
    return refinedModel;
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


function loadMap(lat, lng, route) {

    if (isConnected) {
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


}