/**
 * All common elements
 */

//TODO: path
var rootPath = "/";

var siteFooter = $('#site-footer');
siteFooter.removeClass();
siteFooter.addClass("page-footer teal darken-2 hide-on-med-and-down");


$(document).ready(function () {
    siteFooter.load(rootPath + '/ncbsinfo/elements/footer.html', function () {

    });

});


//Google Analytics
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-82633551-1', 'auto');
ga('send', 'pageview');