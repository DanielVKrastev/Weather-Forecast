import { data } from "autoprefixer";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const urlAPI = 'https://pro.openweathermap.org/data/2.5/forecast/daily';

async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchByCoords(latitude, longitude, days) {
  const url = `${urlAPI}?lat=${latitude}&units=metric&lon=${longitude}&cnt=${days}&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return await res.json();
}

async function fetchByCity(city, days) {
    const geoRes = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );
    const geoData = await geoRes.json();
    if (!geoData || geoData.length === 0) {
        throw new Error("City not found");
    }

    const { lat, lon } = geoData[0];

    const airPollution = await fetchByCoords(lat, lon, days);
    return airPollution;
}

export default {
  async getDailyForecast(city, days) {
    let weatherData = [];
    try {
      const pos = await getCurrentPosition();
      const { latitude, longitude } = pos.coords;
      weatherData = await fetchByCoords(latitude, longitude, days);
    } catch (geoError) {
      console.warn("Geolocation error, fallback to city:", geoError);
      try {
        weatherData = await fetchByCity(city, days);
      } catch (fetchError) {
        console.error("Error to fetch weather:", fetchError);
        weatherData = null;
      }
    }
    
    return weatherData;
  },
};