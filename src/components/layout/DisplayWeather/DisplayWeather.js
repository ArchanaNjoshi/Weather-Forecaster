import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import GraphCard from "../GraphCard/GraphCard";

import "./DisplayWeather.css";

function DisplayWeather(props) {
  const { location } = props;
  console.log("Location from params", location);

  const [weatherData, setWeatherData] = useState();
  const [forecastData, setForecastData] = useState();

  // Base urls and api keys
  const ApiKey = "&appid=27ae7fea5ae96986fd8bd17edfc09937";
  const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  const ForecastBaseUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";

  // Calling fetch function for both weather and forecast
  useEffect(() => {
    if (location) {
      // console.log("Searching, Called fetch weather & forecast", location);
      fetchWeatherForecastData();
    }
  }, []);

  // Fetch function
  const fetchWeatherForecastData = async () => {
    try {
      // console.log("Searching for location weather", location);
      const weatherDetailsUrl = weatherBaseUrl + `${location}` + ApiKey;
      const response = await axios.get(weatherDetailsUrl);
      const { weather, main, name, rain, dt } = response.data;
      // console.log("Search Response- Weather Details", response);

      // Transforming the data to extract the necessary fields
      const date = new Date(dt * 1000);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const timeFormatted = `${hours}:${
        minutes < 10 ? "0" + minutes : minutes
      } ${hours >= 12 ? "P.M." : "A.M."}`;

      // Assinging data into one object and setting it into state to pass on to components
      const transformedWeatherData = {
        cityName: name,
        temperature: Math.round(main.temp - 273.15),
        time: timeFormatted,
        pressure: main.pressure,
        rainPercentage: rain ? rain["1h"] || rain["3h"] || 0 : 0,
        weatherIcon: weather[0].icon,
        weatherDesc: weather[0].description,
        humidity: main.humidity,
      };
      // Setting data into state variable to pass as props
      // console.log("Before setting transfremd fdtaa", transformedWeatherData);
      setWeatherData(transformedWeatherData);
      console.log("weather data", weatherData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }

    try {
      // console.log("Searching for location forecast", location);
      // Assemble forecast url and fetch
      const forecastDetailsUrl = ForecastBaseUrl + `${location}` + ApiKey;
      const response = await axios.get(forecastDetailsUrl);
      console.log("Search Response- Forecast Details", response);
      setForecastData(response);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <div className="display-weather-container">
      <div className="dw-sub-weather">
        {weatherData && <WeatherCard weatherData={weatherData} />}
      </div>
      <div className="dw-sub-forecast">
        {forecastData && (
          <GraphCard forecastData={forecastData} location={location} />
        )}
      </div>
    </div>
  );
}

export default DisplayWeather;
