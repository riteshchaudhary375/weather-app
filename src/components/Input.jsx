import React from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Input = ({ searchPressed, setSearch }) => {
  return (
    <div className="input-control">
      <div className="search-control">
        <input
          type="text"
          placeholder="e.g. Kathmandu"
          onChange={(e) => setSearch(e.target.value)}
        />
        <BiSearch
          size={30}
          title="Search"
          className="control-icon"
          onClick={searchPressed}
        />
        <BiCurrentLocation
          size={30}
          title="My Location"
          className="control-icon"
        />
      </div>
      <div className="units">
        <button>°F</button>
        <p>|</p>
        <button>°C</button>
      </div>
    </div>
  );
};

export default Input;
