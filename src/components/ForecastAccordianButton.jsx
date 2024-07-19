import React from "react";
import { MdAdd } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";

const ForecastAccordianButton = ({ showForecast, setShowForecast }) => {
  return (
    <div className="forecast-accordian">
      <div className="content">
        <p>Forecast</p>
        <div className="forecast-button" onClick={() => setShowForecast(!showForecast)}>
          {!showForecast ? <MdAdd size={25} /> : <RiSubtractFill />}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ForecastAccordianButton;
