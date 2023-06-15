import React from "react";
import NearMeIcon from "@mui/icons-material/NearMe";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import "./WeatherCard.css";

const WeatherCard = (props) => {
  const { weatherData } = props;
  const weatherIconUrl = "https://openweathermap.org/img/wn/";
  const iconStylesLocation = {fontSize: "1vw", marginLeft: "0.5em"};
  const iconStylesDegree = {fontSize: "1vw"};

  return (
    <div className="weather-container">
      <div className="weather-section-1">
        <img
          src={weatherIconUrl + weatherData.weatherIcon + ".png"}
          className="weather-img"
          alt={weatherData.weatherDesc}
        ></img>
        <h2 className="weather-city">
          {weatherData.cityName}
          <NearMeIcon style={iconStylesLocation}  />
        </h2>
        <div className="weather-block weather-value">
          {weatherData.temperature}
          <FiberManualRecordOutlinedIcon
            sx={{ fontSize: 14, verticalAlign: "100%" }}
            style={iconStylesDegree}
          />
        </div>
      </div>
      <div className="weather-section-2">
        <div className="weather-sub-block">
          <span className="weather-sub-title">Time</span>
          <span className="weather-sub-value">{weatherData.time}</span>{" "}
        </div>
        <div className="weather-sub-block">
          <span className="weather-sub-title">Pressure</span>
          <span className="weather-sub-value">{weatherData.pressure}</span>{" "}
        </div>
        <div className="weather-sub-block">
          <span className="weather-sub-title">% Rain</span>
          <span className="weather-sub-value">
            {weatherData.rainPercentage}
          </span>{" "}
        </div>
        <div className="weather-sub-block">
          <span className="weather-sub-title">Humidity</span>
          <span className="weather-sub-value">{weatherData.humidity}</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
