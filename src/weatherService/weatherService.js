import { DateTime } from "luxon";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Common API request
const fetchWeather = async (endpoint, params) => {
  const url = new URL(`${BASE_URL}/${endpoint}`);

  url.search = new URLSearchParams({
    ...params,
    appid: API_KEY,
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch weather data");
  }

  return response.json();
};

// Helper functions
const getIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

const getLocalTime = (timestamp, timezone, format = "hh:mm a") =>
  DateTime.fromSeconds(timestamp + timezone, {
    zone: "utc",
  }).toFormat(format);

// Format current weather
const formatCurrentWeather = (data) => ({
  name: data.name,
  country: data.sys.country,

  temp: data.main.temp,
  feels_like: data.main.feels_like,
  temp_min: data.main.temp_min,
  temp_max: data.main.temp_max,

  humidity: data.main.humidity,
  pressure: data.main.pressure,

  weatherCondition: data.weather[0].main,
  icon: getIconUrl(data.weather[0].icon),

  sunrise: getLocalTime(data.sys.sunrise, data.timezone),
  sunset: getLocalTime(data.sys.sunset, data.timezone),

  speed: data.wind.speed,

  formattedLocalTime: getLocalTime(data.dt, data.timezone),
  formattedLocalDate: getLocalTime(data.dt, data.timezone, "cccc, dd LLL yyyy"),

  dt: data.dt,
  timezone: data.timezone,

  lat: data.coord.lat,
  lon: data.coord.lon,
});

// Format forecast
const formatForecast = (data, timezone, currentTime) => {
  const hourly = data
    .filter((item) => item.dt > currentTime)
    .slice(0, 5)
    .map((item) => ({
      title: getLocalTime(item.dt, timezone),
      temp: item.main.temp,
      icon: getIconUrl(item.weather[0].icon),
      date: item.dt_txt,
    }));

  const daily = data
    .filter((item) => item.dt_txt.endsWith("00:00:00"))
    .map((item) => ({
      title: getLocalTime(item.dt, timezone, "ccc"),
      temp: item.main.temp,
      icon: getIconUrl(item.weather[0].icon),
      date: item.dt_txt,
    }));

  return {
    hourly,
    daily,
  };
};

// Main service function
const getWeather = async (searchParams) => {
  // 1. Get current weather
  const currentData = await fetchWeather("weather", searchParams);

  // 2. Format current weather
  const currentWeather = formatCurrentWeather(currentData);

  // 3. Get forecast using latitude and longitude
  const forecastData = await fetchWeather("forecast", {
    lat: currentWeather.lat,
    lon: currentWeather.lon,
    units: searchParams.units,
  });

  // 4. Format forecast
  const forecast = formatForecast(
    forecastData.list,
    currentWeather.timezone,
    currentWeather.dt,
  );

  // 5. Return everything to React
  return {
    ...currentWeather,
    ...forecast,
  };
};

export default getWeather;

/*
fetchWeather()
       ↓
API request

formatCurrentWeather()
       ↓
Clean current weather data

formatForecast()
       ↓
Clean forecast data

getWeather()
       ↓
Combines everything
*/
