import ScrollContainer from "react-indiana-drag-scroll";

export default function HourlyForecast({
    hourlyWeather
}) {

    const forecastTwentyFourHours = [];
    hourlyWeather.list.slice(0, 25).forEach(hour => {
        const time = new Date(hour.dt * 1000).toLocaleTimeString("bg-BG", {
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
        forecastTwentyFourHours.push({ time, temp: Math.round(hour.main.temp), description: hour.weather[0].description });
    });

    return (
        <ScrollContainer className="grid auto-cols-max rounded-2xl bg-slate-500/50 grid-flow-col p-4 overflow-x-auto">
            {forecastTwentyFourHours.map((hour, index) => (
                <div
                    key={index}
                    className="border rounded-2xl p-1 text-center bg-white text-gray-800 w-24 m-1"
                >
                    <div>
                        <div className="font-semibold">{hour.time}</div>
                        <div className="text-lg">{hour.temp}°C</div>
                        <div className="text-sm">{hour.description}</div>
                    </div>
                </div>
            ))}
        </ScrollContainer>
    );
}
