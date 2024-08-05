let city_name = document.getElementById("city"),
degree = document.getElementById("degree"),
today = document.getElementById("today"),
description = document.getElementById("w-description"),
min_temp = document.getElementById("min-temp"),
max_temp = document.getElementById("max-temp"),
wind_speed = document.getElementById("wind-speed"),
Latitude = document.getElementById("Latitude"),
longitude = document.getElementById("longitude"),
humidity = document.getElementById("humidity"),
Visibility = document.getElementById("Visibility"),
pressure = document.getElementById("pressure"),
image = document.getElementById("image"), 
weather_pressure = document.getElementById("weather-pressure"),
weather_Visibility = document.getElementById("weather-Visibility"),
weather_Humidity = document.getElementById("weather-Humidity"),
sunrise = document.getElementById("sunrise"),
sunset = document.getElementById("sunset"),
city = document.getElementById("city-name"),
previousDays = document.getElementById("previousDays"),
weather_windSpeed = document.getElementById("weather-windSpeed");

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var date = new Date();
let day = date.getDay();
let hours = date.getHours(), minutes = date.getMinutes();

hours = hours>9 ? hours : "0"+hours;
minutes = minutes>9 ? minutes : "0"+minutes;
let am = hours>12 ? "PM" : "AM";
today.innerText = daysOfWeek[day] +", "+hours+":"+minutes+" " +am;

const defaultFunction = () =>{
    // Check if geolocation is supported by the browser
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    //console.log("Geolocation is not supported by this browser.");
    alert(`Geolocation is not supported by this browser.`)
  }
  
  // Success callback function
  function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
   // console.log("Latitude:", latitude);
    //console.log("Longitude:", longitude);
    currentData(latitude,longitude);
  }
  
  // Error callback function
  function errorCallback(error) {
   // console.log("Error retrieving location:", error.message);
    alert(`Error retrieving location:,${error.message}`)
  }

}
  
async function currentData(lat,lon){
    const api_key = "d4878200228fb79d04c4434952a14196";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`; 
    const url1 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}` 

    const datas = await fetch(`${url}`).then(response => response.json());
    const datas1 = await fetch(`${url1}`) .then(res => res.json());
    console.log(datas1);
    console.log(datas);
    previousDays.innerHTML = " ";
    data(datas,datas1);
}

