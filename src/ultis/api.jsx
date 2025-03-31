const API_KEY = "8a0d8218a5db7bb40f44a7e74f56ce0b";

export const fetchCity = async (cityName) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();
    if (data.length === 0) return null;
    console.log(data);
    return {
      city: data[0].name,
      country: data[0].country,
      lat: data[0].lat,
      lon: data[0].lon,
    };
  } catch (error) {
    console.error("Loi khi goi api: ", error);
    return null;
  }
};

export const fetchCityByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log("data", data);
    if (data.length === 0) return null;

    return {
      city: data[0].name,
      country: data[0].country,
      lat,
      lon,
    };
  } catch (error) {
    console.error("Error fetching city by coordinates:", error);
    return null;
  }
};

const getWindDirection = (degree) => {
  if (degree > 337.5 || degree <= 22.5) return "N";
  if (degree > 22.5 && degree <= 67.5) return "E-N";
  if (degree > 67.5 && degree <= 112.5) return "E";
  if (degree > 112.5 && degree <= 157.5) return "E-S";
  if (degree > 157.5 && degree <= 202.5) return "S";
  if (degree > 202.5 && degree <= 247.5) return "W-N";
  if (degree > 247.5 && degree <= 292.5) return "W";
  if (degree > 292.5 && degree <= 337.5) return "W-N";
};

export const fetchCurrentWeather = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  const data = await response.json();

  const localTime = new Date((data.dt + data.timezone) * 1000);
  const day = localTime.toLocaleDateString("en-US", { weekday: "long" });
  if (data.length === 0) return null;
  return {
    weekday: day,
    temp: data.main.temp.toFixed(1),
    realFeel: data.main.feels_like,
    wind: (data.wind.speed * 3.6).toFixed(0),
    windDirection: getWindDirection(data.wind.deg),
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString("en-us", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    weather: data.weather[0].main,
    description: data.weather[0].description,
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`, // Link ảnh icon thời tiết
  };
};

export const fetchWeatherForecast = async (lat, lon) => {
  const dailyForecast = {};
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    const data = await response.json();
    if (data.length === 0) return null;
    console.log(data);
    data.list.forEach((item) => {
      const localTime = new Date((item.dt + item.timezone) * 1000);
      const day = localTime.toLocaleDateString(navigator.language, {
        weekday: "long",
      });
      const date = item.dt_txt.split(" ")[0];
      if (!dailyForecast[date]) {
        dailyForecast[date] = {
          date,
          weekday: day,
          temp: item.main.temp.toFixed(0),
          realFeel: item.main.feels_like.toFixed(0),
          humidity: item.main.humidity,
          pressure: item.main.pressure,
          windSpeed: item.wind.speed.toFixed(0),
          winDeg: getWindDirection(item.wind.deg),
          description: item.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        };
      }
    });
  } catch (error) {
    console.error("Loi", error);
    return null;
  }
  return Object.values(dailyForecast);
};

export const fetchRainData = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const data = await response.json();
    const combinedData = data.list.slice(0, 6).map((entry) => ({
      time: entry.dt_txt.split(" ")[1].split(":")[0] + "h",
      rain: entry.rain ? entry.rain["3h"] : 0,
    }));
    return combinedData;
  } catch (error) {
    console.error("Loi khong tim thay data", error);
  }
};
