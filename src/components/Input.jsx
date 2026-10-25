import React, { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Input = ({ setQuery, setUnits }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    const cityName = city.trim();

    if (!cityName) return;

    setQuery({ q: cityName });
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setQuery({
          lat: coords.latitude,
          lon: coords.longitude,
        });
      },
      () => {
        alert("Unable to get your location.");
      },
    );
  };

  return (
    <div className="input-control">
      <div className="search-control">
        <input
          type="text"
          placeholder="Search by city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            // user can search by pressing Enter
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <BiSearch
          size={30}
          title="Search"
          className="control-icon"
          onClick={handleSearch}
        />

        <BiCurrentLocation
          size={30}
          title="My Location"
          className="control-icon"
          onClick={handleLocation}
        />
      </div>

      <div className="units">
        <button onClick={() => setUnits("imperial")} title="Fahrenheit">
          °F
        </button>

        <p>|</p>

        <button onClick={() => setUnits("metric")} title="Celsius">
          °C
        </button>
      </div>
    </div>
  );
};

export default Input;
