const apikey = "95957299018f58e66b1ef2a3a3be35d1";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const blockCover = document.getElementById("blockCover");
const blockCover2 = document.getElementById("blockCover2");
const smalltext = document.getElementById("smalltext");

const CorF = document.getElementById("CorF");
const header = document.getElementById("header");

const container = document.getElementById("cont");

const container2 = document.getElementById("cont2");
const windSp = document.getElementById("windSp");
const windDire = document.getElementById("windDir");
const windTitle = document.getElementById("windTitle");
const gustInfo = document.getElementById("gustInfo");

const container3 = document.getElementById("cont3");
const humidI = document.getElementById("humidityInfo");
const maxTemperature = document.getElementById("tempMax");
const minTemperature = document.getElementById("tempMin");
const statsTitle = document.getElementById("statsTitle");

const container5 = document.getElementById("cont5");

const forecastTitle = document.getElementById("forecastTitle");

const day1 = document.getElementById("day1");




let c=true;
let t="C";
let changeCF;

CorF.addEventListener("click", () => {
    if(CorF.innerText == "Fahrenheit"){
        CorF.innerText = "Celsius";
        c=false;
        t="F";
        getWeatherByLocation(search.value);
    }
    else {
        CorF.innerText = "Fahrenheit";
        c=true;
        t="C";
        getWeatherByLocation(search.value);
    }
});
let url2;



const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city){
    const resp = await fetch(url(city), {origin: "cors"});
    const respData = await resp.json();
    console.log(respData);
    addWeatherToPage(respData);
    changeCF = true;
}

async function getForecast(){
    const response = await fetch(url2);
    const responseData = await response.json();
    console.log(responseData);
    addForecastToPage(responseData);
}

function addForecastToPage(data){
    let date1 = data.list[8].dt_txt;
    date1 = date1.substring(5,10);

    let date2 = data.list[16].dt_txt;
    date2 = date2.substring(5,10);

    let date3 = data.list[24].dt_txt;
    date3 = date3.substring(5,10);

    let date4 = data.list[32].dt_txt;
    date4 = date4.substring(5,10);

    let date5 = data.list[39].dt_txt;
    date5 = date5.substring(5,10);

    
    day1.innerHTML = `<h4>${date1}</h4><h4>H: ${c?KtoC(data.list[0].main.temp_max):KtoF(data.list[8].main.temp_max)}°${t}</h4><h4>L: ${c?KtoC(data.list[8].main.temp_min):KtoF(data.list[8].main.temp_min)}°${t}</h4>`
    day2.innerHTML = `<h4>${date2}</h4><h4>H: ${c?KtoC(data.list[8].main.temp_max):KtoF(data.list[16].main.temp_max)}°${t}</h4><h4>L: ${c?KtoC(data.list[16].main.temp_min):KtoF(data.list[16].main.temp_min)}°${t}</h4>`
    day3.innerHTML = `<h4>${date3}</h4><h4>H: ${c?KtoC(data.list[16].main.temp_max):KtoF(data.list[24].main.temp_max)}°${t}</h4><h4>L: ${c?KtoC(data.list[24].main.temp_min):KtoF(data.list[24].main.temp_min)}°${t}</h4>`
    day4.innerHTML = `<h4>${date4}</h4><h4>H: ${c?KtoC(data.list[24].main.temp_max):KtoF(data.list[32].main.temp_max)}°${t}</h4><h4>L: ${c?KtoC(data.list[32].main.temp_min):KtoF(data.list[32].main.temp_min)}°${t}</h4>`
    day5.innerHTML = `<h4>${date5}</h4><h4>H: ${c?KtoC(data.list[32].main.temp_max):KtoF(data.list[39].main.temp_max)}°${t}</h4><h4>L: ${c?KtoC(data.list[39].main.temp_min):KtoF(data.list[39].main.temp_min)}°${t}</h4>`
   
}

