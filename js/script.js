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
});