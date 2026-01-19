var $headline = $(".headline"),
    $inner = $(".inner"),
    $nav = $("nav"),
    navHeight = 75;

$(window).scroll(function () {
    var scrollTop = $(this).scrollTop(),
        headlineHeight = $headline.outerHeight() - navHeight,
        navOffset = $nav.offset().top;

    $headline.css({
        opacity: 1 - scrollTop / headlineHeight,
    });

    $inner.children().css({
        transform: "translateY(" + scrollTop * 0.4 + "px)",
    });

    if (navOffset > headlineHeight) {
        $nav.addClass("scrolled");
    } else {
        $nav.removeClass("scrolled");
    }
});