import { Cloud, CloudLightning, CloudMoon, CloudRain, CloudSnow, CloudSun, Moon, MoonIcon, Rainbow, Snowflake, Sun } from "lucide-react";

export default function HourBox({ hour, sunrise, sunset }) {
    const sunriseTime = new Date(sunrise * 1000);
    const sunsetTime = new Date(sunset * 1000);
    const hourTime = new Date(hour.dt * 1000);

    // get only hours
    const sunriseHour = sunriseTime.getHours();
    const sunsetHour = sunsetTime.getHours();
    const hours = hourTime.getHours();

    // check is night
    const isNight = hours < sunriseHour || hours >= sunsetHour;


    const getEmoji = (desc) => {
        const d = desc.toLowerCase();

        if (d.includes("broken cloud") && isNight) return <CloudMoon className="w-8 h-8 text-blue-800" />;
        if (d.includes("few cloud") && isNight) return <CloudMoon className="w-8 h-8 text-blue-800" />;
        if (d.includes("broken cloud")) return (<CloudSun className="w-8 h-8 text-blue-700" />);
        if (d.includes("few cloud")) return <CloudSun className="w-8 h-8 text-blue-700" />;
        if (d.includes("cloud")) return <Cloud className="w-8 h-8 text-blue-800" />;
        if (d.includes("rain")) return <CloudRain className="w-8 h-8 text-blue-600" />;
        if (d.includes("snow")) return <CloudSnow className="w-8 h-8 text-blue-300" />;
        if (d.includes("thunder")) return <CloudLightning className="w-8 h-8 text-blue-800" />;
        if (d.includes("fog") || d.includes("mist")) return "🌫️";
        if (isNight) return <Moon className="w-8 h-8 text-indigo-600" />;
        return <Sun className="w-8 h-8 text-yellow-500" />;
    };

    return (
        <div
            className="flex flex-col items-center justify-between border rounded-2xl p-3 bg-white text-gray-800 w-28 m-1 shadow-sm hover:shadow-md transition-all duration-200"
        >
            {/* Hour */}
            <div className="text-sm font-semibold text-gray-600">
                {hourTime.toLocaleTimeString("bg-BG", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>

            {/* Icon */}
            <div className="text-3xl my-1">{getEmoji(hour.description)}</div>

            {/* Temp */}
            <div className="text-lg font-bold text-gray-900">
                {Math.round(hour.temp)}°C
            </div>

            {/* Description */}
            <div className="text-xs text-gray-500 capitalize text-center">
                {hour.description}
            </div>
        </div>
    );
}
