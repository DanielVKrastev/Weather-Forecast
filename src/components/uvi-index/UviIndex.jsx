import { getUVLevel } from "./methods/getUVLevel";

export default function UVIndex({ uviIndex }) {
  const uvi = uviIndex?.value ?? 0;

  const level = getUVLevel(uvi);

  return (
    <div className="border rounded-2xl p-5 bg-gradient-to-br from-white to-gray-50 text-gray-800 shadow-md hover:shadow-lg transition-all duration-500 m-1 h-full">
      {/* Title */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
            UV Index
        </h3>
        <span
          className="px-2 py-1 text-xs font-semibold rounded-full text-white"
          style={{ backgroundColor: level.color }}
        >
          {level.text}
        </span>
      </div>

      {/* Value */}
      <div className="flex flex-col items-center mb-3">
        <div
          className="text-5xl font-bold transition-colors duration-500"
          style={{ color: level.color }}
        >
          {uvi.toFixed(1)}
        </div>
        <p className="text-sm text-gray-600 mt-1 italic">
          {level.emoji} {level.text} UV exposure
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-3">
        <div
          className="h-4 rounded-full transition-all duration-700 ease-in-out"
          style={{
            width: `${Math.min((uvi / 11) * 100, 100)}%`,
            background:
              "linear-gradient(to right, #2ECC71, #F1C40F, #E67E22, #E74C3C, #8E44AD)",
          }}
        ></div>
      </div>

      {/* Scale labels */}
      <div className="flex justify-between text-xs text-gray-600">
        <span>0</span>
        <span>3</span>
        <span>6</span>
        <span>8</span>
        <span>11+</span>
      </div>

      {/* Advice */}
      <div className="mt-4 text-sm text-gray-700">
        {uvi < 3 && "🕶 No protection needed."}
        {uvi >= 3 && uvi < 6 && "🧴 Use sunscreen & wear sunglasses."}
        {uvi >= 6 && uvi < 8 && "⛱ Seek shade during midday."}
        {uvi >= 8 && uvi < 11 && "🚫 Avoid direct sun — cover exposed skin."}
        {uvi >= 11 && "☠️ Extreme risk! Stay indoors if possible."}
      </div>
    </div>
  );
}
