/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var inputCard = document.getElementById('inputCard');
var messageCard = document.getElementById('messageCard');
var message = document.getElementById('message');
messageCard.style.display = 'none';

document.addEventListener('DOMContentLoaded', function () {
    // TODO: Implement getParameterByName()

    // Get the action to complete.
    var mode = getParameterByName('mode');
    // Get the one-time code from the query parameter.
    var actionCode = getParameterByName('oobCode');
    // (Optional) Get the API key from the query parameter.
    var apiKey = getParameterByName('apiKey');

    console.log(mode);
    var auth = firebase.auth();

    // Handle the user management action.
    switch (mode) {
        case 'resetPassword':
            // Display reset password handler and UI.
            handleResetPassword(auth, actionCode);
            break;
        case 'recoverEmail':
            // Display email recovery handler and UI.
            handleRecoverEmail(auth, actionCode);
            break;
        case 'verifyEmail':
            // Display email verification handler and UI.
            handleVerifyEmail(auth, actionCode);
            break;
        default:
            messageCard.style.display = 'block';
            inputCard.style.display = 'none';
            message.innerHTML = "Oops ! Invalid link. Link is either expired, or has already been used. Try resending password reset link.";

    }
}, false);

var pass = document.getElementById('password');
var cPass = document.getElementById('confirmpassword');
function handleResetPassword(auth, actionCode) {
    var accountEmail;
    // Verify the password reset code is valid.
    auth.verifyPasswordResetCode(actionCode).then(function (email) {
        var accountEmail = email;

        // TODO: Show the reset screen with the user's email and ask the user for
        // the new password.
        document.getElementById('email').innerHTML = email;
        // Save the new password.
        document.getElementById('submit').onclick = function () {
            if (String(pass.value).length > 5 && String(cPass.value).length > 5) {

                if (String(cPass.value) === String(pass.value)) {
                    auth.confirmPasswordReset(actionCode, String(pass.value)).then(function (resp) {
                        // Password reset has been confirmed and new password updated.
                        Materialize.toast("Password changed successfully", 4000, 'rounded');
                        messageCard.style.display = 'block';
                        inputCard.style.display = 'none';
                        message.innerHTML = "Password for \'" + email + "\' has been changed successfully. You can login into app or can manage account from browser.";
                        // TODO: Display a link back to the app, or sign-in the user directly
                        // if the page belongs to the same domain as the app:
                        // auth.signInWithEmailAndPassword(accountEmail, newPassword);
                    }).catch(function (error) {
                        // Error occurred during confirmation. The code might have expired or the
                        // password is too weak.
                        messageCard.style.display = 'block';
                        inputCard.style.display = 'none';
                        message.innerHTML = error.message;
                        Materialize.toast(error.message, 4000, 'rounded');
                    });
                } else {
                    Materialize.toast('Password and confirmed password should be same', 4000, 'rounded');
                }
            } else {
                Materialize.toast('Password should be atleast 6 character long', 4000, 'rounded');
            }
        };
    }).catch(function (error) {
        // Invalid or expired action code. Ask user to try to reset the password
        // again.
        messageCard.style.display = 'block';
        inputCard.style.display = 'none';
        message.innerHTML = "Oops ! Invalid link. Link is either expired, or has already been used. Try resending password reset link.";
    });
}

function getParameterByName(parameter) {
    return decodeURIComponent((new RegExp('[?|&]' + parameter + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
document.getElementById('goback').onclick = function (){
    window.location = "../../index.html";
};
