const APIkey ="c958541f838da433456415b7cbdd06f0"
function fetchWeather() {
  let cityName = document.querySelector(".city-name").value;
  // Fetch the city name from the input field
  let cityNameElement = document.querySelector(".city-name-info");
  // Fetch the weather data from OpenWeatherMap
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      cityName
    )}&APPID=${APIkey}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Create a new HTML element to display the weather data
      cityNameElement.textContent = cityName;

      let iconElement = document.querySelector(".weather-icon");
      // load the weather icon only when a city is found
      iconElement.onload = function () {
        this.classList.add("loaded");
      };
      iconElement.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

      let weatherElement = document.querySelector(".weather-info");
      weatherElement.textContent = data.weather[0].description;

      let weatherInfoMain = document.querySelector(".weather-info-main");
      weatherInfoMain.innerHTML = `Temperature: ${Math.round(
        data.main.temp
      )}°C <br>
        Humidity: ${data.main.humidity}% <br>
        Wind Speed: ${data.wind.speed} m/s`;

      let weatherInfoSec = document.querySelector(".weather-info-sec");
      weatherInfoSec.innerHTML =
        "feels like: " +
        Math.round(data.main.feels_like) +
        "°C <br>" +
        "min temp: " +
        Math.round(data.main.temp_min) +
        "°C <br>" +
        "max temp: " +
        Math.round(data.main.temp_max) +
        "°C";

      let weatherElementInfoExtra = document.querySelector(
        ".weather-info-extra"
      );
      weatherElementInfoExtra.innerHTML =
        "Visibility: " +
        data.visibility / 1000 +
        "km <br>" +
        "Clouds: " +
        data.clouds.all +
        "% <br>" +
        "Pressure: " +
        data.main.pressure +
        " hPa";

      let weatherInfoDayLight = document.querySelector(
        ".weather-info-daylight"
      );
      weatherInfoDayLight.innerHTML =
        "sunrise: " +
        new Date(data.sys.sunrise * 1000).toLocaleTimeString() +
        "<br> sunset: " +
        new Date(data.sys.sunset * 1000).toLocaleTimeString();
    })
    .catch((error) => {
      // Handle the error
      console.error("Error:", error);
      cityNameElement.textContent = "City not found";
      // Clear the weather data
      let weatherIcon = document.querySelector(".weather-icon");
      weatherIcon.src = "";
      weatherIcon.style.display = "none"; // Hide the img element

      document.querySelector(".weather-info").textContent = "";
      document.querySelector(".weather-info-main").innerHTML = "";
      document.querySelector(".weather-info-sec").innerHTML = "";
      document.querySelector(".weather-info-extra").innerHTML = "";
      document.querySelector(".weather-info-daylight").innerHTML = "";
    });

  // Clear the input field
  document.querySelector(".city-name").value = "";
}

document
  .querySelector(".weather-form")
  .addEventListener("submit", function (event) {
    // Prevent the form from being submitted normally
    event.preventDefault();

    // Call the fetchWeather function
    fetchWeather();
    const container = document.querySelector(".container");
    container.classList.add("info-loaded");
  });




// For a non-technical audience:

// The code starts by defining an API key, which is like a password that allows the application to access weather data from a service called OpenWeatherMap.
// The fetchWeather function is the heart of this application. It does the following:

// It gets the city name that the user has entered.
// It sends a request to OpenWeatherMap, asking for the weather data of the entered city.
// If the city is found, it processes the received data and displays it on the webpage. The displayed information includes the city name, a weather icon, a description of the weather, temperature, humidity, wind speed, visibility, cloudiness, pressure, and sunrise and sunset times.
// If the city is not found, it displays an error message and clears any previous weather data from the webpage.
// After the fetchWeather function, the code sets up an event listener on the form where the user enters the city name. This means that when the user submits the form (by pressing Enter or clicking a button), the fetchWeather function is called to fetch and display the weather data for the entered city. The form submission is also prevented from refreshing the page, which is its default behavior.

// Finally, the code adds a class to the container element to change its style once the weather information is loaded. This could be used, for example, to show or hide certain elements based on whether the weather data is available.