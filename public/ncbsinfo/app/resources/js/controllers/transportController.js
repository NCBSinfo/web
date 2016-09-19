/**
 * Created by Dexter on 17-09-16.
 */
app.controller('transportController', function ($scope, setupService) {
    setupService.setup();
    $scope.allTabs = getArray();
    $scope.selectedIndex = 0;
});

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
                    tabName: routes[r].from.toUpperCase() + " - " + routes[r].to.toUpperCase(),
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
