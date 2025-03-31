import "../styles/home.css";
import Header from "./Header";
import WeatherForecast from "../components/weatherdashboard/component/WeatherForecast";
import { fetchCityByCoords } from "../ultis/api";
import { useEffect, useState } from "react";
import RainChart from "../components/RainChart";
import GlobalMap from "../components/Global";
function Home() {
  const [location, setLocation] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light_mode");
    } else {
      document.body.classList.add("light_mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const cityData = await fetchCityByCoords(latitude, longitude);
            if (cityData) {
              setLocation(cityData);
              console.log("City data", cityData);
            }
          },
          (error) => console.error("Geolocation error: ", error),
          { enableHighAccuracy: true }
        );
      }
    };
    getCurrentLocation();
  }, []);

  return (
    <div className="content">
      <Header
        setLocation={setLocation}
        location={location}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <span className="seven_weather">Next few days</span>
      <WeatherForecast location={location} />
      <RainChart location={location} />
      <div className="map_container">
        <GlobalMap location={location} />
      </div>
    </div>
  );
}

export default Home;
