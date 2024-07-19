import React from "react";

const Forecast = ({ title, data }) => {
  return (
    <div className="forecast">
      <div className="title">
        {/* <p>3 hours step forecast</p> */}
        {title}
      </div>

      <div className="three-hour-step">
        {data.map((data, index) => (
          <div key={index} className="col">
            {/* <p>5:45 AM</p> */}
            <p>{data.title}</p>
            <img
              // src="http://openweathermap.org/img/wn/01d@2x.png"
              src={data.icon}
              alt="weather icon"
              width={60}
            />
            {/* <p className="font-medium">12°</p> */}
            <p className="font-medium">{`${data.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
