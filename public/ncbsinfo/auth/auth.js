/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var userEmail = document.getElementById('userEmail');
var signOut = document.getElementById('signOut');
var signOutMobile = document.getElementById('signOutMobile');
var apiKey;

function initApp() {
// Listening for auth state changes.
// [START authstatelistener]
    firebase.auth().onAuthStateChanged(function (user) {
// [START_EXCLUDE silent
// [END_EXCLUDE]
        if (user) {
// User is signed in.
            userEmail.innerHTML = user.email;
            CurrentUser = firebase.auth().currentUser;
            CurrentData = firebase.database();
            CurrentData.ref(CurrentUser.uid).once('value').then(function (snapshot) {
                if (snapshot.val().apiKey !== undefined) {
                    apiKey = snapshot.val().apiKey;
                } else {
                    alert("Error : Unable to retrieve API key. Make sure if you have permission for this operation.");
                }
                updateAllQuota();
            });

        } else {
    // User is signed out.
    // Send user to home page
          window.location = "../index.html";
        }
    });
    // [END authstatelistener]

}
window.onload = function () {
    initApp();
}
;
signOut.onclick = function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location = "../index.html";
    }, function (error) {
        alert(error.message);
    });
};
signOutMobile.onclick = function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location = "../index.html";
    }, function (error) {
        alert(error.message);
    });
};
//Firebase Functions
var CurrentUser = firebase.auth().currentUser;
var CurrentData = firebase.database();
var syncButton = document.getElementById('syncButton');
var statButton = document.getElementById('statButton');

syncButton.onclick = function () {
    commonUpdater(CurrentUser, CurrentData, "Sync");
};

statButton.onclick = function () {
    commonUpdater(CurrentUser, CurrentData, "Stat");
};

var synQuota = document.getElementById('synQuota');
var statQuota = document.getElementById('statQuota');
var notiQuota = document.getElementById('notiQuota');




function updateAllQuota() {

    updateSync();
    updateStat();

}

function updateSync() {
    var SyncLimit = 0;
    var updateSyncQuota = CurrentData.ref().child(CurrentUser.uid).child('Sync').child('Count');
    CurrentData.ref().child(CurrentUser.uid).once('value').then(function (snapshot) {
        if (snapshot.val().Limits.syncLimit !== undefined) {
            SyncLimit = snapshot.val().Limits.syncLimit;
            
        } else {
            syncButton.disabled = true;
        }
        if (snapshot.val().Sync.Count !== undefined) {
            var quota = parseInt(SyncLimit) - parseInt(snapshot.val().Sync.Count);
            if (quota > 0) {
                syncButton.disabled = false;
            } else {
                syncButton.disabled = true;
            }
            synQuota.innerHTML = quota;
            synQuota.className = "badge";
        } else {
            synQuota.innerHTML = 0;
            synQuota.className = "badge";
        }
        updateSyncQuota.on('value', function (data) {
            if (data.val() !== null) {
                if (parseInt(SyncLimit) - parseInt(data.val()) !== 0) {
                    synQuota.innerHTML = parseInt(SyncLimit) - parseInt(data.val());
                    synQuota.className = "new badge";
                } else {
                    synQuota.innerHTML = 0;
                    synQuota.className = "badge";
                }
            }
        });
    });
}


function updateStat() {
    var StatLimit = 0;
    var updateStatQuota = CurrentData.ref().child(CurrentUser.uid).child('Stat').child('Count');
    CurrentData.ref().child(CurrentUser.uid).once('value').then(function (snapshot) {
        if (snapshot.val().Limits.statLimit !== undefined) {
            StatLimit = snapshot.val().Limits.statLimit;
        } else {
            statButton.disabled = true;
        }
        if (snapshot.val().Stat.Count !== undefined) {

            var quota2 = parseInt(StatLimit) - parseInt(snapshot.val().Stat.Count);

            if (quota2 > 0) {
                statButton.disabled = false;
            } else {
                statButton.disabled = true;
            }
            statQuota.innerHTML = quota2;
            statQuota.className = "badge";
        } else {
            statQuota.innerHTML = 0;
            statQuota.className = "badge";
        }
    });
    updateStatQuota.on('value', function (data) {
        if (data.val() !== null) {
            if (parseInt(StatLimit) - parseInt(data.val()) !== 0) {
                statQuota.innerHTML = parseInt(StatLimit) - parseInt(data.val());
                statQuota.className = "new badge";
            } else {
                statQuota.innerHTML = 0;
                statQuota.className = "badge";
            }
        }
    });
}


