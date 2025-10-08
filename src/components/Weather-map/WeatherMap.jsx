import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ButtonsMap from "./buttons-map/ButtonsMap";

export default function WeatherMap() {
  const mapRef = useRef(null);
  const layersRef = useRef({});
  const legendRef = useRef({});
  const [activeLayers, setActiveLayers] = useState({
    temperature: false,
    precipitation: true,
    clouds: false,
  });
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    const map = L.map("map", {
      center: [42.6977, 23.3219],
      zoom: 6,
    });

    // Basic map background
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        opacity: 0.5,
        attribution: '&copy; OpenStreetMap & CartoDB',
        maxZoom: 19,
        zIndex: 1,
      }
    ).addTo(map);

    // Temperature
    layersRef.current.temperature = L.tileLayer(
      `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      { opacity: 1 }
    );

    // Precipitation
    layersRef.current.precipitation = L.tileLayer(
      `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      { opacity: 1 }
    ).addTo(map);

    // Clouds
    layersRef.current.clouds = L.tileLayer(
      `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      { opacity: 1 }
    );

    mapRef.current = map;

    // ➕ Add legends
    addLegends(map);

    return () => {
      map.remove();
    };
  }, []);
  
  const toggleLayer = (layerName) => {
    const map = mapRef.current;
    if (!map) return;

    Object.keys(layersRef.current).forEach((key) => {
      const layer = layersRef.current[key];
      const legend = legendRef.current[key];

      if (key === layerName) {
        layer.addTo(map);
        if (legend) map.addControl(legend);
      } else {
        map.removeLayer(layer);
        if (legend) map.removeControl(legend);
      }
    });

    setActiveLayers(
      Object.fromEntries(
        Object.keys(layersRef.current).map((key) => [key, key === layerName])
      )
    );
  };

  // Custom Legends
  const addLegends = (map) => {
    // Temperature Legend
    const tempLegend = L.control({ position: "bottomleft" });
    tempLegend.onAdd = () => {
      const div = L.DomUtil.create(
        "div",
        "legend bg-white/90 p-2 rounded-lg shadow text-sm text-gray-800"
      );
      div.innerHTML = `
    <strong>🌡 Temperature (°C)</strong><br/>
    <div style="width: 180px; height: 10px; background: linear-gradient(to right, #2c7bb6, #abd9e9, #ffffbf, #fdae61, #d7191c); margin: 4px 0; border-radius: 4px;"></div>
    <div style="display: flex; justify-content: space-between; font-size: 0.75rem;">
      <span>-20</span>
      <span>-10</span>
      <span>0</span>
      <span>10</span>
      <span>20</span>
      <span>30</span>
      <span>40+</span>
    </div>
  `;
      return div;
    };
    tempLegend.addTo(map);
    legendRef.current.temperature = tempLegend;

    // 🌧 Precipitation Legend
    const rainLegend = L.control({ position: "bottomleft" });
    rainLegend.onAdd = () => {
      const div = L.DomUtil.create("div", "legend bg-white/90 p-2 rounded-lg shadow text-sm text-gray-600");
      div.innerHTML = `
        <strong>🌧 Rains (mm)</strong><br/>
        <div style="width: 180px; height: 10px; background: linear-gradient(to right, #f0f9e8, #bae4bc, #7bccc4, #2b8cbe, #08589e); margin: 4px 0;"></div>
        <div class="flex justify-between text-xs">
          <span>0</span>
          <span>5</span>
          <span>10</span>
          <span>30+</span>
        </div>
      `;
      return div;
    };
    rainLegend.addTo(map);
    legendRef.current.precipitation = rainLegend;
  };

  return (
    <div className="relative w-full" style={{ height: "40vh" }}>
      <div
        id="map"
        className="w-full h-full rounded-lg overflow-hidden z-1"
      ></div>

      <ButtonsMap
        activeLayers={activeLayers}
        toggleLayer={toggleLayer}
      />
    </div>

  );
}
