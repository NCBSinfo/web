/**
 * Created by Dexter on 17-09-16.
 */

app.service('commonFunctions', function ($state) {

    this.goTo = function (param) {
        $state.transitionTo($state.current, {param: param}, {
            reload: true,
            inherit: false,
            notify: true
        });
    };

});
