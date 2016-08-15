/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


document.getElementById('submit').onclick = function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            Materialize.toast('Please enter an email address.', 4000, 'rounded');
            return;
        }
        if (password.length < 4) {
            Materialize.toast('Please enter a valid password', 4000, 'rounded');
            return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {

            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                Materialize.toast('Wrong password', 4000, 'rounded');
            } else {
                Materialize.toast(errorMessage, 4000, 'rounded');
            }

        });
    }

}

function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            window.location = 'dashboard/';
        } else {
        }
    });

}
window.onload = function () {
    initApp();
};

document.getElementById('back').onclick = function () {
    window.history.back();
};

document.getElementById('forgotPass').onclick = function () {
    if (String(document.getElementById('email').value).match(/\S+@\S+.\S+/))
    {
        firebase.auth().sendPasswordResetEmail(String(document.getElementById('email').value)).then(function () {
            Materialize.toast("Reset Email Sent, Check your inbox", 4000, 'rounded');
        }, function (error) {
            Materialize.toast(error.message, 4000, 'rounded');
        });

    } else {
        Materialize.toast("Enter valid email address to use forgot password", 4000, 'rounded');
    }
};
