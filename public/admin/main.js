
var submitBtn = document.getElementById('submit');
mask.style.display = 'none'; // hide

submitBtn.onclick = function () {
    toggleSignIn();
};

function noAccessWarning() {
    submitBtn.style.display = 'none';
    mask.style.display = 'block';
    var r = confirm("You do not have access to this area. Please contact developers.");
    if (r === true) {
        submitBtn.style.display = 'block';
        mask.style.display = 'none'; // hide
    } else {
        x = "Cancelled";
    }
}



function toggleSignIn() {
    if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
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
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);


        });
    }

}




