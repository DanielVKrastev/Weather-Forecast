import { useEffect, useState } from "react";

import currentWeatherAPI from "../api/currentWeatherAPI.js";
import hourlyForecastAPI from "../api/hourlyForecastAPI.js";
import Header from "../components/Header.jsx";

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

            <Header
                weather={weather}
            />

            <pre>{JSON.stringify(weather, null, 2)}</pre>
            <div>----------------------------------------</div>
            <pre>{JSON.stringify(hourlyWeather, null, 2)}</pre>
        </div>
    );
}