async function fetchdata(){
    const api_key = "d4878200228fb79d04c4434952a14196";
    const city = city_name.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;  
    const url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${api_key}` 

    const datas = await fetch(`${url}`).then(response => response.json());
    const datas1 = await fetch(`${url1}`) .then(res => res.json());
   // console.log(datas1);
    previousDays.innerHTML = " ";
   // console.log(datas);
    data(datas,datas1);
}



async function data(weather_data,prevData){
    if(weather_data.cod == 404)
    {
        window.alert(`${city_name.value} is not a Valid Location`);
    }

    const sunriseTimestamp = weather_data.sys.sunrise;
    const sunsetTimestamp = weather_data.sys.sunset;

    // Create Date objects using the timestamps
   const sunriseDate = new Date(sunriseTimestamp * 1000);
   const sunsetDate = new Date(sunsetTimestamp * 1000);

    // Convert Date objects to normal time strings
    const sunriseTime = sunriseDate.toLocaleTimeString();
    const sunsetTime = sunsetDate.toLocaleTimeString();

    sunrise.innerText = sunriseTime;
    sunset.innerText = sunsetTime;

    if(weather_data.main.pressure > 1013){
        weather_pressure.innerText = "High";
    }
    else if(weather_data.main.pressure = 1013){
        weather_pressure.innerText = "Average";
    }
    else{
        weather_pressure.innerText = "Low Preesure";
    }


    if(weather_data.main.humidity > 60)
    {
        weather_Humidity.innerText = "High";
    }
    else if(weather_data.main.humidity < 30)
    {
        weather_Humidity.innerText = "Low";
    }
    else{
        weather_Humidity.innerText = "Normal";
    }

    if(weather_data.visibility > 10000)
    {
        weather_Visibility.innerText = "Excellent Visibility";
    }
    else if(weather_data.visibility > 5000 && weather_data.visibility <= 10000)
    {
        weather_Visibility.innerText = "Good Visibility";
    }
    else if(weather_data.visibility > 1000 && weather_data.visibility <= 50000)
    {
        weather_Visibility.innerText = "Moderate Visibility";
    }
    else{
        weather_Visibility.innerText = "Poor Visibility";
    }

    if(weather_data.wind.speed >= 13.9)
    {
        weather_windSpeed.innerText = "Strong Breeze";
    }
    else if(weather_data.wind.speed < 13.9 && weather_data.wind.speed >= 8.1)
    {
        weather_windSpeed.innerText = "Moderate Breeze";
    }
    else if(weather_data.wind.speed < 8.0 && weather_data.wind.speed >= 3.4)
    {
        weather_windSpeed.innerText = "Gentle Breeze";
    }
    else{
        weather_windSpeed.innerText = "Light Breeze";
    }
    degree.innerHTML = `<p>${weather_data.main.temp}<sup>o</sup>C</p>`;
    description.innerText = weather_data.weather[0].description;
    min_temp.innerText = weather_data.main.temp_min;
    max_temp.innerText = weather_data.main.temp_max;
    city.innerText = weather_data.name;
    wind_speed.innerText = weather_data.wind.speed;
    Latitude.innerText = weather_data.coord.lat;
    longitude.innerText = weather_data.coord.lon;
    humidity.innerText = weather_data.main.humidity;
    pressure.innerText = weather_data.main.pressure;
    Visibility.innerText = weather_data.visibility;   

    if(weather_data.weather[0].description === 'overcast clouds' || weather_data.weather[0].description === 'scattered Clouds'|| weather_data.weather[0].description === 'Few Clouds' )
    {
        image.src = "images/cloud.svg";
    }
    else if(weather_data.weather[0].description === 'clear sky'){
        image.src = "images/clear.svg";
    }
    else if(weather_data.weather[0].description === 'light rain' || weather_data.weather[0].description === 'moderate rain' || weather_data.weather[0].description === 'heavy rain' || weather_data.weather[0].description === 'thunderstorm' ){
        image.src = "images/rain.svg";
    }
    else if(weather_data.weather[0].description === 'snow' || weather_data.weather[0].description === 'showers'){
        image.src = "images/snow.svg";
    }
    else if(weather_data.weather[0].description === 'thunderstorm' ){
        image.src = "images/storm.svg";
    }

   let html = ``;

   // console.log(prevData.list);
    for(let i = 0; i<15 ; i++){
        let imageSrc;
        //console.log(prevData.list[i].main.temp); 
        //console.log(prevData.list[i].weather[0].description);   
        //console.log(prevData.list[i].dt_txt);

        if(prevData.list[i].weather[0].description === 'overcast clouds' || prevData.list[i].weather[0].description === 'scattered clouds'|| prevData.list[i].weather[0].description === 'few clouds' ||prevData.list[i].weather[0].description === 'broken clouds')
        {
            imageSrc = "images/cloud.svg";
        }
        else if(prevData.list[i].weather[0].description === 'clear sky'){
            imageSrc = "images/clear.svg";
        }
        else if(prevData.list[i].weather[0].description === 'light rain' || prevData.list[i].weather[0].description === 'moderate rain' || prevData.list[i].weather[0].description === 'heavy rain'  ){
            imageSrc = "images/rain.svg";
        }
        else if(prevData.list[i].weather[0].description === 'snow' || prevData.list[i].weather[0].description === 'showers'){
            imageSrc = "images/snow.svg";
        }
        else if(prevData.list[i].weather[0].description === 'thunderstorm' ){
            imageSrc = "images/storm.svg";
        }    

       html = `<div class="containerDays">
       <div class="date">${prevData.list[i].dt_txt}</div>
       <div class="image"><img src="${imageSrc}" alt="image"></div>
       <div class="descriptions" style="color: rgba(0, 0, 0, 0.682); padding: 2px;">${prevData.list[i].weather[0].description}</div>
       <div class="temperature">Temp: <span>${prevData.list[i].main.temp}</span><sup>o</sup>C</div>
       </div>`;

       previousDays.innerHTML += html;
    }
}

defaultFunction();