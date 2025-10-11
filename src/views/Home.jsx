import { useEffect, useState } from "react";

import currentWeatherAPI from "../api/currentWeatherAPI.js";
import hourlyForecastAPI from "../api/hourlyForecastAPI.js";
import Header from "../components/header/Header.jsx";
import HourlyForecast from "../components/hourly-forecast/HourlyForecast.jsx";
import Wind from "../components/wind/Wind.jsx";
import airPollutionAPI from "../api/airPollutionAPI.js";
import WeatherMap from "../components/Weather-map/WeatherMap.jsx";
import DailyForecast from "../components/daily-forecast/DailyForecast.jsx";
import dailyForecastAPI from "../api/dailyForecastAPI.js";

export default function Home() {
    const [weather, setWeather] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState([]);
    const [airPollution, setAirPollution] = useState(null);
    const [dailyForecast, setDailyForecast] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDataWeather() {
            const data = await currentWeatherAPI.getCurrentWeather('Ruse');
            const hourlyData = await hourlyForecastAPI.getHourlyForecast('Ruse');
            const airPollutionData = await airPollutionAPI.getAirPollution('Ruse');
            const dailyData = await dailyForecastAPI.getDailyForecast('Ruse', 10);
            setHourlyWeather(hourlyData);
            setWeather(data);
            setAirPollution(airPollutionData);
            setDailyForecast(dailyData);
        }
        fetchDataWeather();
        setLoading(false);

    }, []);

    if (loading || !weather || weather.cod !== 200) return <p className="text-center mt-10">Loading...</p>;

    return (
    <div className="text-white bg-teal-300 min-h-screen p-2 md:p-4">
        <Header weather={weather} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="lg:col-span-3 md:col-span-4 order-first">
                <HourlyForecast hourlyWeather={hourlyWeather || []} />
            </div>

            <div className="border lg:row-span-3 lg:col-span-1 order-last lg:order-none h-auto min-h-[300px] max-h-[590px] md:col-span-2 md:order-none">
                <WeatherMap />
            </div>

            <div className="order-none lg:row-span-3 lg:col-span-1 lg:order-none md:col-span-2 md:order-none">
                <DailyForecast dailyForecast={dailyForecast || []} />
            </div>

            <div className="col-span-1 order-4 lg:order-none">
                <Wind wind={weather.wind || {}} airPollution={airPollution} />
            </div>

            <div className="col-span-1">
                <Wind wind={weather.wind || {}} airPollution={airPollution} />
            </div>

            <div className="col-span-1">
                <Wind wind={weather.wind || {}} airPollution={airPollution} />
            </div>

            <div className="col-span-1">
                <Wind wind={weather.wind || {}} airPollution={airPollution} />
            </div>

            <div className="lg:col-span-2">
                <Wind wind={weather.wind || {}} airPollution={airPollution} />
            </div>

            <div className="lg:col-span-1">
                <Wind wind={weather.wind || {}} airPollution={airPollution} />
            </div>
        </div>
    </div>
);
}