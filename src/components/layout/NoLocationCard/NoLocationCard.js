import React from "react";
import logo from "../../../assets/fog.png";

function NoLocationCard() {
  const iconStyle = {
    marginRight: "1em",
  };
  return (
    <div>
      <img
        src={logo}
        alt="Weather"
        className={iconStyle}
        style={{
          marginLeft: "42%",
          marginTop: "5%",
          width: "15%",
          height: "15%",
        }}
      />
    </div>
  );
}

export default NoLocationCard;
