import React, { useEffect, useState } from "react";
import {
  fetchCurrentWeather,
  fetchRainData,
  fetchWeatherForecast,
} from "../../../ultis/api";
import "./weatherforecast.css";

function WeatherForecast({ location }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [hoverDay, setHoverDay] = useState(null);

  useEffect(() => {
    if (location?.lat && location?.lon) {
      const getWeather = async () => {
        const data = await fetchCurrentWeather(
          location.lat,
          location.lon,
          setLoading(false)
        );
        if (data) {
          setForecast(data);
          console.log("Weather Data:", data);
        }
      };
      getWeather();
    }
  }, [location]);

  useEffect(() => {
    if (location?.lat && location?.lon) {
      const getWeatherDaily = async () => {
        const data = await fetchWeatherForecast(location.lat, location.lon);

        if (data) {
          setDailyForecast(data.slice(1));
        }
      };
      getWeatherDaily();
    }
  }, [location]);

  useEffect(() => {
    if (location?.lat && location?.lon) {
      const getRainData = async () => {
        const data = await fetchRainData(location.lat, location.lon);
        console.log("Rain data", data);
      };

      getRainData();
    }
  });
  console.log(hoverDay);
  return (
    <div className="weather-container">
      {loading ? (
        <div className="current_weather weather_loading">Loading...</div>
      ) : (
        <div className={`current_weather ${!hoverDay ? "hidden" : ""}`}>
          <div className="tab__header">
            <span className="tab_day">{forecast.weekday}</span>
            <span className="tab_time">
              {new Date().toLocaleTimeString(navigator.language, {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="tab_main">
            <span className="tab_temp">{forecast.temp}°</span>
            <img
              src={forecast.icon}
              alt="Weather Icon"
              className="weather_icon"
            />
          </div>

          <div className="detail_container">
            <div className="tab_details">
              <span>Real Feel: {forecast.realFeel}°C</span>
              <span className="wind_control">
                Wind: {forecast.windDirection}, {forecast.wind} km/h
              </span>
              <span>Pressure: {forecast.pressure} MB</span>
            </div>
            <div className="tab_details">
              <span>Humidity: {forecast.humidity}%</span>
              <span>Sunrise: {forecast.sunrise}</span>
              <span>Sunset: {forecast.sunset}</span>
            </div>
          </div>
        </div>
      )}
      {dailyForecast.map((item, index) => (
        <div className="next_weather" key={index}>
          {hoverDay === index ? (
            <div
              className="tabs_container expanded"
              onMouseEnter={() => setHoverDay(index)}
              onMouseLeave={() => setHoverDay(null)}
            >
              <div className="tab__header expanded">
                <span className="tab_day expanded">
                  {new Date(item.date).toLocaleDateString(navigator.location, {
                    weekday: "long",
                  })}
                </span>
              </div>

              <div className="tab_main expanded">
                <span className="tab_temp">{item.temp}°</span>
                <img
                  src={item.icon}
                  alt="Weather Icon"
                  className="weather_icon"
                />
              </div>

              <div className="detail_container">
                <div className="tab_hovers tab_details">
                  <span>Real Feel: {item.realFeel}°C</span>
                  <span className="wind_control">
                    Wind: {item.winDeg}, {item.windSpeed} km/h
                  </span>
                </div>
                <div className="tab_hovers tab_details">
                  <span>Pressure: {item.pressure} MB</span>
                  <span>Humidity: {item.humidity}%</span>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="tabs_container"
              onMouseEnter={() => setHoverDay(index)}
              onMouseLeave={() => setHoverDay(null)}
            >
              <span className="tabs_day">
                {new Date(item.date).toLocaleDateString("en-us", {
                  weekday: "short",
                })}
              </span>
              <img src={item.icon} alt="Tabs Icon" className="tabs_icon" />
              <span className="tabs_temp">{item.temp}°</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default WeatherForecast;
