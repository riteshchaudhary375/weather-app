import React from "react";

const Forecast = ({ title, data }) => {
  return (
    <>
      {/* <div className="forecast">
      <div className="title">
        <p>3 hours step forecast</p>
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
    </div> */}
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
    </>
  );
};

export default Forecast;
