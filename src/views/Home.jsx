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
    const [videoSrc, setVideoSrc] = useState(() => {
        return localStorage.getItem("cachedVideoSrc") || "";
    });

    useEffect(() => {
        async function fetchDataWeather() {
            const data = await currentWeatherAPI.getCurrentWeather('Burgas');
            const hourlyData = await hourlyForecastAPI.getHourlyForecast('Burgas');
            const airPollutionData = await airPollutionAPI.getAirPollution('Burgas');
            const dailyData = await dailyForecastAPI.getDailyForecast('Burgas', 10);
            const uviData = await uviAPI.getUvi('Burgas');

            setWeather(data);
            setHourlyWeather(hourlyData);
            setAirPollution(airPollutionData);
            setDailyForecast(dailyData);
            setUvi(uviData);
            setLoading(false);
        }

        fetchDataWeather();
    }, []);

    // Set video background
    useEffect(() => {
        if (!weather) return;

        const newVideo = selectVideo(weather.weather[0].main, weather.weather[0].description); //clouds // few clouds
        const cachedVideo = localStorage.getItem("cachedVideoSrc");

        if (newVideo !== cachedVideo) {
            setVideoSrc(newVideo);
            localStorage.setItem("cachedVideoSrc", newVideo);
        }
    }, [weather]);

    if (loading || !weather || weather.cod !== 200) return <p className="text-center mt-10">Loading...</p>;

    const selectVideo = (weatherMain, weatherDescription) => {
        if (!weatherMain) return "/videos/sunny.mp4";

        const main = weatherMain.toLowerCase();
        const description = weatherDescription.toLowerCase();

        const sunriseTime = new Date(weather.sys.sunrise * 1000);
        const sunsetTime = new Date(weather.sys.sunset * 1000);
        const hourTime = new Date(weather.dt * 1000);

        // get only hours
        const sunriseHour = sunriseTime.getHours();
        const sunsetHour = sunsetTime.getHours();
        const hours = hourTime.getHours();

        // check is night
        const isNight = hours < sunriseHour || hours >= sunsetHour;

        const dayVideos = {
            clear: "/videos/sunny.mp4",
            drizzle: "/videos/water-drops-rain.mp4",
            snow: "/videos/snow-snowing.mp4",
            fog: "/videos/fog.mp4",
            thunderstorm: "/videos/thunders-storm-lighting.mp4",
            rain:
                description.includes("light") || description.includes("moderate")
                    ? "/videos/rain-slow.mp4"
                    : "/videos/water-drops-rain.mp4",
            clouds:
                description.includes("few") || description.includes("scattered")
                    ? "/videos/few-clouds.mp4"
                    : "/videos/dark-clouds.mp4",
        };

        const nightVideos = {
            clear: "/videos/clear-night-sky.mp4",
            drizzle: "/videos/water-drops-rain.mp4",
            snow: "/videos/snow-snowing.mp4",
            fog: "/videos/fog.mp4",
            thunderstorm: "/videos/thunders-storm-lighting.mp4",
            rain: "/videos/rain-night.mp4",
            clouds: "/videos/cloud-night-forest.mp4",
        };

        return isNight
            ? nightVideos[main] || "/videos/clear-night-sky.mp4"
            : dayVideos[main] || "/videos/sunny.mp4";
    };

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
                    key={videoSrc}
                    src={videoSrc}
                />

                <div className="absolute inset-0 bg-black/30 z-10" />

                <div className="relative z-20 text-white p-2 md:p-4">
                    <Header weather={weather} />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-500/50 p-4 rounded-3xl">

                        <div className="col-span-1 lg:col-span-3 md:col-span-4 order-first">
                            <HourlyForecast
                                hourlyWeather={hourlyWeather}
                                weather={weather}
                            />
                        </div>

                        <div className="lg:row-span-3 lg:col-span-1 order-last lg:order-none h-auto min-h-[300px] max-h-[590px] md:col-span-2 md:order-last">
                            <WeatherMap />
                        </div>

                        <div className="order-none lg:row-span-3 lg:col-span-1 lg:order-none md:row-span-2 md:col-span-3 md:order-none sm:col-span-1">
                            <DailyForecast dailyForecast={dailyForecast} />
                        </div>

                        <div className="col-span-1">
                            <Visibility weather={weather} />
                        </div>

                        <div className="col-span-1">
                            <Humidity weather={weather} />
                        </div>

                        <div className="xxl:col-span-1 lg:col-span-2 ">
                            <SunriseSunset weather={weather} />
                        </div>

                        <div className="col-span-1 md:col-span-1 lg:col-span-1 order-none lg:order-none">
                            <UviIndex uviIndex={uviIndex} />
                        </div>

                        <div className="lg:col-span-1 md:col-span-2">
                            <Pressure weather={weather} />
                        </div>

                        <div className="md:col-span-2 lg:col-span-1 xxl:col-span-2">
                            <Wind wind={weather.wind || {}} airPollution={airPollution} />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}