function addWeatherToPage(data){
    let temp;
    let feelsLike;
    let countryCode = data.sys.country;
    let windSpeed = data.wind.speed;
    let iconUrl;
    let tempMax;
    let tempMin;
    let humidity = data.main.humidity;
    let backgroundCol;
    let windDirec = data.wind.deg;
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    let lonL="E";
    let latL="N";
    gustI = data.wind.gust;

    url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`;

    if(lat<0){
        latL = "S";
    }
    if(lon<0){
        lonL = "W";
    }
    search.innerText = "";
    console.log(lat+latL);
    console.log(lon+lonL);
    container2.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    container3.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    forecastTitle.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    windSpeed *= 1.151;
    windSpeed = (Math.floor(windSpeed * 100) / 100).toFixed(2);
    windTitle.innerText = "Wind";
    
    windSp.innerText = "Speed: "+windSpeed + "mph";
    windDire.innerText = "Direction: "+windDirec + "°";
    if(gustI != undefined){
    gustInfo.innerText ="Gust: "+ gustI + "mph";
    }

    statsTitle.innerText = "Stats";
    humidI.innerText = "Humidity: "+humidity + "%";

    countryCode = countryCode.toLowerCase();
    if(c == true){
        temp = KtoC(data.main.temp);
        feelsLike = KtoC(data.main.feels_like);
        tempMax = KtoC(data.main.temp_max);
        tempMin = KtoC(data.main.temp_min);
    }
    else{
        temp = KtoF(data.main.temp);
        feelsLike = KtoF(data.main.feels_like);
        tempMax = KtoF(data.main.temp_max);
        tempMin = KtoF(data.main.temp_min);
    }
    getForecast();
    maxTemperature.innerText = "High: "+tempMax + "°" + t;
    minTemperature.innerText = "Low: "+tempMin + "°" + t;

    if(changeCF==false)
    {
    showSmallText();
    }
    changeCF=true;
    day1.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    day2.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    day3.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    day4.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    day5.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';

    forecastTitle.style.color = 'white';
    forecastTitle.style.backgroundColor = 'rgba(0,0,0,0.5)';

    const weather = document.createElement("div");
    let skies = data.weather[0].main;
    if(skies == "Clear"){
        document.body.style.background = 'linear-gradient(to right, #2980B9, #6DD5FA, #FFFFFF)';
        backgroundCol = 'linear-gradient(to right, #2980B9, #6DD5FA, #FFFFFF)';
        iconUrl = "https://ssl.gstatic.com/onebox/weather/64/sunny.png";
    }
    else if(skies == "Clouds" || "Haze"){
        document.body.style.background =  '#linear-gradient(to right, #bdc3c7, #2c3e50)';
        backgroundCol = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
        iconUrl = "https://ssl.gstatic.com/onebox/weather/64/cloudy.png";
        if(data.weather[0].description = "few clouds"){
            skies = "Partly Cloudy";
            document.body.style.background = 'linear-gradient(to right, #00416A, #E4E5E6)'; 
            backgroundCol =  'linear-gradient(to-right, #00416A, #E4E5E6)'; 
            iconUrl = "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png";
        }
    }
    else if(skies == "Snow"){
        document.body.style.background =  'linear-gradient(to right, #ECE9E6, #ffffff)';
        backgroundCol = 'linear-gradient(to right, #ECE9E6, #ffffff)';
        iconUrl = "https://ssl.gstatic.com/onebox/weather/64/snow_light.png";
    }
    else if(skies == "Mist"){
        document.body.style.background = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
        backgroundCol = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
        iconUrl = "https://ssl.gstatic.com/onebox/weather/64/rain_light.png";
    }
    else if(skies == "Rain" ){
        document.body.style.background =  '#linear-gradient(to right, #bdc3c7, #2c3e50)';
        backgroundCol = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
        iconUrl = "https://ssl.gstatic.com/onebox/weather/64/rain_s_cloudy.png";
    }
    else{
        document.body.style.background = 'lightgreen';
    }   
    header.innerHTML = `<h1>${data.name}</h1>`;

    blockCover.style.backgroundColor = backgroundCol;
    blockCover2.style.backgroundColor = backgroundCol;

    weather.classList.add("weather");
    weather.innerHTML = `
        <h2><img src=${iconUrl} /> ${temp}°${t} </h2>
        <h3>${skies}</h3>
        <h3>Feels like: ${feelsLike}°${t}</h3>
    `;

    main.innerHTML = "";

    main.appendChild(weather);
}

function KtoC(K){
    return Math.round(K-273.15);
}

function KtoF(K){
    return Math.round((K-273.15) * (9/5) +32);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    container.style.top = '325px';
    container.style.height = '250px';
    container2.style.backgroundColor = 'rgba(0,0,0,0.5)';
    container3.style.backgroundColor = 'rgba(0,0,0,0.5)';
    const city = search.value;

    if(city){
        getWeatherByLocation(city);
    }
});

function moveCont3(){
    count++;
    if(count%2 != 0)
    {
    container3.style.top = '325px';
    container3.style.height = '250px';
    container3.style.color = 'white';
    }
    else{
        container3.style.top = '500px';
        container3.style.height = '75px';
        container3.style.color = 'transparent';
    }
    
}

function moveCont2(){
    count2++;
    if(count2%2 != 0)
    {
    container2.style.top = '325px';
    container2.style.height = '250px';
    container2.style.color = 'white';
    }
    else{
        container2.style.top = '500px';
        container2.style.height = '75px';
        container2.style.color = 'transparent';
    }
    
}
function openCont4(){
    count4++;

    if(count4%2!=0){
    forecastTitle.style.height = '350px';
    forecastTitle.style.width = '950px';
    forecastTitle.style.left = '250px';
    forecastTitle.style.top = '650px';
    forecastTitle.style.textAlign = 'center';
    
    day1.style.color = 'white';
    day2.style.color = 'white';
    day3.style.color = 'white';
    day4.style.color = 'white';
    day5.style.color = 'white';
    window.scrollTo(0,500);
    smalltext.style.color='transparent';
    smalltext.style.transition = '.5s';
    }
    else{
    showSmallText();
    day1.style.backgroundColor = 'transparent';
    day2.style.backgroundColor = 'transparent';
    day3.style.backgroundColor = 'transparent';
    day4.style.backgroundColor = 'transparent';
    day5.style.backgroundColor = 'transparent';
    
    }
    day1.style.zIndex = 9;
    
}

function showSmallText(){
    smalltext.style.color='white';
    smalltext.style.transition = '1s';
    forecastTitle.style.height = '75px';
    forecastTitle.style.width = '350px';
    forecastTitle.style.left = '550px';
    forecastTitle.style.top = '600px';
    day1.style.color = 'transparent';
    day2.style.color = 'transparent';
    day3.style.color = 'transparent';
    day4.style.color = 'transparent';
    day5.style.color = 'transparent';
}

let count4=0;
let count2=0;
let count=0;