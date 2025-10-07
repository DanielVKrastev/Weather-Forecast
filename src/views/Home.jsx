import { useEffect, useState } from "react";

import currentWeatherAPI from "../api/currentWeatherAPI.js";
import hourlyForecastAPI from "../api/hourlyForecastAPI.js";
import Header from "../components/Header/Header.jsx";
import HourlyForecast from "../components/HourlyForecast/HourlyForecast.jsx";
import Wind from "../components/Wind/Wind.jsx";
import airPollutionAPI from "../api/airPollutionAPI.js";

export default function Home() {
    const [weather, setWeather] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState([]);
    const [airPollution, setAirPollution] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDataWeather() {
            const data = await currentWeatherAPI.getCurrentWeather('Sofia');
            const hourlyData = await hourlyForecastAPI.getHourlyForecast('Sofia');
            const airPollutionData = await airPollutionAPI.getAirPollution('Sofia');
            setHourlyWeather(hourlyData);
            setWeather(data);
            setAirPollution(airPollutionData);
        }
        fetchDataWeather();
        setLoading(false);

    }, []);

    if (loading || !weather || weather.cod !== 200) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="text-white bg-teal-300">

            <Header
                weather={weather}
            />

            <div className="grid grid-cols-3 gap-4">
                <HourlyForecast
                    className=""
                    hourlyWeather={hourlyWeather || []}
                />
                <Wind
                    wind={weather.wind || {}}
                    airPollution={airPollution}
                />
            </div>
        </div>
    );
}