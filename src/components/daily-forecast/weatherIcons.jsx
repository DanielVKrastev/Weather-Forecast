import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Droplets,
  CloudFog,
} from "lucide-react";

export const weatherIcons = {
    Clear: <Sun className="w-10 h-10 text-yellow-500" />,
    Clouds: <CloudSun className="w-10 h-10 text-blue-700" />,
    Rain: <CloudRain className="w-10 h-10 text-blue-700" />,
    Drizzle: <Droplets className="w-10 h-10 text-blue-400" />,
    Snow: <CloudSnow className="w-10 h-10 text-blue-300" />,
    Thunderstorm: <CloudLightning className="w-10 h-10 text-yellow-400" />,
    Fog: <CloudFog className="w-10 h-10 text-gray-400" />,
};