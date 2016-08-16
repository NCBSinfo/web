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
            userEmail.innerHTML = user.email;
            CurrentUser = firebase.auth().currentUser;
            CurrentData = firebase.database();
            emailLoc = user.email.replace("@", "_").replace(".", "_");
            CurrentData.ref('newUsers/' + emailLoc).once('value').then(function (snapshot) {

                if (snapshot.val().name !== undefined) {
                    NameData = snapshot.val().name;
                    userNameDisplay.textContent = NameData;
                    userProgress.style.display = 'none';
                }

                if (snapshot.val().defaultRoute !== undefined) {
                    currentDefaultRoute = String(snapshot.val().defaultRoute);
                    defaultRoute.textContent = getRouteName(String(snapshot.val().defaultRoute));

                }

            });

        } else {
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
