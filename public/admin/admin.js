/**
 * Created by Dexter on 30-08-16.
 */

var url = "https://fcm.googleapis.com/fcm/send";
var method = "POST";
var async = true;
var popup = $('#popup');
var apiKey;
var data;

var request = new XMLHttpRequest();
request.onload = function () {
    var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
    var data = request.responseText; // Returned data, e.g., an HTML document.
    console.log(status);
    console.log(data);
};


$("#send").click(function () {

    apiKey = $('#apiKey').val();
    var sendTo = $('#sendTo').val();
    var title = $('#title').val();
    var message = $('#message').val();
    var rcode = $('#rcode').val();

    if (apiKey.length !== 0 && sendTo.length !== 0 && title.length !== 0 && message.length !== 0) {

        var codeTitle = $('#code_title');
        var code = $('#pop_code');
        $('#pop_to').text(sendTo);
        $('#pop_title').text(title);
        $('#pop_message').text(message);
        codeTitle.show();
        code.show();


        if (rcode.length === 0) {
            var dataVars = {
                'title': title,
                'message': message
            };

            codeTitle.hide();
            code.hide();
        }
        else {

            dataVars = {
                'title': title,
                'message': message,
                'rcode': rcode
            };

            code.text(rcode);

        }

        data = {
            'to': sendTo,
            'data': dataVars
        };


    } else {
        Materialize.toast("All Fields are Mandatory", 4000, 'rounded');

    }

});

$(document).ready(function () {
    $('.popup_trigger').leanModal({
        ready: function () {
            $('#sendBtn').click(function () {
                request.open(method, url, async);
                request.setRequestHeader("Content-Type", "application/json");
                request.setRequestHeader("Authorization", "key=" + apiKey);
                request.send(JSON.stringify(data));
                popup.closeModal();
            })
        }
    });
})
;