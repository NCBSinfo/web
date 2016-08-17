/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var userEmail = document.getElementById('userEmail');
var signOut = document.getElementById('signOut');
var signOutMobile = document.getElementById('signOutMobile');
var popUpHeader = document.getElementById('popup_main');
var popUpSub = document.getElementById('popup_sub');
var popupInput = document.getElementById('popup_input');
var popUpLabel = document.getElementById('popup_label');
var userNameDisplay = document.getElementById('userNameDisplay');
var defaultRoute = document.getElementById('defaultRoute');
var NameData;
var PasswordData;
var currentDefaultRoute;

var userProgress = document.getElementById('userProgress');
var passProgress = document.getElementById('passProgress');
var saveProgress = document.getElementById('saveProgress');

var emailLoc;
var newUser = false;

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
            emailLoc = user.email.replace("@", "_").replace(".", "_");

            CurrentData.ref('newUsers/' + emailLoc + '/browserLogin').set(String(new Date())).then(function () {

                CurrentData.ref('newUsers/' + emailLoc).once('value').then(function (snapshot) {

                    if (snapshot.val().name !== undefined) {
                        NameData = snapshot.val().name;
                        userNameDisplay.textContent = NameData;
                        userProgress.style.display = 'none';
                        $("#side_nav_name").text(NameData);
                        $("#side_nav_email").text(user.email);
                    }

                    if (snapshot.val().defaultRoute !== undefined) {
                        currentDefaultRoute = String(snapshot.val().defaultRoute);
                        defaultRoute.textContent = getRouteName(String(snapshot.val().defaultRoute));

                    }

                    if (snapshot.val().notificationPreference !== undefined) {
                        document.getElementById('notiPreference').checked = true;

                    }

                }).catch(function (error) {

                    var errorCode = error.code;
                    var errorMessage = error.message;

                    Materialize.toast(error.message, 4000, 'rounded');

                });


            }).catch(function (error) {

                if (error.code === "PERMISSION_DENIED") {
                    CurrentData.ref('authEmails/' + user.uid).set(user.email).then(function () {
                        CurrentData.ref('newUsers/' + emailLoc + '/name').set("Your Name");
                        CurrentData.ref('newUsers/' + emailLoc + '/defaultRoute').set("0");
                        CurrentData.ref('newUsers/' + emailLoc + '/notificationPreference').set("1");
                        userProgress.style.display = 'none';
                        newUser = true;
                        localStorage.setItem("newUser", newUser);
                        location.reload();
                    });
                } else {
                    Materialize.toast(error.message, 4000, 'rounded');
                }
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
    var isNew = localStorage.getItem("newUser");
    if(isNew!==null){
        console.log("This is new user");
        localStorage.removeItem('newUser');
        Materialize.toast("Update your preferences", 4000, 'rounded');
    }
}
;
signOut.onclick = function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location = "../index.html";
    }, function (error) {
        Materialize.toast(error.message, 4000, 'rounded');
    });
};
signOutMobile.onclick = function () {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        window.location = "../index.html";
    }, function (error) {
        Materialize.toast(error.message, 4000, 'rounded');
    });
};


document.getElementById('username').onclick = function () {
    popUpHeader.innerHTML = 'Change Name';
    popUpLabel.innerHTML = 'Name';
    popupInput.type = 'text';
    popUpSub.innerHTML = 'Previous Value : ' + NameData;
};

$(document).ready(function () {

    saveProgress.style.display = 'none';

    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger1').leanModal({
        dismissible: true,
        ready: function () {
            document.getElementById('changeModal').onclick = function () {
                if (popupInput.value.replace(" ", "").length !== 0) {
                    userNameDisplay.textContent = popupInput.value;
                }
            };
        }
    }
    );

    $('.modal-trigger2').leanModal({
        dismissible: true,
        ready: function () {
            document.getElementById('modChangeRoute').onclick = function () {
                var k = document.querySelector('input[name="routeGroup"]:checked').value;
                if (k !== null) {
                    currentDefaultRoute = k;
                    defaultRoute.textContent = getRouteName(k);
                }
            };
        }
    }
    );

    var oldPass = document.getElementById('popup_oldPass');
    var newPass = document.getElementById('popup_currentPass');
    var confirmPass = document.getElementById('popup_confirmPass');

    $('.modal-trigger3').leanModal({
        dismissible: false,
        ready: function () {
            passProgress.style.display = 'none';
            document.getElementById('changePassModal').onclick = function () {

                if (oldPass.value.length > 3 && newPass.value.length > 5 && confirmPass.value.length > 5) {

                    if (newPass.value === confirmPass.value) {
                        passProgress.style.display = 'block';
                        changePass(String(oldPass.value), String(newPass.value));
                    } else {
                        Materialize.toast("New Password and Confrim Password should be same", 4000, 'rounded');
                    }
                } else {
                    Materialize.toast("Password should be greater than 6 characters", 4000, 'rounded');
                }
            };

        }

    }
    );

});

function getRouteName(a) {

    if (a === '0') {
        return "NCBS-IISc";
    } else if (a === '1') {
        return "IISc-NCBS";
    } else if (a === '2') {
        return "NCBS-MANDARA";
    } else if (a === '3') {
        return "MANDARA-NCBS";
    } else if (a === '4') {
        return "NCBS-MANDARA Buggy";
    } else if (a === '5') {
        return "MANDARA-NCBS Buggy";
    } else if (a === '6') {
        return "NCBS-ICTS";
    } else if (a === '7') {
        return "ICTS-NCBS";
    } else if (a === '8') {
        return "NCBS-CBL";
    } else {
        return "NCBS-IISc";
    }
}


function changePass(oldPass, newPass) {

    firebase.auth().signInWithEmailAndPassword(CurrentUser.email, oldPass).then(function () {
        CurrentUser.updatePassword(newPass).then(function () {

            $('#popup_pass').closeModal();
            Materialize.toast('Password changed successfully', 4000, 'rounded');

        }, function (error) {
            passProgress.style.display = 'none';
            Materialize.toast(error.message, 4000, 'rounded');
        });
    }, function (error) {
        passProgress.style.display = 'none';
        console.log("Error !");
        Materialize.toast(error.message, 4000, 'rounded');
        // An error happened.
    });

}

document.getElementById('saveButton').onclick = function () {
    saveProgress.style.display = 'block';
    CurrentData = firebase.database();
    CurrentData.ref('newUsers/' + emailLoc).once('value').then(function (snapshot) {

        var n1;
        if (document.getElementById('notiPreference').checked) {
            n1 = '1';
        } else {
            n1 = '2';
        }
        CurrentData.ref('newUsers/' + emailLoc + '/name').set(userNameDisplay.textContent);
        CurrentData.ref('newUsers/' + emailLoc + '/defaultRoute').set(currentDefaultRoute);
        CurrentData.ref('newUsers/' + emailLoc + '/notificationPreference').set(n1);
        CurrentData.ref('newUsers/' + emailLoc + '/browserUpdate').set(String(new Date()))
                .then(function () {
                    Materialize.toast("Data Updated !", 4000, 'rounded');
                    saveProgress.style.display = 'none';
                });

    }, function (error) {
        saveProgress.style.display = 'none';
        Materialize.toast(error.message, 4000, 'rounded');
    });
};

document.getElementById('cancelButton').onclick = function () {
    location.reload();
};
