import { useEffect, useState } from "react";

export default function WeatherAPI() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);


    navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=bg&appid=${apiKey}`)
    });

    const city = "Plovdiv";
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    useEffect(() => {
        async function fetchWeather() {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=bg&appid=${apiKey}`
                );

                const data = await response.json();
                setWeather(data);
            } catch (error) {
                console.error(`Error in loading on weather: ${error}`);
            } finally {
                setLoading(false);

            }
        }

        fetchWeather();
    }, [city, apiKey]);

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!weather || weather.cod !== 200)
        return <p className="text-center mt-10">Error in loading</p>;

    return (
        <div className="text-center text-white mt-20">
            <h1 className="text-4xl font-bold">{weather.name}</h1>
            <p className="text-6xl font-semibold">{Math.round(weather.main.temp)}°C</p>
            <p className="text-2xl mt-1 capitalize">{weather.weather[0].description}</p>

            <div className="mt-4 flex justify-center gap-6 text-lg">
                <div>🌡 Max: {Math.round(weather.main.temp_max)}°</div>
                <div>❄ Min: {Math.round(weather.main.temp_min)}°</div>
            <pre>{JSON.stringify(weather, null, 2)}</pre>
            </div>
        </div>
    );
}