$(function () {
    $(window).scroll(function () {
        var top = $(window).scrollTop();

        if (top > 0) {
            $('#header').addClass('inverted');
        } else {
            $('#header').removeClass('inverted');
        }
    });
    $(window).trigger('scroll');
});