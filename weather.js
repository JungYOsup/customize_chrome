const weather = document.querySelector(".js-header-right");

const APIKEY = "a486795e0bd05dd91bda02235a161809";

const getWeatherApi = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`
  )
    .then(function(response) {
      console.log(response);
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      const temperature = Math.ceil(json.main.temp);
      const city = json.name;
      paintingWeather(temperature, city);
    });
};

const paintingWeather = (temperature, city) => {
  const weatherImg = document.createElement("img");
  const weatherDiv = document.createElement("div");
  const weathertemp = document.createElement("span");
  const weatherCity = document.createElement("span");

  let emoticon = "";
  if (temperature > 10 && temperature < 20) {
    console.log("구름사진");
    emoticon = "cloud";
  } else if (temperature > 20) {
    console.log("햇님사진");
    emoticon = "sun";
  } else {
    console.log("눈사람사진");
    emoticon = "snow";
  }
  weatherImg.src = `img/${emoticon}.png`;
  weatherImg.className = "emoticonImg";
  weathertemp.innerText = `${temperature}도`;
  weatherCity.innerText = city;

  weather.appendChild(weatherDiv);
  weatherDiv.appendChild(weatherImg);
  weatherDiv.appendChild(weathertemp);
  weather.appendChild(weatherCity);
};

const getGeo = () => {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
};

const handleGeoSucces = position => {
  console.log(position);

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  console.log(latitude, longitude);
  getWeatherApi(latitude, longitude);
};

const handleGeoError = () => {
  console.log("Cant access geo location");
};

function init() {
  getGeo();
}

init();
