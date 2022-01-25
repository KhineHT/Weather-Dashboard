var formSearch = $('#form-search');
var inputCity = $('#input-city');
var spanCurrentTemp = $('#span-current-temp');
var spanCurrentWind = $('#span-current-wind');
var spanCurrentUv = $('#span-current-uv');
var spanCurrentHumidity = $('#span-current-humidity');
var weatherCards = $("#weather-cards");
var searchButton = $("#search-button");
var sCity = [];

function find(c){
    for (var i=0; i<sCity.length; i++){
        if(c.toUpperCase()===sCity[i]){
            return -1;
        }
    }
    return 1;
}

//const apiKey = "4e5dbe7db2b5e9c8b47fa40b691443d5";
//const city = "https://countriesnow.space/api/v0.1/countries";

var apiKey="a0aca8a89948154a4182dcecc780b513";

function displayWeather(event){
    event.preventDefault();
    if(inputCity.val().trim()!==""){
        sCity=inputCity.val().trim();
        currentWeather(sCity);
    }
}


function currentWeather(city) {
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {

        console.log(response);
    });
}

function kelvinToCelcius(kelvin) {
    return kelvin - 273.15;
}

formSearch.addEventListener('submit', () => {
        event.preventDefault();
        const city = inputCity.Value;
        currentWeather(city)
            .then((data) => {
                console.log('data is', data);
                spanCurrentWind.textContent = data.wind.speed;
                spanCurrentTemp.textContent = kelvinToCelcius(data.main.temp).toFixed(2);

                return oneCall(data.coord.lon, data.coord.lat);

            }).then(function (oneCallData) {
                const uv = oneCallData.current.uvi;
                spanCurrentUv.textContent = uv;
                if (uv < 4) {
                    spanCurrentUv.setAttribute("class", "green");
                }
                if (uv >= 4 && uv <= 8) {
                    spanCurrentUv.setAttribute("class", "yello");
                }
                if (uv > 9) {
                    spanCurrentUv.setAttribute("class", "red");
                }

                const next5Days = oneCallData.daily.slice(0, 5);

                for (let index = 0; index < next5Days, length; index++) {
                    const forecast = next5Days[index];

                    const col = createWeatherCol(forecast.dt, '', forecast.temp.day);
                    weatherCards.appendChild(col);
                }

            });

    })

        function createCard(date, icon, temp, humidity, wind) {
            const col = document.createElement('div')
            col.setAttribute('class', 'col-2');

            const card = document.createElement('div')
            card.setAttribute('class', 'card');
            col.appendChild(card);

            const cardBody = document.createElement('div');
            cardBody.setAttribute("class", "card-body");
            card.appendChild(cardBody);

            const dateHeading = document.createElement("h4");
            dateHeading.setAttribute("class", "card-title");
            cardBody.appendChild(dateHeading);

            dateHeading.textContent = date;

            const iconEl = document.createElement("img");
            iconEl.setAttribute("src", icon);
            cardBody.appendChild(iconEl);

            const p = document.createElement('p');
            const ul = document.createElement('ul');

            const templi = document.createElement('li');
            templi.textContent = temp;

            // To add more
        }
            ul.appendChild(templi);

            p.appendChild(ul);

            // return (col);