import { DateTime } from "luxon";

const API_KEY = "16d7a08851d7d710c7e0ddb45b1fcb61";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

/* const api = {
  API_KEY: "16d7a08851d7d710c7e0ddb45b1fcb61",
  BASE_URL: "https://api.openweathermap.org/data/2.5/",
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
  const url = new URL(BASE_URL + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  // for confirmation of url correct or not
  // console.log(url);
  return fetch(url).then((res) => res.json());
  // .then((data) => data);
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

const formatApiData = async (searchParams) => {
  try {
    // for weather
    const weatherData = await apiData("weather", searchParams);

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
    } = weatherData;

    console.log(temp);

    const { main: weatherCondition, icon } = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone);
    const formattedLocalDate = formatToLocalDate(dt, timezone);

    // for forecast - 1:13:39
    // let { dt, lat, lon, timezone } = weatherData;
    // console.log(dt);
    const forecastData = await apiData("forecast", {
      lat,
      lon,
      units: searchParams.units,
    });
    console.log("forecast: ", forecastData);
    const { dt: secs, timezone: offset, list: data } = forecastData;
    // console.log("list: ", list);
    // console.log("timezone: ", timezone);
    console.log("secs: ", secs);

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

    /*     // HOURLY
    const hourly = list
      .filter((f) => f.dt > dt)
      .map((f) => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, dt, "hh:mm a"),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt,
      }))
      .slice(0, 5);
    // console.log(hourly);

    // DAILY
    const daily = list
      .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
      .map((f) => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, dt, "ccc"),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt,
      }));
    // console.log(daily); */

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
      // visibility,
      // pressure,
      lat,
      lon,
      dt,
      timezone,
      hourly,
      daily,
    };
  } catch (error) {
    console.log(error.message);
  }
  /* const weatherData = await apiData("weather", searchParams).then((data) =>
    formatWeather(data)
  );

  const formatWeather = (data)=>{
    console.log(data);
  } */
};

export default formatApiData;
