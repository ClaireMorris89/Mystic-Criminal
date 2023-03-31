
// const weatherApiRootUrl = 'https://api.openweathermap.org';
// const weatherApiKey = '0a10568fdd1afdff3817a49dfba38d44';
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



function createParkCard(parksArr) {
    for (let i = 0; i < parksArr.length; i++) {
        let requestURL = nationalParksRootUrl + 'parkCode=' + parksArr[i] + '&' + nationalParksApiKey
        fetch(requestURL)
            .then(function (data) {
                return data.json();
            })
            .then(function (data) {
                let nationalParkName = $('<h2>')
                let nationalParkDescription = $('<p>')
                nationalParkName.text(data.data[0].name)
                nationalParkDescription.text(data.data[0].description)
                nationalParksDisplay.append(nationalParkName)
                nationalParksDisplay.append(nationalParkDescription)
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
})
