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
    {name: 'Settings', icon: "app/resources/img/icons/settings.svg", inOffline: true, onHome: true}
];

var routes = [
    {
        number: 0,
        from: 'ncbs',
        to: 'iisc',
        type: SHUTTLE,
        weekTrip: def_ncbs_iisc_week,
        sundayTrip: def_ncbs_iisc_sunday
    },
    {
        number: 1,
        from: 'iisc',
        to: 'ncbs',
        type: SHUTTLE,
        weekTrip: def_iisc_ncbs_week,
        sundayTrip: def_iisc_ncbs_sunday
    },
    {
        number: 2,
        from: 'ncbs',
        to: 'mandara',
        type: SHUTTLE,
        weekTrip: def_ncbs_mandara_week,
        sundayTrip: def_ncbs_mandara_sunday
    },
    {
        number: 3,
        from: 'mandara',
        to: 'ncbs',
        type: SHUTTLE,
        weekTrip: def_mandara_ncbs_week,
        sundayTrip: def_mandara_ncbs_sunday
    },
    {
        number: 4,
        from: 'ncbs',
        to: 'mandara',
        type: BUGGY,
        weekTrip: def_buggy_from_ncbs,
        sundayTrip: def_buggy_from_ncbs
    },
    {
        number: 5,
        from: 'mandara',
        to: 'ncbs',
        type: BUGGY,
        weekTrip: def_buggy_from_mandara,
        sundayTrip: def_buggy_from_mandara
    },
    {
        number: 6,
        from: 'ncbs',
        to: 'icts',
        type: SHUTTLE,
        weekTrip: def_ncbs_icts_week,
        sundayTrip: def_ncbs_icts_sunday
    },
    {
        number: 7,
        from: 'icts',
        to: 'ncbs',
        type: SHUTTLE,
        weekTrip: def_icts_ncbs_week,
        sundayTrip: def_icts_ncbs_sunday
    },
    {
        number: 8,
        from: 'ncbs',
        to: 'cbl',
        type: SHUTTLE,
        weekTrip: def_ncbs_cbl,
        sundayTrip: def_ncbs_cbl
    }
];