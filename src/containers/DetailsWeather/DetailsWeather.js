import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import WeatherCard from "../../components/layout/WeatherCard/WeatherCard";
import GraphCard from "../../components/layout/GraphCard/GraphCard";
import Button from "../../components/common/Button/Button";
import "./DetailsWeather.css";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { addLocation, deleteLocation } from "../../store/store";

function DetailsWeather(props) {
  // Route parameter location is extracted
  const params = useParams();
  const location = params.location;

  console.log("Location from params", location);

  // Redux location list
  const locations = useSelector((state) => state.location.locations);
  const dispatch = useDispatch();

  // *REDUX Functions*
  // Add a location
  const handleAddLocation = (newLocation) => {
    dispatch(addLocation(newLocation));
  };

  // Delete a location
  const handleDeleteLocation = (location) => {
    dispatch(deleteLocation(location));
  };

  // Check if a certain location is present
  const isLocationPresent = (location) => {
    return locations.includes(location);
  };

  // Add a location
  const handleClickAddLocation = () => {
    const newLocation = location;
    console.log("Adding location", newLocation);
    handleAddLocation(newLocation);
  };

  // Delete a location
  const handleClickDeleteLocation = () => {
    const newLocation = location;
    console.log("Deleting location", newLocation);
    handleDeleteLocation(location);
  };

  const [weatherData, setWeatherData] = useState();
  const [forecastData, setForecastData] = useState();

  console.log("Redux location", locations);

  // Base urls and api keys
  const ApiKey = "&appid=27ae7fea5ae96986fd8bd17edfc09937";
  const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  const ForecastBaseUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";

  // const weatherDetailsUrl = weatherBaseUrl + "london" + ApiKey;

  // navigating to dashboard
  const navigate = useNavigate();
  const redirectPath = "/Weather-Forecaster/";

  // Calling fetch function for both weather and forecast
  useEffect(() => {
    if (location) {
      console.log("Searching, Called fetch weather & forecast", location);
      fetchWeatherForecastData();
    }
  }, []);

  // Fetch function
  const fetchWeatherForecastData = async () => {
    try {
      console.log("Searching for location weather", location);
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
      // Setting data into state variable to pass as props
      console.log("Before setting transfremd fdtaa", transformedWeatherData);
      setWeatherData(transformedWeatherData);
      console.log("weather data", weatherData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }

    try {
      console.log("Searching for location forecast", location);
      // Assemble forecast url and fetch
      const forecastDetailsUrl = ForecastBaseUrl + `${location}` + ApiKey;
      const response = await axios.get(forecastDetailsUrl);
      console.log("Search Response- Forecast Details", response);
      setForecastData(response);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // redirecting to dashboard on clicking back
  const handleRedirectDashboard = () => {
    navigate(redirectPath, { replace: true });
  };

  // console.log("Redux Locations list",locations);

  return (
    <>
      <div className="dw-container">
        <div className="dw-btn-section">
          <div className="dw-btn-sub-1">
            <Button
              text="Back"
              onClick={handleRedirectDashboard}
              variant="text"
              icon="back"
              style={{
                fontWeight: 900,
                color: "#4194FF",
                borderRadius: "5px",
                fontSize: "1vw",
              }}
            />
          </div>
          <div className="dw-btn-sub-2">
            {!isLocationPresent(location) && (
              <Button
                onClick={handleClickAddLocation}
                text="Add to list"
                variant="text"
                icon="add"
                style={{
                  fontWeight: 900,
                  color: "#455555",
                  borderRadius: "5px",
                  fontSize: "1vw",
                }}
              />
            )}

            {isLocationPresent(location) && (
              <div className="dw-btn-sub-2-1">
                <Button
                  className="dw-btn-add"
                  text="Added"
                  variant="contained"
                  color="success"
                  fillColor="#4caf50"
                  icon="tick"
                  style={{
                    fontWeight: 900,
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: ".7vw",
                    height: "90%",
                    margin: "2%",
                  }}
                />
                <Button
                  onClick={handleClickDeleteLocation}
                  className="dw-btn-remove"
                  text="Remove"
                  variant="contained"
                  color="error"
                  fillColor="#ef5350"
                  style={{
                    fontWeight: 900,
                    color: "#fff",
                    borderRadius: "8px",
                    fontSize: ".7vw",
                    height: "90%",
                    margin: "2%",
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="dw-section-2">
          <div className="dw-sub-weather">
            {weatherData && <WeatherCard weatherData={weatherData} />}
          </div>
          <div className="dw-sub-forecast">
            {forecastData && (
              <GraphCard forecastData={forecastData} location={location} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsWeather;
