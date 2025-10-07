import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function RainMap() {
  useEffect(() => {
    const map = L.map("rain-map").setView([43.5183, 26.5146], 6);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    L.tileLayer(
      `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      {
        maxZoom: 19,
        opacity: 1,
        attribution: '© OpenWeather',
      }
    ).addTo(map);

    const legend = L.control({ position: "bottomright" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "leaflet-legend");
      const grades = [0, 0.1, 0.5, 1, 5, 10, 20];
      const colors = ["#ffffff", "#c8e7ff", "#7fc7ff", "#3fa0ff", "#0066ff", "#0044cc", "#002266"];

      div.innerHTML += "<h4>Rain (mm/h)</h4>";

      for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
          `<i style="background:${colors[i]}"></i> ` +
          grades[i] +
          (grades[i + 1] ? `–${grades[i + 1]}<br>` : "+");
      }

      return div;
    };

    legend.addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div id="rain-map" className="w-full h-[400px] rounded-lg shadow-lg"></div>
  );
}
