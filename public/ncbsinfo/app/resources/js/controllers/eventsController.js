/**
 * Created by Dexter on 17-09-16.
 */
app.controller('eventsController', function ($scope, setupService, eventService, $mdDialog) {
    setupService.setup();
    $scope.dataLoading = function () {
        return eventService.isDataLoading();
    };


    $scope.upcomingEmpty = function () {
        if (eventService.isDataLoading()) {
            return false;
        }
        else {
            return eventService.getUpcomingEvents().length == 0;
        }
    };

    $scope.pastEmpty = function () {
        if (eventService.isDataLoading()) {
            return false;
        }
        else {
            return eventService.getPastEvents().length == 0;
        }
    };

    $scope.upComings = eventService.getUpcomingEvents();
    // $scope.upComings = {h: tempEvent};
    $scope.past = eventService.getPastEvents();


    $scope.getEventDate = function (item) {
        return moment(item.date + ' ' + item.time, 'DD/MM/YYYY HH:mm:ss').format('DD');
    };

    $scope.getEventMonth = function (item) {
        return moment(item.date + ' ' + item.time, 'DD/MM/YYYY HH:mm:ss').format('MMM').toUpperCase();
    };


    $scope.eventDetails = function (ev, event) {
        eventService.setEvent(event);
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'app/views/static/event.dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });

    };


});

function DialogController($scope, $mdDialog, eventService, commonFunctions) {
    $scope.event = eventService.currentEvent();

    $scope.getDialogDate = function (item) {
        return moment(item.date + ' ' + item.time, 'DD/MM/YYYY HH:mm:ss').format('ddd, DD MMM YYYY');
    };

    $scope.getDialogTime = function (item) {
        return moment(item.date + ' ' + item.time, 'DD/MM/YYYY HH:mm:ss').format('hh:mm A').toUpperCase();
    };

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
        commonFunctions.goTo('locations');
    };
}

var tempEvent = {
    affiliation: "NCBS",
    dataCode: "RTALK",
    date: "14/10/2016",
    host: "Dean's Office",
    notificationTitle: "Thesis Seminar by Priyanka Gupta",
    speaker: "Priyanka Gupta",
    time: "17:00:00",
    timeStamp: "15/09/2016 18:47:58",
    title: "Summation of odor inputs in the rat olfactory bulb",
    venue: "Haapus (LH-1)"
};