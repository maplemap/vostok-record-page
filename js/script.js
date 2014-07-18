/**
 * Created by MapleMap on 27.05.14.
 */
$(document).ready( function (){
/*************************** Created-CurrentYearInFooter **********************************/
    var createdYear = 2014;
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    if (createdYear == currentYear) $('.copyright span').html(createdYear);
    else
        $('.copyright span').html(+createdYear + ' - ' + currentYear);
/************************ Hide-Show Menu after width: 56.25em ****************************/
    $(".more").click(function () {
        var width_brows_px = $("html").width();
        var font_size = parseInt($('html').css('font-size'));
        var width_brows_em = width_brows_px/font_size;
        if (width_brows_em <= 56.25) {
            $(".header .nav").slideToggle(function(){
                $('.more').toggleClass('up');
            });
        }
    });
});