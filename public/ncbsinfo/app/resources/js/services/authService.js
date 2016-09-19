/**
 * Created by Dexter on 18-09-16.
 */

var config = {
    apiKey: "AIzaSyB0OMGUj9PWfG4JLqUiVLmTWfzoJzYOUdw",
    authDomain: "ncbs-info.firebaseapp.com",
    databaseURL: "https://ncbs-info.firebaseio.com",
    storageBucket: "ncbs-info.appspot.com",
    messagingSenderId: "154840463538"
};
firebase.initializeApp(config);

app.service('authService', function ($firebaseAuth, setupService, $mdToast, commonFunctions, $firebaseObject) {

    var dataSending = {
        isIt: false
    };

    this.isDataSending = function () {
        return dataSending;
    };

    var auth = $firebaseAuth();
    var userData = {
        name: 'User Name',
        email: 'email',
        defaultRoute: 0,
        notifications: 'ON'
    };
    var FireUser;
    auth.$onAuthStateChanged(function (firebaseUser) {
        if (firebaseUser) {
            FireUser = firebaseUser;
            dataSending.isIt = true;
            localStorage.mode = "auth";
            localStorage.email = firebaseUser.email;

            var ref = firebase.database().ref();
            var refEmail = firebaseUser.email.replace("@", "_").replace(".", "_");
            var fireObject = $firebaseObject(ref.child('newUsers').child(refEmail));
            fireObject.$loaded().then(function () {
                userData.name = fireObject.name;
                userData.email = fireObject.email;
                userData.defaultRoute = fireObject.defaultRoute;
                if (fireObject.notificationPreference == 2) {
                    userData.notifications = 'ON';
                }
                else {
                    userData.notifications = 'ON';
                }
                dataSending.isIt = false;
            });


        }
    });

    this.getUserData = function () {
        return userData;
    };

    this.signOut = function () {
        auth.$signOut();
    };

    this.signIn = function (email, password) {

        dataSending.isIt = true;
        auth.$signInWithEmailAndPassword(email, password)
            .then(function (firebaseUser) {
                console.log("Signed in as:", firebaseUser.email);
                localStorage.mode = "auth";
                localStorage.email = firebaseUser.email;
                commonFunctions.goTo('home')
            }).catch(function (error) {
                dataSending.isIt = false;
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(error.message)
                        .position('right bottom')
                        .hideDelay(3000)
                );
            });

    };

    this.saveData = function (user) {
        dataSending.isIt = true;
        var ref = firebase.database().ref();
        var refEmail = FireUser.email.replace("@", "_").replace(".", "_");
        var fireObject = $firebaseObject(ref.child('newUsers').child(refEmail));
        fireObject.name = user.name;
        fireObject.defaultRoute = user.route;
        fireObject.webSync = moment().format('hh:mm:ss A DD MMM YY');
        if (user.notifications == 'OFF') {
            fireObject.notificationPreference = 2;
        }
        else {
            fireObject.notificationPreference = 1;
        }
        fireObject.$save().then(function (ref) {
            dataSending.isIt = false;
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Preferences updated successfully')
                    .position('right bottom')
                    .hideDelay(3000)
            );
            console.log("Preferences Saved");
        }, function (error) {
            console.log("Error:", error);
        });
    };


});
