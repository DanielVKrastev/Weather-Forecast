import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Droplets,
  CloudFog,
} from "lucide-react";
import ScrollContainer from "react-indiana-drag-scroll";

export default function DailyForecast({ dailyForecast }) {
  const dailyForecastList = dailyForecast.list || [];

  const weatherIcons = {
    Clear: <Sun className="w-10 h-10 text-yellow-500" />,
    Clouds: <CloudSun className="w-10 h-10 text-blue-700" />,
    Rain: <CloudRain className="w-10 h-10 text-blue-700" />,
    Drizzle: <Droplets className="w-10 h-10 text-blue-400" />,
    Snow: <CloudSnow className="w-10 h-10 text-blue-300" />,
    Thunderstorm: <CloudLightning className="w-10 h-10 text-yellow-400" />,
    Fog: <CloudFog className="w-10 h-10 text-gray-400" />,
  };

  const getDayName = (dt) =>
    new Date(dt * 1000).toLocaleDateString("en-GB", { weekday: "short" });
  const getDate = (dt) =>
    new Date(dt * 1000).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });

  return (
    <ScrollContainer className="rounded-2xl bg-slate-500/40 p-4 flex flex-col overflow-y-auto h-[625px] gap-3 text-gray-800">
      {dailyForecastList.map((day, index) => {
        const weatherMain = day.weather?.[0]?.main;
        const icon = weatherIcons[weatherMain] || <Cloud className="w-10 h-10 text-gray-400" />;

        return (
          <div
            key={index}
            className="flex flex-col justify-between border border-gray-200 rounded-2xl p-4 bg-white/90 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
          >
            {/* Title */}
            <div className="flex justify-between items-center mb-1">
              <div className="text-lg font-semibold text-gray-700">{getDayName(day.dt)}</div>
              <div className="text-sm text-gray-500">{getDate(day.dt)}</div>
            </div>

            {/* Icon */}
            <div className="flex items-center justify-center mb-1">{icon}</div>

            {/* Type weather */}
            <div className="text-center text-base font-medium text-gray-700 mb-1">
              {weatherMain}
            </div>

            {/* Max / Min */}
            <div className="flex justify-around text-lg mb-1">
              {day.temp?.max !== undefined && (
                <div className="text-red-500 font-medium">
                  ↑ {Math.round(day.temp.max)}°C
                </div>
              )}
              {day.temp?.min !== undefined && (
                <div className="text-blue-500 font-medium">
                  ↓ {Math.round(day.temp.min)}°C
                </div>
              )}
            </div>

            {/* Rains*/}
            {day.pop !== undefined && (
              <div className="flex justify-center items-center gap-1 text-lg text-blue-600">
                <Droplets className="w-4 h-4" />
                {Math.round(day.pop * 100)}%
              </div>
            )}
          </div>
        );
      })}
    </ScrollContainer>
  );
}
