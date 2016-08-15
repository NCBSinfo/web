/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//Updates Sync Counter
function updateSyncCounter(user, data) {

    data.ref(user.uid + '/Sync/SyncCount').once('value').then(function (snapshot) {
        if (snapshot.val() !== null) {
            data.ref(user.uid + '/Sync/SyncCount').set(snapshot.val() + 1);
        } else
        {
            data.ref(user.uid + '/Sync/SyncCount').set(1);
        }
    });
}

//Updates stat Counter
function updateStatCounter(user, data) {

    data.ref(user.uid + '/Sync/StatCount').once('value').then(function (snapshot) {
        if (snapshot.val() !== null) {
            data.ref(user.uid + '/Sync/StatCount').set(snapshot.val() + 1);
        } else
        {
            data.ref(user.uid + '/Sync/StatCount').set(1);
        }
    });
}

//Gets day of year from timestamp
function getDayOfYear(now) {
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function commonUpdater(CurrentUser, CurrentData, property) {
    CurrentData.ref(CurrentUser.uid).once('value').then(function (snapshot) {
        //Check if user have access to this property
        var keyFound = false;
        var limit = 0;
        if (snapshot.val() !== null) {

            snapshot.forEach(
                    function (childSnapshot) {

                        if (childSnapshot.key.toString().toLowerCase() === "limits") {

                            childSnapshot.forEach(
                                    function (limitChilds) {
                                        if (limitChilds.key.toString().toLowerCase() === property.toLowerCase() + "limit") {
                                            keyFound = true;
                                            limit = parseInt(limitChilds.val());
                                        }
                                    });
                        }
                    }
            );

            //If user have access to property, check last access
            if (keyFound) {
                var proertyFound = false;
                snapshot.forEach(
                        function (childSnapshot) {
                            if (childSnapshot.key.toString().toLowerCase() === property.toLowerCase()) {
                                proertyFound = true;
                                if (childSnapshot.val().LastAccess !== undefined) {
                                    if (getDayOfYear(new Date(childSnapshot.val().LastAccess)) === getDayOfYear(new Date())) {
                                        var quotaLeft = limit - parseInt(childSnapshot.val().Count);
                                        if (quotaLeft > 0) {
                                            CurrentData.ref(CurrentUser.uid + '/' + property + '/Count').set(parseInt(childSnapshot.val().Count) + 1);
                                            CurrentData.ref(CurrentUser.uid + '/' + property + '/LastAccess').set(Date());
                                            Materialize.toast('Successful!', 4000);
                                        } else {
                                            alert("Your quota is over");
                                        }
                                    } else {
                                        console.log("Resetting Quota");
                                        CurrentData.ref(CurrentUser.uid + '/' + property + '/LastAccess').set(Date());
                                        CurrentData.ref(CurrentUser.uid + '/' + property + '/Count').set(1);
                                    }
                                } else {
                                    console.log("Starting process for the first time");
                                    CurrentData.ref(CurrentUser.uid + '/' + property + '/LastAccess').set(Date());
                                    CurrentData.ref(CurrentUser.uid + '/' + property + '/Count').set(1);
                                }
                            }
                        }
                );
                if (proertyFound === false) {
                    console.log("Resetting Property");
                    CurrentData.ref(CurrentUser.uid + '/' + property + '/LastAccess').set(Date());
                    CurrentData.ref(CurrentUser.uid + '/' + property + '/Count').set(1);
                }
            } else {
                alert("You don't have access to this Property");
            }

        } //If given property is not there 

        else
        {
            
            alert("Your details are not updated in our database. Contact developers.");

        }
    });
}

