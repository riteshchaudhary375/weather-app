import React, { useEffect, useState } from "react";
import Display from "./components/Display.jsx";
import Input from "./components/Input.jsx";
import TempTimeDetail from "./components/TempTimeDetail.jsx";
import ForecastAccordianButton from "./components/ForecastAccordianButton.jsx";
import Forecast from "./components/Forecast.jsx";
import formatApiData from "./weatherService/service.js";

const App = () => {
  const [showForecast, setShowForecast] = useState(false);
  const [query, setQuery] = useState({ q: "kathmandu" });
  const [weather, setWeather] = useState(false);
  const [units, setUnits] = useState("metric");

  // console.log(weather);

  /*  const searchPressed = () => {
    fetch(
      `${api.BASE_URL}weather?q=${search}&units=metric&APPID=${api.API_KEY}`
    )
      .then((res) => res.json())
      .then((result) => formatCurrent(result));

    // console.log(result);
  }; */

  const getWeather = async () => {
    const data = await formatApiData({ ...query, units })
      .then((data) => {
        // console.log(data);
        setWeather(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  return (
    <div className="app">
      {weather && (
        <>
          <div className="body">
            <Display weather={weather} />
            <div className="block-b">
              <Input setQuery={setQuery} setUnits={setUnits} />
              <TempTimeDetail weather={weather} units={units} />
              <ForecastAccordianButton
                showForecast={showForecast}
                setShowForecast={setShowForecast}
              />
              {showForecast && (
                <>
                  <Forecast
                    title="3 hours step forecast"
                    data={weather.hourly}
                  />
                  <Forecast title="daily forecast" data={weather.daily} />
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
