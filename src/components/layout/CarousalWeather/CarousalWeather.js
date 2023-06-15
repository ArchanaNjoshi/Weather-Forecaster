import React from "react";
import { Link } from "react-router-dom";

import DisplayWeather from "../DisplayWeather/DisplayWeather";
import "./CarousalWeather.css";
// import '../../common/Carousel/Carousel.css'

// Redux imports
import { useSelector } from "react-redux";

function CarousalWeather(props) {
  const { location } = props;
  console.log("Location from params", location);

  // Carousel
  // const [activeIndex, setActiveIndex] = useState(0);

  // const goToPrevious = () => {
  //   setActiveIndex((prevIndex) => (prevIndex === 0 ? locations.length - 1 : prevIndex - 1));
  // };

  // const goToNext = () => {
  //   setActiveIndex((prevIndex) => (prevIndex === locations.length - 1 ? 0 : prevIndex + 1));
  // };

  // Redux location list
  const locations = useSelector((state) => state.location.locations);

  console.log("Redux location", locations);

  // console.log("Redux Locations list",locations);

  return (
    <>
      {/* <div className="carousel">
      <button className="carousel-btn" onClick={goToPrevious}>
        Previous
      </button>
      <div className="carousel-content"> */}
      {locations.map((locationSaved) => (
        <div className="cw-container">
          {/* <div className="cw-btn-section">
            <Button
              onClick={handleClickDeleteLocation}
              className="cw-btn-remove"
              text="Remove"
              variant="contained"
              color="error"
              fillColor="#ef5350"
              style={{
                fontWeight: 900,
                color: "#fff",
                borderRadius: "8px",
                fontSize: ".7em",
                height: "90%",
              }}
            />
          </div> */}
          <Link
            to={`/Weather-Forecaster/weather-details/${locationSaved}`}
            className="details-redirect"
          >
            <DisplayWeather location={locationSaved} />
          </Link>
        </div>
      ))}
      {/* </div>
      <button className="carousel-btn" onClick={goToNext}>
        Next
      </button>
    </div> */}
    </>
  );
}

export default CarousalWeather;
