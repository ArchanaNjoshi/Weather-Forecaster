import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

import NoLocationCard from "../../components/layout/NoLocationCard/NoLocationCard";
import SearchWeather from "../../components/layout/SearchWeather/SearchWeather";
import "./Dashboard.css";

// Redux imports
import { useSelector } from "react-redux";
import CarousalWeatherCard from "../../components/layout/CarousalWeather/CarousalWeather";

function Dashboard() {
  const [location, setLocation] = useState("");
  const [fetchWeather, setFetchWeather] = useState(false);
  const [fetchForecast] = useState(false);
  const [weatherData, setWeatherData] = useState();

  const ApiKey = "&appid=27ae7fea5ae96986fd8bd17edfc09937";
  const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  const ForecastBaseUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";

  // Redux location list
  const locations = useSelector((state) => state.location.locations);

  const handleLocSearch = (event) => {
    event.preventDefault();
    setFetchWeather(true);
  };

  useEffect(() => {
    if (location) {
      console.log("Searching for location weather", location);
      fetchWeatherData();
    }
  }, [fetchWeather]);

  useEffect(() => {
    if (location) {
      console.log("Searching for location forecast", location);
      fetchForecastData();
    }
  }, [fetchForecast]);

  const fetchWeatherData = async () => {
    try {
      const weatherDetailsUrl = weatherBaseUrl + `${location}` + ApiKey;
      const response = await axios.get(weatherDetailsUrl);
      const { weather, main, name, rain, dt } = response.data;
      console.log("Search Response- Weather Details", response);

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
      console.log("Before setting transfremd fdtaa", transformedWeatherData);
      setWeatherData(transformedWeatherData);
      console.log("weather data", weatherData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const fetchForecastData = async () => {
    try {
      const forecastDetailsUrl = ForecastBaseUrl + `${location}` + ApiKey;
      const response = await axios.get(forecastDetailsUrl);
      console.log("Search Response- Forecast Details", response);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  return (
    <>
      {/* 1. Search for weather details by typing location */}
      <div className="search-container">
        <form onSubmit={handleLocSearch} className="search-loc-form">
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            name="location"
            type="text"
            className="search-loc-input"
          ></input>
          <Button
            type="submit"
            className="search-loc-btn"
            style={{
              color: "#242731",
              opacity: "0.5",
              minWidth: "2em",
              width: "4em",
              padding: "0",
              marginLeft: "2%",
              marginRight: "1%",
              height: "2.5em",
            }}
          >
            <SearchIcon
              className="searchicon"
              onClick={handleLocSearch}
              style={{ color: "#484848" }}
            />
          </Button>
        </form>
      </div>

      {/* {!fetchWeather || !weatherData && isListEmpty && <NoLocationCard />} */}
      {/* Search weather card displays on searching for location */}
      {/* OnClick it takes to Details Weather card which as options to add/remove to list */}
      {weatherData && (
        <Link
          className="dashboard-redirect"
          to={`/weather-details/${location}`}
        >
          <SearchWeather weatherData={weatherData} />
        </Link>
      )}
      {/* When there are no locations to be displayed */}
      {/* Checks len of location and if not empty, displays carousal
  if empty, shows empty card */}
      {locations.length ? (
        <CarousalWeatherCard location={location} />
      ) : (
        !fetchWeather && <NoLocationCard />
      )}
    </>
  );
}

export default Dashboard;
