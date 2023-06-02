import React from "react";
import "./SearchWeather.css";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

function SearchWeather(props) {
  const { weatherData } = props;
  console.log("Props", props);
  console.log("weather in search comp", weatherData);
  const weatherIconUrl = "https://openweathermap.org/img/wn/";

  return (
    <>
      <div className="sw-container">
        <div className="sw-section-1">
          <div className="sw-loc"> {weatherData.cityName}</div>
          <KeyboardArrowRightOutlinedIcon />
        </div>
        <div className="sw-section-2">
          <div className="sw-temp-block">
            <span className="sw-temp-val">
              {weatherData.temperature}
              <FiberManualRecordOutlinedIcon
                className="sw-temp-icon"
                sx={{ fontSize: 14, marginBottom: "4%" }}
              />
            </span>
          </div>
          <img
            className="sw-img"
            src={weatherIconUrl + weatherData.weatherIcon + ".png"}
            alt={weatherData.weatherDesc}
          ></img>
        </div>
        <div className="sw-section-3">
          <div className="sw-warn">
            <WarningAmberOutlinedIcon className="sw-warn-icon" />
            <div className="sw-warn-type">Warning</div>
          </div>
          <div className="sw-desc"> {weatherData.weatherDesc}</div>
        </div>
      </div>
    </>
  );
}

export default SearchWeather;
