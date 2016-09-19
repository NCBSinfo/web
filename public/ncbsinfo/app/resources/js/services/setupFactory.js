/**
 * Created by Dexter on 17-09-16.
 */

app.service('setupService', function ($state, appConstants, $mdMedia, commonFunctions) {
    var mode;
    var userInfo = {
        name: appConstants.name,
        email: 'beta web'
    };


    this.setup = function () {
        if (localStorage.getItem('mode') !== null) {
            mode = localStorage.getItem('mode');
            if (mode == 'auth') {
                userInfo.email = localStorage.getItem('email')
            }
        }
        else {
            mode = 'undefined';
        }

        var param = $state.params.param;

        if (param.length != 0) {
            switch (mode) {
                case 'undefined':
                    if (param != 'login') {
                        commonFunctions.goTo('');
                    }
                    break;
                case 'guest':
                    if (param == 'events' || param == 'dashboard') {
                        commonFunctions.goTo('home');
                    }
                    break;
                case 'auth':
                    if (param == 'login') {
                        commonFunctions.goTo('home');
                    }
                    break;
            }
        } else {
            if (mode != 'undefined') {
                commonFunctions.goTo('home');
            }
        }

    };

    this.getState = function () {
        return $state.params.param;
    };

    this.getMode = function () {
        if (localStorage.getItem('mode') !== null) {
            mode = localStorage.getItem('mode');
        }
        else {
            mode = 'undefined';
        }
        return mode;
    };


    this.isNavOpen = function () {
        if ($mdMedia('gt-sm') ) {
            var param = $state.params.param;
            if (param == '') {
                return false;
            } else return param != 'login';
        }
        else {
            return false;
        }
    };

    this.getInfo = function () {
        return userInfo;
    };

    this.setInfo = function (info) {
        userInfo.name = info.name;
        userInfo.email = info.email;
    }

})
;

