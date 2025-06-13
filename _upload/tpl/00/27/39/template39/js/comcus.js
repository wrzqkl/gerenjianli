$(function() {
    /*导航*/
    $.fn.sudyNav = function() {};
    $(".wp-menu li").hover(function() {
        $(this).siblings().find('.sub-menu').stop(true, true).slideUp(150)
        $(this).children('.sub-menu').stop(true, true).slideDown(200);
        $(this).addClass('hover');
    }, function() {
        $(this).children('.sub-menu').stop(true, true).slideUp(150);
        $(this).removeClass('hover');
    });

    $(".wp-menu li").each(function() {
        $(this).children(".menu-switch-arrow").appendTo($(this).children(".menu-link"));
    });

    var prec = $(window).width() / 1920;
    if ($(window).width() > 1920) {
        $(".inner").css("zoom", prec)
    }
    if ($(window).width() < 1920) {
        $(".inner").css("zoom", prec)
    }



});