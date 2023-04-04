
const weatherApiRootUrl = 'https://api.openweathermap.org';
const weatherApiKey = '0a10568fdd1afdff3817a49dfba38d44';

const nationalParksRootUrl = 'https://developer.nps.gov/api/v1/parks?'
const nationalParksApiKey = 'api_key=VCazcMgwXB8fNeltK7qXuenFJWVcO5tvdQsxjhCe'

const clickState = $('.clickState')
const nationalParksDisplay = $('#national-parks-display')


const nationalParks = {
    AL: ['TUSE', 'TUIN'],
    AK: ['DENA', 'GAAR', 'GLBA', 'KATM', 'KEFJ', 'KOVA', 'LAKE', 'WRST'],
    AZ: ['GRCA', 'PEFO', 'SAGU', 'WUPA'],
    AR: ['HOSP', 'PEVI'],
    CA: ['CABR', 'CHIS', 'DEVA', 'JOTR', 'KICA', 'KOFA', 'LAVO', 'PINN', 'POMO', 'REDW', 'SEKI', 'YELL', 'YOSE', 'JNEM'],
    CO: ['BLCA', 'CURE', 'FLFO', 'GRSA', 'ROMO'],
    CT: ['WEWA'],
    DE: ['FRST'],
    FL: ['BISC', 'DRTO', 'EVER', 'GATE', 'GRCA', 'BIBE', 'JOTR'],
    GA: ['CHAT', 'COWE', 'CURE', 'ERIN', 'GARI', 'KOVA'],
    HI: ['HALE', 'HAVA', 'PUHO', 'KALA'],
    ID: ['CRLA', 'YELL'],
    IL: ['MWSL'],
    IN: ['INDU'],
    IA: ['HERI'],
    KS: ['FOSC', 'TAPR'],
    KY: ['ABLI', 'MACA', 'CHPI'],
    LA: ['JAZZ'],
    ME: ['ACAD'],
    MD: ['ANTI', 'HAFE', 'HARP'],
    MA: ['BOHA'],
    MI: ['ISRO', 'KATM'],
    MN: ['VOYA'],
    MS: ['GUPE'],
    MO: ['WICR'],
    MT: ['BICA', 'GLAC', 'GRKO', 'LEWI', 'LICO'],
    NE: ['AGFO', 'HOCU', 'MORR', 'SCBL'],
    NV: ['GAAR', 'GOGA', 'GRBA', 'LAKE'],
    NH: ['SAMA'],
    NJ: ['EDIS', 'MORR'],
    NM: ['CARL', 'CAVA', 'CHCU', 'ELMA', 'PEFO', 'VAVA', 'WHSA'],
    NY: ['FODO', 'THRO'],
    NC: ['BLRI', 'CARI', 'GOGA', 'GRAH', 'GUPI', 'MOBR'],
    ND: ['THRO'],
    OH: ['CUVA'],
    OK: ['CHIC', 'WOTA'],
    OR: ['CRLA', 'CRMO', 'JOTR', 'LEWI', 'MORA', 'NOCA', 'OREG', 'REDW'],
    PA: ['GETT', 'INDE'],
    RI: ['BLAC'],
    SC: ['COWP', 'CONG'],
    SD: ['BADL', 'WICA'],
    TN: ['GRSM'],
    TX: ['BAVI', 'BIBE', 'ELMA', 'FOSM', 'GUIS', 'LAME', 'PAIS', 'PECO', 'WACO'],
    UT: ['ARCH', 'BRCA', 'CANY', 'CAVE', 'ZION', 'CARE'],
    VT: ['MACT'],
    VA: ['APCO', 'ASIS', 'COLM', 'GWMP', 'MANA', 'PETE', 'RICH', 'SHEN', 'WOTR'],
    WA: ['MORA', 'NOCA', 'OLYM'],
    WV: ['HAFE'],
    WI: ['APOA'],
    WY: ['GRTE', 'YELL', 'DEVN'],
}

