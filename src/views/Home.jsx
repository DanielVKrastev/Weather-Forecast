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
import Humidity from "../components/humidity/Humidity.jsx";
import SunriseSunset from "../components/sunrise-sunset/SunriseSunset.jsx";
import Visibility from "../components/visibility/Visibility.jsx";
import Pressure from "../components/pressure/Pressure.jsx";
import UviIndex from "../components/uvi-index/UviIndex.jsx";
import uviAPI from "../api/uviAPI.js";

export default function Home() {
    const [weather, setWeather] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState([]);
    const [airPollution, setAirPollution] = useState(null);
    const [dailyForecast, setDailyForecast] = useState(null);
    const [uviIndex, setUvi] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDataWeather() {
            const data = await currentWeatherAPI.getCurrentWeather('Ruse');
            const hourlyData = await hourlyForecastAPI.getHourlyForecast('Ruse');
            const airPollutionData = await airPollutionAPI.getAirPollution('Ruse');
            const dailyData = await dailyForecastAPI.getDailyForecast('Ruse', 10);
            const uviData = await uviAPI.getUvi('Ruse');
            setHourlyWeather(hourlyData);
            setWeather(data);
            setAirPollution(airPollutionData);
            setDailyForecast(dailyData);
            setUvi(uviData);
        }
        fetchDataWeather();
        setLoading(false);

    }, []);

    if (loading || !weather || weather.cod !== 200) return <p className="text-center mt-10">Loading...</p>;

    return (
        <>
            <div className="relative min-h-screen overflow-hidden">
                {/* background video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    src={`./videos/sunset-beams.mp4`}
                />

                <div className="absolute inset-0 bg-black/30 z-10" />

                <div className="relative z-20 text-white p-2 md:p-4">
                    <Header weather={weather} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                        <div className="col-span-1 lg:col-span-3 md:col-span-4 order-first">
                            <HourlyForecast hourlyWeather={hourlyWeather || []} />
                        </div>

                        <div className="border lg:row-span-3 lg:col-span-1 order-last lg:order-none h-auto min-h-[300px] max-h-[590px] md:col-span-2 md:order-none">
                            <WeatherMap />
                        </div>

                        <div className="order-none lg:row-span-3 lg:col-span-1 lg:order-none md:col-span-2 md:order-none">
                            <DailyForecast dailyForecast={dailyForecast || []} />
                        </div>

                        <div className="col-span-1 md:col-span-2 lg:col-span-1 order-none lg:order-none">
                            <UviIndex uviIndex={uviIndex} />
                        </div>

                        <div className="col-span-1">
                            <Humidity weather={weather} />
                        </div>

                        <div className="xxl:col-span-1 lg:col-span-2">
                            <SunriseSunset weather={weather} />
                        </div>

                        <div className="col-span-1">
                            <Visibility weather={weather} />
                        </div>

                        <div className="lg:col-span-1 md:col-span-2">
                            <Pressure weather={weather} />
                        </div>

                        <div className="lg:col-span-1 xxl:col-span-2">
                            <Wind wind={weather.wind || {}} airPollution={airPollution} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}