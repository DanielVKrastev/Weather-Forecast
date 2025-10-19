import ScrollContainer from "react-indiana-drag-scroll";
import HourBox from "./hour-box/HourBox";

export default function HourlyForecast({
    hourlyWeather,
    weather
}) {
    const sunrise = weather.sys.sunrise;
    const sunset = weather.sys.sunset;

    const forecastTwentyFourHours = [];
    hourlyWeather.list.slice(0, 25).forEach(hour => {
        forecastTwentyFourHours.push({ dt: hour.dt, temp: Math.round(hour.main.temp), description: hour.weather[0].description });
    });

    return (
        <ScrollContainer className="grid auto-cols-max rounded-2xl bg-slate-500/50 grid-flow-col p-4 overflow-x-auto">
            {forecastTwentyFourHours.map((hour, index) => (
                <HourBox
                    key={index}
                    hour={hour}
                    sunrise={sunrise}
                    sunset={sunset}
                />
            ))}
        </ScrollContainer>
    );
}
