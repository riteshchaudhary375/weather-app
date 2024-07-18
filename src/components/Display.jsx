import React from "react";
import hotWeather from "../assets/hotWeather.jpg";

const Display = ({
  weather: { name, country, temp, formattedLocalTime, formattedLocalDate },
}) => {
  // console.log(temp);
  return (
    <div className="display">
      <img
        className="weather-image-background"
        src={hotWeather}
        alt="weather image background"
      />
      <div className="details">
        <div className="city">
          {/* <p>Kathmandu</p>
          <h3>NP</h3> */}
          <p>{name}</p>
          <h3>{country}</h3>
        </div>
        <div className="timeDateTemp">
          <div className="timeDate">
            {/*<p className="time">6:10 PM</p>
            <p className="date">Monday, 16 July 2024</p> */}
            <p className="time">{formattedLocalTime}</p>
            <p className="date">{formattedLocalDate}</p>
          </div>
          <div className="temp">
            {/* <p>120°F</p> */}
            <p>{`${temp.toFixed()}°`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
