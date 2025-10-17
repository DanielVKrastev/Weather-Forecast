import ScrollContainer from "react-indiana-drag-scroll";

const weatherIcons = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Snow: "❄️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Mist: "🌫️",
};

export default function DailyForecast({ dailyForecast }) {
  const dailyForecastList = dailyForecast.list || [];

  const getDayName = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleDateString("bg-BG", { weekday: "short" });
  };

  const getDate = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleDateString("bg-BG", { day: "numeric", month: "short" });
  };

  return (
    <ScrollContainer className="rounded-2xl bg-slate-500/50 p-4 flex flex-col overflow-y-auto h-[625px] gap-3 text-gray-800">
      {dailyForecastList.map((day, index) => {
        const weatherMain = day.weather?.[0]?.main;
        const icon = weatherIcons[weatherMain] || "❔";

        return (
          <div
            key={index}
            className="flex flex-col justify-between border rounded-2xl p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="text-lg font-semibold">{getDayName(day.dt)}</div>
              <div className="text-sm text-gray-500">{getDate(day.dt)}</div>
            </div>

            <div className="flex items-center justify-center text-3xl mb-2">
              {icon}
            </div>

            {weatherMain && (
              <div className="text-center text-lg font-medium mb-2">{weatherMain}</div>
            )}

            <div className="flex justify-around text-sm mb-2">
              {day.temp?.max !== undefined && (
                <div>Max: {Math.round(day.temp.max)}°C</div>
              )}
              {day.temp?.min !== undefined && (
                <div>Min: {Math.round(day.temp.min)}°C</div>
              )}
            </div>

            {day.pop !== undefined && (
              <div className="text-center text-xs text-blue-500">
                {Math.round(day.pop * 100)}% 💧
              </div>
            )}
          </div>
        );
      })}
    </ScrollContainer>
  );
}
