import React, { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Input = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        // lat, lon => open weather api takes as query
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  return (
    <div className="input-control">
      <div className="search-control">
        <input
          type="text"
          placeholder="Search by city name..."
          onChange={(e) => setCity(e.target.value)}
        />
        <BiSearch
          size={30}
          title="Search"
          className="control-icon"
          onClick={handleSearchClick}
        />
        <BiCurrentLocation
          size={30}
          title="My Location"
          className="control-icon"
          onClick={handleLocationClick}
        />
      </div>
      <div className="units">
        <button onClick={() => setUnits("imperial")} title="Fahrenheit">
          °F
        </button>
        <p>|</p>
        <button onClick={() => setUnits("metric")} title="Degree Celsius">
          °C
        </button>
      </div>
    </div>
  );
};

export default Input;
