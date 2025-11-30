import { getColor } from "./methods/getColor";
import { getHumidityText } from "./methods/getHumidityText";

export default function Humidity({ weather }) {
  const humidity = weather.main.humidity;
  const barWidth = Math.min(humidity, 100);

  return (
    <div className="border rounded-2xl p-5 bg-gradient-to-br from-white to-gray-50 text-gray-800 shadow-md hover:shadow-lg transition-all duration-500 m-1 h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          Humidity
        </h3>
        <span
          className="px-2 py-1 text-xs font-semibold rounded-full text-white"
          style={{ backgroundColor: getColor(humidity) }}
        >
          {getHumidityText(humidity)}
        </span>
      </div>

      <div className="text-4xl font-bold mt-2 mb-4 text-gray-900">
        {humidity}
        <span className="text-gray-500 text-lg ml-1">%</span>
      </div>

      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-4 rounded-full transition-all duration-700 ease-in-out"
          style={{
            width: `${barWidth}%`,
            background: `linear-gradient(to right, #cfeffd, ${getColor(
              humidity
            )})`,
          }}
        ></div>
      </div>

      <p className="text-sm text-gray-600 mt-3 italic">
        {humidity < 30
          ? "🌵 Air feels dry — may cause discomfort."
          : humidity < 60
          ? "😊 Ideal comfort zone."
          : humidity < 80
          ? "🌦 Slightly muggy air."
          : "💦 Very humid — possible rain or sticky feeling."}
      </p>
    </div>
  );
}
