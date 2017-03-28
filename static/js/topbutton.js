// Show To Top button on scroll
$(window).scroll(function () {
    if ($(this).scrollTop()) {
        $('#Top').fadeIn();
    } else {
        $('#Top').fadeOut();
    }
});