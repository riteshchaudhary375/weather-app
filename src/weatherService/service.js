import { DateTime } from "luxon";

const API_KEY = "16d7a08851d7d710c7e0ddb45b1fcb61";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

// 1
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  // console.log(url);

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
};

// 7
// creating icon url
// icon code => http://openweathermap.org/img/wn/01d@2x.png
const iconUrlFromCode = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

// 4
// luxon
const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

// 3
const formatCurrent = (data) => {
  //   console.log(data);
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  // 5
  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  // 6
  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

// 9
const formatForecastWeather = (secs, offset, data) => {
  // HOURLY
  const hourly = data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }))
    .slice(0, 5);
  //   console.log(hourly);

  // DAILY
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
};

// 2
const getFormattedWeatherData = async (searchParams) => {
  // format weather
  const formattedCurrentWeather = await getWeatherData(
    "weather", // we using "weather" api
    searchParams
  ).then((data) => formatCurrent(data));

  // 8
  // format forecast
  const { dt, lat, lon, timezone } = formattedCurrentWeather;
  // now using "forecast" api
  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list)); // list is comming from forecast

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default getFormattedWeatherData;
