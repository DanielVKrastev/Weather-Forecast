export default function Visibility({ weather }) {
  const visibilityKM = (weather.visibility / 1000).toFixed(1);

  const getColor = (visibility) => {
    if (visibility < 1) return "#E74C3C"; // 🔴
    else if (visibility < 5) return "#E67E22"; // 🟠
    else if (visibility < 10) return "#F1C40F"; // 🟡
    else return "#2ECC71"; // 🟢
  };

  const getVisibilityText = (visibility) => {
    if (visibility < 1) return "Very low";
    else if (visibility < 5) return "Low";
    else if (visibility < 10) return "Moderate";
    else return "Good";
  };

  return (
    <div className="border rounded-2xl p-5 bg-gradient-to-br from-white to-gray-50 text-gray-800 shadow-md hover:shadow-lg transition-all duration-500 m-1 h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
        Visibility
        </h3>
        <span
          className="px-2 py-1 text-xs font-semibold rounded-full text-white"
          style={{ backgroundColor: getColor(visibilityKM) }}
        >
          {getVisibilityText(visibilityKM)}
        </span>
      </div>

      <div className="text-4xl font-bold mt-2 mb-4 text-gray-900">
        {visibilityKM}
        <span className="text-gray-500 text-lg ml-1">km</span>
      </div>

      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-4 rounded-full transition-all duration-700 ease-in-out"
          style={{
            width: `${Math.min(visibilityKM * 10, 100)}%`,
            background: `linear-gradient(to right, #d1fae5, ${getColor(
              visibilityKM
            )})`,
          }}
        ></div>
      </div>

      <p className="text-sm text-gray-600 mt-3 italic">
        {visibilityKM < 1
          ? "⚠ Very limited — fog or heavy rain likely."
          : visibilityKM < 5
          ? "🌫 Hazy conditions — reduced clarity."
          : visibilityKM < 10
          ? "🌥 Clear but slightly hazy."
          : "☀ Excellent visibility — perfect day!"}
      </p>
    </div>
  );
}
