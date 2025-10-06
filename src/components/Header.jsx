export default function Header({
    weather
}) {
    return (
        <div className="border p-20">
            <div className="">
                <h1 className="text-4xl font-bold">{weather.name}</h1>
                <p className="text-6xl font-semibold">{Math.round(weather.main.temp)}°C</p>
                <p className="text-6xl mt-1 capitalize">{weather.weather[0].description}</p>
            </div>

            <div className="mt-4 flex justify-center gap-6 text-lg">
                <div>🌡 Max: {Math.round(weather.main.temp_max)}°</div>
                <div>❄ Min: {Math.round(weather.main.temp_min)}°</div>
            </div>
        </div>
    )
}