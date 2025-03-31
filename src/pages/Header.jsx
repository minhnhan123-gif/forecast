import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlass,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";
import App from "../App";
import { useState, useEffect } from "react";
import { fetchCity } from "../ultis/api";

function Header({ darkMode, setDarkMode, setLocation, location }) {
  const [searchValue, setSearchValue] = useState("");
  const [city, setCity] = useState(location?.city || "...");
  const [country, setCountry] = useState(location?.country || "...");

  useEffect(() => {
    if (location?.city) {
      setCity(location.city);
      setCountry(location.country);
    }
  }, [location]);
  const handleSearch = async (e) => {
    if (
      (e.type === "click" && searchValue.trim() !== "") ||
      (e.key === "Enter" && searchValue.trim() !== "")
    ) {
      const cityInfo = await fetchCity(searchValue);
      if (!cityInfo) {
        console.error("Khong tim thay thanh pho");
        return;
      }
      setCity(cityInfo.city);
      setCountry(cityInfo.country);
      setLocation({
        city: cityInfo.city,
        country: cityInfo.country,
        lat: cityInfo.lat,
        lon: cityInfo.lon,
      });
      console.log(cityInfo);
    }
  };

  return (
    <header className="header">
      <div className="header_location">
        <FontAwesomeIcon className="header_icon" icon={faLocationDot} />
        <span className="header_city">{city}, </span>
        <span className="header_country">{country}</span>
      </div>

      {/* Search button */}
      <div className="search_bar">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="search_icon"
          onClick={handleSearch}
        />
        <input
          type="text"
          placeholder="Search city..."
          value={searchValue}
          onKeyDown={handleSearch}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Dark Mode */}
      <div className="button_darkMode">
        <input
          type="checkbox"
          id="darkmode-toggle"
          checked={darkMode}
          onChange={() => setDarkMode((prev) => !prev)}
          hidden
        />
        <label htmlFor="darkmode-toggle" className="darkmode_label">
          <div className="theme-toggle">
            <FontAwesomeIcon
              icon={faSun}
              id="mode_sun"
              className={`icon ${darkMode ? "active" : ""}`}
            />
            <FontAwesomeIcon
              icon={faMoon}
              id="mode_moon"
              className={`icon ${!darkMode ? "active" : ""}`}
            />
          </div>
        </label>
      </div>
    </header>
  );
}

export default Header;
