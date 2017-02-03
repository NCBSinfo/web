/**
 * Created by Dexter on 27-08-16.
 */

//TODO : path
var rootPath = "/Secret%20Biology";
var currentPath = window.location.pathname.replace(rootPath, "").replace("index.html","");
var currentTitle = "NCBSinfo";
$('#main').hide();
console.log(currentPath);

var selectorColor = "orange";
var windowSize = $(window).width();

$(document).ready(function(){
    $('#nav-web').load(rootPath +'/ncbsinfo/elements/online_nav.html', function(){

        $(".button-collapse").sideNav();
        $('.collapsible').collapsible();
        var homeBtn = $('#nav_home');
        var transportBtn = $('#nav_transport');
        var eventsBtn = $('#nav_events');
        var contactBtn = $('#nav_contact');
        var dashboardBtn = $('#nav_dashboard');
        var backBtn = $('#nav_back');
        var forgotBtn = $('#nav_forgotPass');
        var logoutBtn = $('#nav_signOut');
        if (windowSize < 440) {
            console.log("This is mobile");
            homeBtn.css("font-size", 20 + "px");
        }

        homeBtn.attr("href", rootPath+"/ncbsinfo/home/");
        transportBtn.attr("href", rootPath+"/ncbsinfo/transport/");
        contactBtn.attr("href", rootPath+"/ncbsinfo/contacts/");
        eventsBtn.attr("href", rootPath+"/ncbsinfo/events/");
        dashboardBtn.attr("href", rootPath+"/ncbsinfo/dashboard/");
        backBtn.click(function (){
            window.history.back();
        });

        logoutBtn.click(function(){
            //TODO: Sign out function
            localStorage.removeItem("mode");
            location.href = rootPath+"/ncbsinfo/index.html";
        });

        forgotBtn.hide();
        backBtn.hide();
        switch (String(currentPath)){
            case '/ncbsinfo/':
                homeBtn.addClass("center");
                transportBtn.hide();
                logoutBtn.hide();
                contactBtn.hide();
                eventsBtn.hide();
                dashboardBtn.hide();
                backBtn.show();
                break;
            case '/ncbsinfo/home/':
                $('#nav_home_selector').addClass(selectorColor);
                currentTitle = "Home";
                break;
            case '/ncbsinfo/transport/':
                $('#nav_transport_selector').addClass(selectorColor);
                currentTitle = "Transport";
                break;
            case '/ncbsinfo/contacts/':
                $('#nav_contact_selector').addClass(selectorColor);
                currentTitle = "Contacts";
                break;
            case '/ncbsinfo/dashboard/':
                $('#nav_dashboard_selector').addClass(selectorColor);
                currentTitle = "Dashboard";
                break;
            case '/ncbsinfo/events/':
                $('#nav_events_selector').addClass(selectorColor);
                currentTitle = "Events";
                break;
            case '/ncbsinfo/login/':
                homeBtn.addClass("center");
                transportBtn.hide();
                logoutBtn.hide();
                contactBtn.hide();
                eventsBtn.hide();
                dashboardBtn.hide();
                backBtn.show();
                currentTitle = "Login";
                break;

        }
    });

    $('#nav-mobile').load(rootPath + '/ncbsinfo/elements/online_drawer.html', function(){

        $('#drawer_icon').attr("src", rootPath+"/icon.png");
        $('#drawer_home').attr("href", rootPath+"/ncbsinfo/");
        $('#drawer_transport').attr("href", rootPath+"/ncbsinfo/transport/");

    });
});

jQuery(window).load(function () {
    $('#loader').hide();
    $('#main').show();

    if(windowSize <= 992){
        $('#nav_home').text(currentTitle);
    }
});