/**
 * Created by Dexter on 19-09-16.
 */

app.directive('hoverElement', function () {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            element.on('mouseenter', function () {
                element.addClass('md-whiteframe-5dp');
            });
            element.on('mouseleave', function () {
                element.removeClass('md-whiteframe-5dp');
            });
        }
    }
});