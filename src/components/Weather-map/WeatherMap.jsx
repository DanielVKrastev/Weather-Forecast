import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ButtonsMap from "./buttons-map/ButtonsMap";
import { addWeatherLegends, createWeatherLayers } from "../../api/weatherTileAPI";

export default function WeatherMap() {
  const mapRef = useRef(null);
  const layersRef = useRef({});
  const legendRef = useRef({});
  const [activeLayers, setActiveLayers] = useState({
    temperature: false,
    precipitation: true,
    clouds: false,
  });

  useEffect(() => {
    const map = L.map("map", {
      center: [42.6977, 23.3219],
      zoom: 6,
    });

    // Base map
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        opacity: 0.5,
        attribution: '&copy; OpenStreetMap & CartoDB',
        maxZoom: 19,
      }
    ).addTo(map);

    // Weather layers
    layersRef.current = createWeatherLayers();
    layersRef.current.precipitation.addTo(map);

    // Legends
    legendRef.current = addWeatherLegends(map);

    mapRef.current = map;

    return () => map.remove();
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

  return (
    <div className="relative w-full" style={{ height: "40vh" }}>
      <div id="map" className="w-full h-full rounded-lg overflow-hidden"></div>
      <ButtonsMap activeLayers={activeLayers} toggleLayer={toggleLayer} />
    </div>
  );
}