function displayModal(data, name) {
    console.log(data)
    let forcastTitle = $('<h1>')
    forcastTitle.text("5-day forcast:" + name) 
    let forcastBody = $('<div>')
    forcastBody.addClass('flex')
    forcastBody.css('width', '100%')

    for (let i = 0; i < 40; i += 8) {
        console.log(data.list[i])
        //All the values that will go in the elements
        let date = dayjs(data.list[i].dt_txt).format('M/D/YYYY')
        let temp = data.list[i].main.temp
        let humidity = data.list[i].main.humidity
        let windSpeed = data.list[i].wind.speed
        let weatherIconURL = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`

        //create all elements
        let forcastCard = $('<div>')
        let cardDate = $('<h5>')
        let cardTemp = $('<p>')
        let cardHumidity = $('<p>')
        let cardWindSpeed = $('<p>')
        let cardWeatherIcon = $('<img>')

        //style all elements with classes from https://getbootstrap.com/docs/5.0/components/card/
        //give all the element there content
        forcastCard.addClass('card text-white bg-gray-500 m-3 p-2')
        forcastCard.css('width', '18rem');
        cardDate.addClass('text-lg font-bold mb-2')
        cardDate.text(date)
        cardTemp.addClass('text-base text-gray-700 leading-normal')
        cardTemp.text("Temperature: " + temp + "°F")
        cardHumidity.addClass('text-base text-gray-700 leading-normal')
        cardHumidity.text("Humidity: " + humidity + "%")
        cardWindSpeed.addClass('text-base text-gray-700 leading-normal')
        cardWindSpeed.text("Wind Speed: " + windSpeed + " MPH")
        cardWeatherIcon.attr('src', weatherIconURL)
        cardWeatherIcon.css('width', '40%')

        //append all into one card
        forcastCard.append(cardDate, cardWeatherIcon, cardTemp, cardWindSpeed, cardHumidity)

        //append to the the forcastBody
        forcastBody.append(forcastCard)
    }
    //append all to the html doc
    nationalParksDisplay.append(forcastTitle, forcastBody)
}



function getWeather(data, name) {
    let lat = data.data[0].latitude
    let lon = data.data[0].longitude
    let requestURL = `${weatherApiRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`
    fetch(requestURL)
        .then(function (data) {
            return data.json();
        })
        .then(function (data) {
            displayModal(data, name)
        })
}


function createParkCard(parksArr) {
    console.log(nationalParksDisplay[0].children)
    nationalParksDisplay[0].innerHTML = ""
    for (let i = 0; i < parksArr.length; i++) {
        let requestURL = nationalParksRootUrl + 'parkCode=' + parksArr[i] + '&' + nationalParksApiKey
        fetch(requestURL)
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {

                //card
                let card = $('<div>')
                card.addClass('bg-white border-2 border-solid border-black shadow-md rounded-lg p-6 m-3 max-w-sm mx-auto')

                //title


                let name = $('<h2>')
                name.addClass('text-xl font-bold mb-4 text-center underline')
                name.text(data.data[0].name)


                //description
                let description = $('<p>')
                description.addClass('text-gray-700 text-center')
                description.text(data.data[0].description)

                //link
                let link = $('<a>')
                link.addClass('text-blue-500 hover:underline')
                link.text('Read more')
                link.attr('href', data.data[0].url)


                //button
                let button = $('<button>')
                button.addClass('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4')
                button.text('Open modal')
                button.on('click', function () {
                    getWeather(data, data.data[0].name)

                })

                card.append(name, description, link, button)
                nationalParksDisplay.append(card)
            })
    }
}

for (let i = 0; i < clickState.length; i++) {
    $(clickState[i]).click(function () {
        createParkCard(nationalParks[clickState[i].id])
        //createParkCard(nationalParks.)
    })
}


















var todaysDate = dayjs();
$('#today').text(todaysDate.format('dddd MMMM D, YYYY'));

timeInterval = setInterval(function () {
    var todaysTime = dayjs();
    $('#time').text(todaysTime.format('hh : mm ss a'));
}, 1000);
