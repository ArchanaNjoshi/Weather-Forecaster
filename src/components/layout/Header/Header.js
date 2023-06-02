import React from "react";
import logo from "../../../assets/cloudy.png";
import { Link } from "react-router-dom";

const Header = () => {
  const bgColor = "#D8F4F9";
  const appName = "Weather Forecast";

  const topBarStyle = {
    backgroundColor: bgColor,
    color: "black",
    padding: "0.5em 2em 0.5em 2em",
    display: "flex",
    alignItems: "center",
    fontWeight: "600",
  };

  const iconStyle = {
    marginRight: "1em",
  };

  return (
    <div style={topBarStyle}>
      <Link to="/">
        <img
          src={logo}
          alt="Weather"
          className={iconStyle}
          style={{ marginRight: "1em", width: "1.8em", height: "auto" }}
        />
      </Link>

      <span>{appName}</span>
    </div>
  );
};

export default Header;
