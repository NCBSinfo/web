/**
 * Created by Dexter on 17-09-16.
 */
var colors = ['#F44336', '#9C27B0', '#3F51B5', '#4CAF50', '#009688', '#795548'];

var sideNavList =
{
    dashboard: {
        name: 'Dashboard',
        icon: 'app/resources/img/icons/dashboard.svg',
        onOffline: false,
        onHome: false,
        onAuth: false,
        href: 'dashboard'
    },
    home: {
        name: 'Home',
        icon: 'app/resources/img/icons/home.svg',
        onOffline: true,
        onHome: false,
        onAuth: false,
        href: 'home'
    },
    transport: {
        name: 'Transport',
        icon: 'app/resources/img/icons/shuttle.svg',
        onOffline: true,
        onHome: true,
        onAuth: true,
        href: 'transport'
    },
    events: {
        name: 'Events',
        icon: 'app/resources/img/icons/events.svg',
        onOffline: false,
        onHome: true,
        onAuth: true,
        href: 'events'
    },
    contacts: {
        name: 'Contacts',
        icon: 'app/resources/img/icons/contact.svg',
        onOffline: true,
        onHome: true,
        onAuth: true,
        href: 'contacts'
    },
    locations: {
        name: 'Locations',
        icon: 'app/resources/img/icons/lecturehall.svg',
        onOffline: true,
        onHome: true,
        onAuth: false,
        href: 'locations'
    },
    settings: {
        name: 'Settings',
        icon: 'app/resources/img/icons/settings.svg',
        onOffline: true,
        onHome: true,
        onAuth: true,
        href: 'settings'
    }


};

var SHUTTLE = 'shuttle';
var BUGGY = 'buggy';

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