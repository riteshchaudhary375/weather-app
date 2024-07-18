import React from "react";
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const TempTimeDetail = ({
  weather: {
    weatherCondition,
    icon,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
  },
  units,
}) => {
  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      // value: "22°",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      // value: "346%",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      // value: "11 km/hr",
      value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}`,
    },
  ];

  const horizontalDetails = [
    // 4
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      // value: "05:23 AM",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      // value: "06:43 PM",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      // value: "37°",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "low",
      // value: "13°",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <>
      <div className="tempAndDetails">
        {/* First part */}
        <div className="flex flex-row items-center justify-between py-3">
          <img
            // src="http://openweathermap.org/img/wn/01d@2x.png"
            src={icon}
            alt="weather icon"
            className="w-20"
          />
        </div>

        {/* Middle part */}
        {/* <p className="weather-condition">Rain</p> */}
        <p className="weather-condition">{weatherCondition}</p>

        {/* Vertical part */}
        {/* <div className="vertical-result">
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
      </div> */}
        <div className="vertical-result">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div key={id}>
              <Icon className="vertical-icons" size={12} />
              {`${title}: `} <span>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal part */}
      {/* <div className="horizontal-part">
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
      </div> */}
      <div className="horizontal-part">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="sunAndTemp">
            <Icon size={16} className="horizontal-icon" />
            <p>
              {`${title}:`}
              <span>{value}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TempTimeDetail;
