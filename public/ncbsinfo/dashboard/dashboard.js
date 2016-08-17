function goBack() {
    window.history.back();
};

$(document).ready(function () {
    $(".button-collapse").sideNav();
    $('.collapsible').collapsible();
  
});

function hideNav() {
    $('.button-collapse').sideNav('hide');
}