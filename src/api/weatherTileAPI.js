import L from "leaflet";

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export function createWeatherLayers() {
  return {
    temperature: L.tileLayer(
      `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      { opacity: 1 }
    ),

    precipitation: L.tileLayer(
      `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      { opacity: 1 }
    ),

    clouds: L.tileLayer(
      `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`,
      { opacity: 1 }
    ),
  };
}

export function addWeatherLegends(map) {
  const legends = {};

  // Temperature Legend
  const tempLegend = L.control({ position: "bottomleft" });
  tempLegend.onAdd = () => {
    const div = L.DomUtil.create(
      "div",
      "legend bg-white/90 p-2 rounded-lg shadow text-sm text-gray-800"
    );
    div.innerHTML = `
      <strong>🌡 Temperature (°C)</strong><br/>
      <div style="width:180px;height:10px;background:linear-gradient(to right,#2c7bb6,#abd9e9,#ffffbf,#fdae61,#d7191c);margin:4px 0;border-radius:4px;"></div>
      <div style="display:flex;justify-content:space-between;font-size:0.75rem;">
        <span>-20</span><span>-10</span><span>0</span><span>10</span><span>20</span><span>30</span><span>40+</span>
      </div>`;
    return div;
  };
  tempLegend.addTo(map);
  legends.temperature = tempLegend;

  // Precipitation Legend
  const rainLegend = L.control({ position: "bottomleft" });
  rainLegend.onAdd = () => {
    const div = L.DomUtil.create(
      "div",
      "legend bg-white/90 p-2 rounded-lg shadow text-sm text-gray-600"
    );
    div.innerHTML = `
      <strong>🌧 Rains (mm)</strong><br/>
      <div style="width:180px;height:10px;background:linear-gradient(to right,#f0f9e8,#bae4bc,#7bccc4,#2b8cbe,#08589e);margin:4px 0;"></div>
      <div style="display:flex;justify-content:space-between;font-size:0.75rem;">
        <span>0</span><span>5</span><span>10</span><span>30+</span>
      </div>`;
    return div;
  };
  rainLegend.addTo(map);
  legends.precipitation = rainLegend;

  return legends;
}
