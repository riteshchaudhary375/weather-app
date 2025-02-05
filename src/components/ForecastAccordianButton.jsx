import React from "react";
import { MdAdd } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const ForecastAccordianButton = ({ showForecast, setShowForecast }) => {
  return (
    <div className="forecast-accordian">
      <div className="content">
        <p>Forecast</p>
        <div
          className="forecast-button"
          onClick={() => setShowForecast(!showForecast)}
        >
          {!showForecast ? (
            <span className="showForecastData">
              Show
              <IoIosArrowDown size={25} />
            </span>
          ) : (
            <span className="showForecastData">
              Hide
              <IoIosArrowUp size={25} />
            </span>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ForecastAccordianButton;
