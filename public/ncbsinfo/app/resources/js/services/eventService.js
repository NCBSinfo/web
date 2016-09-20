/**
 * Created by Dexter on 19-09-16.
 */


app.service('eventService', function ($http, $mdToast) {

    var dataLoading = {
        isIt: true
    };

    var event = {};

    this.currentEvent = function(){
        return event;
    };

    this.setEvent = function(newEvent){
        event = newEvent;
    };

    var allEvents = [];
    var upcomingEvents = [];
    var pastEvents = [];

    this.isDataLoading = function () {
        return dataLoading.isIt;
    };

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

    $http.post(URL, data, config)
        .success(function (data, status, headers, config) {

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
            dataLoading.isIt = false;
        })
        .error(function (data, status, header, config) {
            dataLoading.isIt = false;
            console.log(status);
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Error ' + status + "! contact Admin")
                    .position('right bottom')
                    .hideDelay(3000)
            );

        });

    this.getAllEvents = function () {
        return allEvents;
    };
    this.getUpcomingEvents = function () {
        return upcomingEvents;
    };
    this.getPastEvents = function () {
        return pastEvents;
    }
});