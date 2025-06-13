$(function() {
    /*主大图切换*/
    $(".mbanner .focus").sudyfocus({
        p: 2,
        zWidth: 1920,
        zHeight: 890,
        title: {
            isAutoWidth: true,
            active: false
        },
        text: {
            active: false,
            isAutoHeight: false,
            href: false
        },
        response: true,
        speed: 700,
        pagination: true,
        navigation: false,
        isNavHover: true,
        href: true,
        effect: 'fade'
    });
    /*新闻图片切换*/
    $(".post-11 .focus").sudyfocus({
        p: 11,
        zWidth: 493,
        zHeight: 359,
        title: {
            isAutoWidth: false,
            active: true
        },
        text: {
            active: false,
            isAutoHeight: false,
            href: false
        },
        response: true,
        speed: 700,
        pagination: false,
        navigation: true,
        isNavHover: true,
        href: true,
        effect: 'fade'
    });

});