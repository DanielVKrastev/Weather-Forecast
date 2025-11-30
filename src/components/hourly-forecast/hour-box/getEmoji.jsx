import { Cloud, CloudLightning, CloudMoon, CloudRain, CloudSnow, CloudSun, Moon, MoonIcon, Rainbow, Snowflake, Sun } from "lucide-react";

export const getEmoji = (desc, isNight) => {
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