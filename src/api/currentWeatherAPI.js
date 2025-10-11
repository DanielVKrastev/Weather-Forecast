const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const urlAPI = 'https://pro.openweathermap.org/data/2.5/weather';

async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchByCoords(latitude, longitude) {
  const url = `${urlAPI}?lat=${latitude}&lon=${longitude}&units=metric&lang=en&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return await res.json();
}

async function fetchByCity(city) {
  const url = `${urlAPI}?q=${city}&units=metric&lang=en&appid=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return await res.json();
}

export default {
  async getCurrentWeather(city) {
    let weatherData = [];
    try {
      const pos = await getCurrentPosition();
      const { latitude, longitude } = pos.coords;
      weatherData = await fetchByCoords(latitude, longitude);
    } catch (geoError) {
      console.warn("Geolocation error, fallback to city:", geoError);
      try {
        weatherData = await fetchByCity(city);
      } catch (fetchError) {
        console.error("Error to fetch weather:", fetchError);
        weatherData = null;
      }
    }

    return weatherData;
  },
};