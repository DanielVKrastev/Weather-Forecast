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
        <div className="text-white bg-teal-300">

            <Header
                weather={weather}
            />

            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                    <HourlyForecast
                        hourlyWeather={hourlyWeather || []}
                    />
                </div>

                <div className="row-span-3">
                    <WeatherMap />
                </div>

                <div className="row-span-3">
                    <DailyForecast
                        dailyForecast={dailyForecast || []}
                    />
                </div>

                <div>
                    <Wind
                        wind={weather.wind || {}}
                        airPollution={airPollution}
                    />
                </div>

            </div>
        </div>
    );
}