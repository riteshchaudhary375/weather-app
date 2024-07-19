import { DateTime } from "luxon";

/* const api = {
  API_KEY: "",
  BASE_URL: "",
}; */

/* const getWeatherData = () => {
  fetch(`${api.BASE_URL}weather?q=${search}&units=metric&APPID=${api.API_KEY}`)
    .then((res) => res.json())
    .then((result) => formatCurrent(result));

  console.log(result);
};
 */

// 1
const apiData = (infoType, searchParams) => {
  const url = new URL(import.meta.env.VITE_BASE_URL + infoType);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: import.meta.env.VITE_API_KEY,
  });
  // for confirmation of url correct or not
  // console.log(url);
  return fetch(url).then((res) => res.json());
  // .then((data) => data);
  // .then((data) => console.log(data))
};

// creating icon url
// icon code => http://openweathermap.org/img/wn/01d@2x.png
const iconUrlFromCode = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

// luxon
const formatToLocalTime = (secs, offset, format = "hh:mm a") =>
  DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const formatToLocalDate = (secs, offset, format = "cccc, dd LLL yyyy") =>
  DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const formatWeather = (data) => {
  const {
    coord: { lon, lat },
    dt,
    name,
    main: { feels_like, humidity, pressure, temp, temp_max, temp_min },
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
    visibility,
  } = data;

  const { main: weatherCondition, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);
  const formattedLocalDate = formatToLocalDate(dt, timezone);

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
    weatherCondition,
    icon: iconUrlFromCode(icon),
    formattedLocalTime,
    formattedLocalDate,
    dt,
    timezone,
    lat,
    lon,
  };
};

const formatForecast = (secs, offset, data) => {
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

const formatApiData = async (searchParams) => {
  // for weather
  const weatherData = await apiData("weather", searchParams).then((data) =>
    formatWeather(data)
  );

  // for forecast - 1:13:39
  const { dt, lat, lon, timezone } = weatherData;
  const forecastData = await apiData("forecast", {
    lat,
    lon,
    units: searchParams.units,
  }).then((d) => formatForecast(dt, timezone, d.list));

  return { ...weatherData, ...forecastData };
};

export default formatApiData;
