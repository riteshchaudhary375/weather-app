import React, { useEffect, useState } from "react";

import Display from "./components/Display.jsx";
import Input from "./components/Input.jsx";
import TempTimeDetail from "./components/TempTimeDetail.jsx";
import ForecastAccordianButton from "./components/ForecastAccordianButton.jsx";
import Forecast from "./components/Forecast.jsx";

import getWeather from "./weatherService/weatherService.js";

const App = () => {
  const [query, setQuery] = useState({ q: "kathmandu" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [showForecast, setShowForecast] = useState(true);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await getWeather({
          ...query,
          units,
        });

        setWeather(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadWeather();
  }, [query, units]);

  return (
    <div className="app">
      {weather && (
        <div className="body">
          <Display weather={weather} units={units} />

          <div className="block-b">
            <Input setQuery={setQuery} setUnits={setUnits} />

            <TempTimeDetail weather={weather} units={units} />

            <ForecastAccordianButton
              showForecast={showForecast}
              setShowForecast={setShowForecast}
            />

            {showForecast && (
              <>
                <Forecast title="3 hours step forecast" data={weather.hourly} />

                <Forecast title="daily forecast" data={weather.daily} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
