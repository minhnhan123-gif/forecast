import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/globalMap.css";

const API_KEY = "8a0d8218a5db7bb40f44a7e74f56ce0b";

function ChangeView({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lon], 5);
    }
  }, [location, map]);
  return null;
}

function GlobalMap({ location }) {
  if (!location) {
    return <p>Loading map...</p>;
  }

  return (
    <MapContainer
      center={[location.lat, location.lon]}
      zoom={20} // Mức zoom
      className="leaflet_container"
    >
      <ChangeView location={location} />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution="© OpenStreetMap contributors"
      />
      <TileLayer
        url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`}
        attribution="© OpenWeatherMap"
      />
    </MapContainer>
  );
}

export default GlobalMap;
