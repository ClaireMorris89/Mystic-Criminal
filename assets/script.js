
const weatherApiRootUrl = 'https://api.openweathermap.org';























var todaysDate = dayjs();
$('#today').text(todaysDate.format('dddd MMMM D, YYYY'));

timeInterval=setInterval(function(){
    var todaysTime = dayjs();
    $('#time').text(todaysTime.format('hh : mm ss a'));
}, 1000);
