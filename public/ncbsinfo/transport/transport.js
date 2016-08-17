/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function convertToReadable(data) {
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


$(document).ready(function () {
    $(".button-collapse").sideNav();
    $('.collapsible').collapsible();
    initApp();
    fillStart(def_ncbs_iisc_week, def_ncbs_iisc_sunday);

});

function hideNav() {
    $('.button-collapse').sideNav('hide');
}


function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
// User is signed in.
            CurrentUser = firebase.auth().currentUser;
            CurrentData = firebase.database();
            emailLoc = user.email.replace("@", "_").replace(".", "_");
            CurrentData.ref('newUsers/' + emailLoc).once('value').then(function (snapshot) {

                if (snapshot.val().name !== undefined) {
                    NameData = snapshot.val().name;

                    $("#side_nav_name").text(NameData);
                    $("#side_nav_email").text(user.email);
                    $("#userEmail").text(user.email);

                }

                if (snapshot.val().defaultRoute !== undefined) {
                    currentDefaultRoute = String(snapshot.val().defaultRoute);


                }

            });

        } else {
            $("#side_nav_name").text("NCBSinfo web");
            $("#side_nav_email").text("beta");
            $("#dash_nav").hide();
            $("#dash_divider").hide();
            $("#userEmail").hide();
            $("#signOut").hide();
        }
    });
    // [END authstatelistener]

}

function goBack() {
    window.history.back();
}
;

function fillStart(routeWeek, routeSunday) {
    var pastWeek = document.getElementById('transportWeek_start');
    var pastSunday = document.getElementById('transportSunday_start');

    while (pastWeek.firstChild) {
        pastWeek.removeChild(pastWeek.firstChild);
    }

    while (pastSunday.firstChild) {
        pastSunday.removeChild(pastSunday.firstChild);
    }

    pastWeek.textContent = "Week Days*";
    pastSunday.textContent = "Sunday";

    var dummy1 = document.createElement('a');
    dummy1.className = "collection-item";
    pastWeek.appendChild(dummy1);
    var dummy2 = document.createElement('a');
    dummy2.className = "collection-item";
    pastWeek.appendChild(dummy1);
    pastSunday.appendChild(dummy2);

    for (var i = 0; i < routeWeek.length; i++) {
        var a = document.createElement('a');
        a.textContent = convertToReadable(routeWeek[i]);
        a.className = "collection-item";
        pastWeek.appendChild(a);
    }

    for (var i = 0; i < routeSunday.length; i++) {
        var a = document.createElement('a');
        a.textContent = convertToReadable(routeSunday[i]);
        a.className = "collection-item";
        pastSunday.appendChild(a);
    }
}


function fillTrips(routeWeek, routeSunday) {
    var pastWeek = document.getElementById('transportWeek');
    var pastSunday = document.getElementById('transportSunday');

    while (pastWeek.firstChild) {
        pastWeek.removeChild(pastWeek.firstChild);
    }

    while (pastSunday.firstChild) {
        pastSunday.removeChild(pastSunday.firstChild);
    }

    pastWeek.textContent = "Week Days*";
    pastSunday.textContent = "Sunday";

    var dummy1 = document.createElement('a');
    dummy1.className = "collection-item";
    pastWeek.appendChild(dummy1);
    var dummy2 = document.createElement('a');
    dummy2.className = "collection-item";
    pastWeek.appendChild(dummy1);
    pastSunday.appendChild(dummy2);

    for (var i = 0; i < routeWeek.length; i++) {
        var a = document.createElement('a');
        a.textContent = convertToReadable(routeWeek[i]);
        a.className = "collection-item";
        pastWeek.appendChild(a);
    }

    for (var i = 0; i < routeSunday.length; i++) {
        var a = document.createElement('a');
        a.textContent = convertToReadable(routeSunday[i]);
        a.className = "collection-item";
        pastSunday.appendChild(a);
    }
}

function fillBuggy(ncbs, mandara) {
    var pastWeek = document.getElementById('transportWeek_buggy');
    var pastSunday = document.getElementById('transportSunday_buggy');

    while (pastWeek.firstChild) {
        pastWeek.removeChild(pastWeek.firstChild);
    }

    while (pastSunday.firstChild) {
        pastSunday.removeChild(pastSunday.firstChild);
    }

    pastWeek.textContent = "From NCBS";
    pastSunday.textContent = "From Mandara";

    var dummy1 = document.createElement('a');
    dummy1.className = "collection-item";
    pastWeek.appendChild(dummy1);
    var dummy2 = document.createElement('a');
    dummy2.className = "collection-item";
    pastWeek.appendChild(dummy1);
    pastSunday.appendChild(dummy2);

    for (var i = 0; i < ncbs.length; i++) {
        var a = document.createElement('a');
        a.textContent = convertToReadable(ncbs[i]);
        a.className = "collection-item";
        pastWeek.appendChild(a);
    }

    for (var i = 0; i < mandara.length; i++) {
        var a = document.createElement('a');
        a.textContent = convertToReadable(mandara[i]);
        a.className = "collection-item";
        pastSunday.appendChild(a);
    }
}


function signOut () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location = "../index.html";
    }, function (error) {
        Materialize.toast(error.message, 4000, 'rounded');
    });
};