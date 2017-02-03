/**
 * Created by Dexter on 27-08-16.
 */

if (typeof(Storage) !== "undefined") {

    if(localStorage.getItem("mode")!==null){
        window.location = "home/";
    }
    else {
        console.log("No prefixed mode found");
    }

} else {
    // Sorry! No Web Storage support..
}

$('#card_signIn').click(function(){
    //localStorage.setItem("mode", "login");
});


//localStorage.removeItem("lastname");