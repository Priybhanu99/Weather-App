let appId = '926e1afab70353c0e777c358224e8289';
let units = 'imperial';

let searchMethod;

function getSearchMethod(searchTerm){
    if(Number.parseInt(searchTerm)+'' == searchTerm){
        searchMethod = 'zip';
    }else{
        searchMethod = 'q';
    }
}

function searchWeather(searchItem){

    getSearchMethod(searchItem)
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchItem}&APPID=${appId}&units=${units}`).then(result => {
        //return the http response to the json file
        return result.json();
    }).then(result  => {
        init(result);
    })

}

function init(resultFromServer){
    console.log(resultFromServer);

    //background image
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")' ;    
            break;

        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")' ; 
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
        case 'Haze':
            document.body.style.backgroundImage = 'url("rain.jpg")' ; 
            break; 

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("storm.jpg")' ; 
            break;

        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")' ; 
            break;
        
        default:
            break;

    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = `http://openweathermap.org/img/w/` + resultFromServer.weather[0].icon + '.png'; 

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    temperatureElement.innerHTML = resultFromServer.main.temp;
    windSpeedElement.innerHTML = resultFromServer.wind.speed;

    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

    setPositionforWeatherInfo();
}

function setPositionforWeatherInfo(){
    let weatherContainer = document.getElementById('weatherContainer')
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.25}px)`;

    weatherContainer.style.visibility = 'visible';
}

//to attach onclickLoistener to search button
document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;

    if(searchTerm){
        searchWeather(searchTerm)
    }
})