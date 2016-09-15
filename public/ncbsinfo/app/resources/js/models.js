/**
 * Created by Dexter on 12-09-16.
 */

var SHUTTLE = 'shuttle';
var BUGGY = 'buggy';

var navBarMenu = [
    {name: 'Dashboard', icon: "app/resources/img/icons/dashboard.svg", inOffline: false, onHome: false},
    {name: 'Home', icon: "app/resources/img/icons/home.svg", inOffline: true, onHome: false},
    {name: 'Transport', icon: "app/resources/img/icons/shuttle.svg", inOffline: true, onHome: true},
    {name: 'Events', icon: "app/resources/img/icons/events.svg", inOffline: false, onHome: true},
    {name: 'Contacts', icon: "app/resources/img/icons/contact.svg", inOffline: true, onHome: true},
    {name: 'Locations', icon: "app/resources/img/icons/lecturehall.svg", inOffline: true, onHome: true},
    {name: 'Settings', icon: "app/resources/img/icons/settings.svg", inOffline: true, onHome: true},
    {name: 'Logout', icon: "app/resources/img/icons/logout.svg", inOffline: false, onHome: false}
];

var routes = [
    {
        number: 0,
        from: 'ncbs',
        to: 'iisc',
        type: SHUTTLE,
        weekTrip: def_ncbs_iisc_week,
        sundayTrip: def_ncbs_iisc_sunday,
        lat: 13.016160,
        lng: 77.567024
    },
    {
        number: 1,
        from: 'iisc',
        to: 'ncbs',
        type: SHUTTLE,
        weekTrip: def_iisc_ncbs_week,
        sundayTrip: def_iisc_ncbs_sunday,
        lat: 13.070639,
        lng: 77.581128
    },
    {
        number: 2,
        from: 'ncbs',
        to: 'mandara',
        type: SHUTTLE,
        weekTrip: def_ncbs_mandara_week,
        sundayTrip: def_ncbs_mandara_sunday,
        lat: 13.093818,
        lng: 77.577983
    },
    {
        number: 3,
        from: 'mandara',
        to: 'ncbs',
        type: SHUTTLE,
        weekTrip: def_mandara_ncbs_week,
        sundayTrip: def_mandara_ncbs_sunday,
        lat: 13.070639,
        lng: 77.581128
    },
    {
        number: 4,
        from: 'ncbs',
        to: 'mandara',
        type: BUGGY,
        weekTrip: def_buggy_from_ncbs,
        sundayTrip: def_buggy_from_ncbs,
        lat: 13.092608,
        lng: 77.575890
    },
    {
        number: 5,
        from: 'mandara',
        to: 'ncbs',
        type: BUGGY,
        weekTrip: def_buggy_from_mandara,
        sundayTrip: def_buggy_from_mandara,
        lat: 13.070639,
        lng: 77.581128
    },
    {
        number: 6,
        from: 'ncbs',
        to: 'icts',
        type: SHUTTLE,
        weekTrip: def_ncbs_icts_week,
        sundayTrip: def_ncbs_icts_sunday,
        lat: 13.146325,
        lng: 77.513896
    },
    {
        number: 7,
        from: 'icts',
        to: 'ncbs',
        type: SHUTTLE,
        weekTrip: def_icts_ncbs_week,
        sundayTrip: def_icts_ncbs_sunday,
        lat: 13.070639,
        lng: 77.581128
    },
    {
        number: 8,
        from: 'ncbs',
        to: 'cbl',
        type: SHUTTLE,
        weekTrip: def_ncbs_cbl,
        sundayTrip: def_ncbs_cbl,
        lat: 13.070583,
        lng: 77.575421

    }
];