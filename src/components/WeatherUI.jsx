import React, { useEffect, useState } from "react";
import hotWeather from "../assets/hotWeather.jpg";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";
import getFormattedWeatherData from "../weatherService/service.js";

const WeatherUI = () => {
  const [showForecast, setShowForecast] = useState(false);
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState({ q: "kathmandu" });
  const [units, setUnits] = useState("metric");

  const getWeather = async () => {
    // const data = await getFormattedWeatherData({ q: "kathmandu" })
    const data = await getFormattedWeatherData({ ...query, units })
      // 5
      .then((data) => {
        // g. toast when data is fetched
        // toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
        setWeather(data);
      });
    console.log(data);
  };

  // 3
  useEffect(() => {
    getWeather();
  }, [query, units]);

  return (
    <div className="body">
      {/* ------------------------------- */}
      <div className="display">
        <img
          className="weather-image-background"
          src={hotWeather}
          alt="weather image background"
        />
        <div className="details">
          <div className="city">
            <p>Kathmandu</p>
            <h3>NP</h3>
          </div>
          <div className="timeDateTemp">
            <div className="timeDate">
              <p className="time">6:10 PM</p>
              <p className="date">Monday, 16 July 2024</p>
            </div>
            <div className="temp">
              <p>120°F</p>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------- */}
      <div className="block-b">
        <div className="input-control">
          <div className="search-control">
            <input type="text" placeholder="e.g. Kathmandu" />
            <BiSearch size={30} title="Search" className="control-icon" />
            <BiCurrentLocation
              size={30}
              title="My Location"
              className="control-icon"
            />
          </div>
          <div className="units">
            <button>°F</button>
            <p>|</p>
            <button>°C</button>
          </div>
        </div>

        {/* ------------------------------- */}
        <div className="tempAndDetails">
          {/* First part */}
          <div className="flex flex-row items-center justify-between py-3">
            <img
              src="http://openweathermap.org/img/wn/01d@2x.png"
              alt="weather icon"
              className="w-20"
            />
          </div>

          {/* Middle part */}
          <p className="weather-condition">Rain</p>

          {/* Vertical part */}
          <div className="vertical-result">
            <div>
              <FaThermometerEmpty className="vertical-icons" size={12} />
              Real Feel: <span>23&deg;</span>
            </div>
            <div>
              <BiSolidDropletHalf className="vertical-icons" size={12} />
              Humidity: <span>74%</span>
            </div>
            <div>
              <FiWind className="vertical-icons" size={12} />
              Wind: <span>6 km/h</span>
            </div>
          </div>
        </div>

        {/* ------------------------------- */}

        {/* Horizontal part */}
        <div className="horizontal-part">
          <div className="sunAndTemp">
            <GiSunrise size={16} className="horizontal-icon" />
            <p>
              Sunrise:
              <span>05:12 AM</span>
            </p>
          </div>
          <div className="sunAndTemp">
            <GiSunset size={16} className="horizontal-icon" />
            <p>
              Sunrise:
              <span>05:12 AM</span>
            </p>
          </div>
          <div className="sunAndTemp">
            <MdKeyboardArrowUp size={16} className="horizontal-icon" />
            <p>
              Sunrise:
              <span>05:12 AM</span>
            </p>
          </div>
          <div className="sunAndTemp">
            <MdKeyboardArrowDown size={16} className="horizontal-icon" />
            <p>
              Sunrise:
              <span>05:12 AM</span>
            </p>
          </div>
        </div>

        {/* ------------------------------- */}

        <div className="forecast-accordian">
          <div className="content">
            <p>Forecast</p>
            <div onClick={() => setShowForecast(!showForecast)}>
              {!showForecast ? <MdAdd size={25} /> : <RiSubtractFill />}
            </div>
          </div>
          <hr />
        </div>

        {/* ------------------------------- */}

        {showForecast && (
          <div className="forecast">
            <div className="title">
              <p>3 hour step forecast</p>
            </div>
            <div className="three-hour-step">
              <div className="col">
                <p>5:45 AM</p>
                <img
                  src="http://openweathermap.org/img/wn/01d@2x.png"
                  alt="weather icon"
                  size={16}
                />
                <p className="font-medium">12°</p>
              </div>
              <div className="col">
                <p>8:45 AM</p>
                <img
                  src="http://openweathermap.org/img/wn/01d@2x.png"
                  alt="weather icon"
                  className="col"
                  size={16}
                />
                <p className="font-medium">12°</p>
              </div>
              <div className="col">
                <p>11:45 AM</p>
                <img
                  src="http://openweathermap.org/img/wn/01d@2x.png"
                  alt="weather icon"
                  size={16}
                />
                <p className="font-medium">12°</p>
              </div>
              <div className="col">
                <p>2:45 PM</p>
                <img
                  src="http://openweathermap.org/img/wn/01d@2x.png"
                  alt="weather icon"
                  size={16}
                />
                <p className="font-medium">12°</p>
              </div>
              <div className="col">
                <p>5:45 PM</p>
                <img
                  src="http://openweathermap.org/img/wn/01d@2x.png"
                  alt="weather icon"
                  size={16}
                />
                <p className="font-medium">12°</p>
              </div>
            </div>
            {/* ------------------------------- */}
            <div className="forecast">
              <div className="title">
                <p>Daily forecast</p>
              </div>
              <div className="three-hour-step">
                <div className="col">
                  <p>Sun</p>
                  <img
                    src="http://openweathermap.org/img/wn/01d@2x.png"
                    alt="weather icon"
                    size={16}
                  />
                  <p className="font-medium">12°</p>
                </div>
                <div className="col">
                  <p>Mon</p>
                  <img
                    src="http://openweathermap.org/img/wn/01d@2x.png"
                    alt="weather icon"
                    className="col"
                    size={16}
                  />
                  <p className="font-medium">12°</p>
                </div>
                <div className="col">
                  <p>Tue</p>
                  <img
                    src="http://openweathermap.org/img/wn/01d@2x.png"
                    alt="weather icon"
                    size={16}
                  />
                  <p className="font-medium">12°</p>
                </div>
                <div className="col">
                  <p>Wed</p>
                  <img
                    src="http://openweathermap.org/img/wn/01d@2x.png"
                    alt="weather icon"
                    size={16}
                  />
                  <p className="font-medium">12°</p>
                </div>
                <div className="col">
                  <p>Thu</p>
                  <img
                    src="http://openweathermap.org/img/wn/01d@2x.png"
                    alt="weather icon"
                    size={16}
                  />
                  <p className="font-medium">12°</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherUI;
