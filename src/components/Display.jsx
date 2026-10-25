import React from "react";
import hotWeather from "../assets/hotWeather.jpg";

const Display = ({
  weather: { name, country, temp, formattedLocalTime, formattedLocalDate },
  units,
}) => {
  const temperatureUnit = units === "metric" ? "°C" : "°F";

  return (
    <div className="display">
      <img
        className="weather-image-background"
        src={hotWeather}
        alt="weather image background"
      />

      <div className="details">
        <div className="city">
          <p>{name}</p>
          <h3>{country}</h3>
        </div>

        <div className="timeDateTemp">
          <div className="timeDate">
            <p className="time">{formattedLocalTime}</p>
            <p className="date">{formattedLocalDate}</p>
          </div>

          <div className="temp">
            <p>{`${temp.toFixed()}${temperatureUnit}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
