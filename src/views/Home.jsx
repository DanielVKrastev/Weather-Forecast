import { useEffect, useState } from "react";

import currentWeatherAPI from "../api/currentWeatherAPI.js";
import hourlyForecastAPI from "../api/hourlyForecastAPI.js";

export default function Home() {
    const [weather, setWeather] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDataWeather() {
            const data = await currentWeatherAPI.getCurrentWeather('Sofia');
            const hourlyData = await hourlyForecastAPI.getHourlyForecast('Sofia');
            setHourlyWeather(hourlyData);
            setWeather(data);
        }
        fetchDataWeather();
        setLoading(false);
        
    }, []);

    if (loading || !weather || weather.cod !== 200) return <p className="text-center mt-10">Loading...</p>;
    
    return (
        <div className="text-center text-white bg-teal-300">
            <h1 className="text-4xl font-bold">{weather.name}</h1>
            <p className="text-6xl font-semibold">{Math.round(weather.main.temp)}°C</p>
            <p className="text-6xl mt-1 capitalize">{weather.weather[0].description}</p>

            <div className="mt-4 flex justify-center gap-6 text-lg">
                <div>🌡 Max: {Math.round(weather.main.temp_max)}°</div>
                <div>❄ Min: {Math.round(weather.main.temp_min)}°</div>
                <pre>{JSON.stringify(weather, null, 2)}</pre>
                <div>----------------------------------------</div>
                <pre>{JSON.stringify(hourlyWeather, null, 2)}</pre>
            </div>
        </div>
    );
}