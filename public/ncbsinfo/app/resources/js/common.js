/**
 * Created by Dexter on 13-09-16.
 */

var colors = ['#F44336', '#9C27B0', '#3F51B5', '#4CAF50', '#009688', '#795548'];

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

String.prototype.toDate = function () {
    return moment(moment().format('DD-MM-YYYY') + " " + this, "DD-MM-YYYY HH:mm");

};

function convertToWeekFormat(weekTrips, sundayTrips) {
    var monday = [];
    var sunday = [];
    var week = [];
    monday.push(weekTrips[0]);
    for (var j = 1; j < weekTrips.length; j++) {

        if (monday[0].toDate() < weekTrips[j].toDate()) {
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
        if (sunday[0].toDate() < sundayTrips[i].toDate()) {
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
    var allTrips = convertToWeekFormat(weekTrips, sundayTrips);
    var gotTrip = false;
    var nextTrip;
    if (moment().weekday() == 0) { //0 is Monday
        for (var i = 0; i < allTrips.monday.length; i++) {
            if (moment() < allTrips.monday[i].toDate()) {
                gotTrip = true;
                nextTrip = allTrips.monday[i].toDate();
                break;
            }
        }
        if (!gotTrip) {
            nextTrip = allTrips.weekFormat[0].toDate().add(1, 'days');
        }
    }
    else if (moment().weekday() == 6) { //6 is Sunday
        for (var j = 0; j < allTrips.sunday.length; j++) {
            if (moment() < allTrips.sunday[j].toDate()) {
                gotTrip = true;
                nextTrip = allTrips.sunday[j].toDate();
                break;
            }
        }
        if (!gotTrip) {
            nextTrip = allTrips.monday[0].toDate().add(1, 'days');
        }
    }
    else {
        for (var k = 0; k < allTrips.sunday.length; k++) {
            if (moment() < allTrips.weekFormat[k].toDate()) {
                gotTrip = true;
                nextTrip = allTrips.weekFormat[k].toDate();
                break;
            }
        }
        if (!gotTrip) {
            nextTrip = allTrips.weekFormat[0].toDate().add(1, 'days');
        }
    }

    return nextTrip;

}


function loadMap() {
    new google.maps.Map(document.getElementById('map_canvas'), {
        center: {lat: 13.070639, lng: 77.581128},
        zoom: 15
    });
}