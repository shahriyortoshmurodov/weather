const apiKey = "9bb54cb67049cd317ce9ff8e730ab66a";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const temperatureElem = document.getElementById("temperature");
const locationElem = document.getElementById("location");
const detailsElem = document.getElementById("details");
const weatherIcon = document.getElementById("weather-icon");
const dateElem = document.getElementById("date");

const updateDate = () => {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  dateElem.textContent = today.toLocaleDateString("en-US", options);
};

const getWeather = async (city) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    updateUI(data);
  } catch (error) {
    alert(error.message);
  }
};

const updateUI = (data) => {
  const { name } = data;
  const { temp, temp_max, temp_min } = data.main;
  const { icon, main } = data.weather[0]; 

  locationElem.textContent = name;
  temperatureElem.textContent = `${Math.round(temp)}°`;
  detailsElem.textContent = `Max: ${Math.round(temp_max)}° Min: ${Math.round(temp_min)}°`;

 
  const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`; 
  weatherIcon.src = weatherIconUrl; 
};

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
    cityInput.value = "";
  } else {
    alert("Please enter a city name!");
  }
});

updateDate();



const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
weatherIcon.src = weatherIconUrl;



if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }
  