import { useEffect, useState } from "react";

export default function PressureGauge({ weather }) {
  const [pressure, setPressure] = useState(weather.main?.pressure || 1013);

  useEffect(() => {
    if (weather.main?.pressure) {
      setPressure(weather.main.pressure);
    }
  }, [weather]);

  const min = 950;
  const max = 1050;
  const percent = Math.min(Math.max((pressure - min) / (max - min), 0), 1);

  const getColor = (pressureValue) => {
    if (pressureValue < 1000) return "#3B82F6"; // blue
    else if (pressureValue < 1015) return "#10B981"; // green
    else if (pressureValue < 1030) return "#FBBF24"; // yellow
    else return "#EF4444"; // red
  };

  const getPressureText = (pressureValue) => {
    if (pressureValue < 1000) return "Low pressure";
    else if (pressureValue < 1015) return "Normal";
    else if (pressureValue < 1030) return "High";
    else return "Very high";
  };

  const color = getColor(pressure);

  return (
    <div className="border rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50 text-gray-800 m-1 shadow-md hover:shadow-lg transition-all duration-500 h-full">
      <h3 className="font-semibold text-lg mb-2 flex items-center justify-between">
        Atmospheric Pressure
        <span
          className="text-xs px-2 py-1 rounded-full text-white font-semibold"
          style={{ backgroundColor: color }}
        >
          {getPressureText(pressure)}
        </span>
      </h3>

      <div className="flex flex-col items-center justify-center mt-6">
        {/* Gauge */}
        <div className="relative w-48 h-24 flex items-end justify-center">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            {/* Background arc */}
            <path
              d="M10,50 A40,40 0 0,1 90,50"
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="none"
            />
            {/* Active arc */}
            <path
              d="M10,50 A40,40 0 0,1 90,50"
              stroke={color}
              strokeWidth="10"
              fill="none"
              strokeDasharray="126"
              strokeDashoffset={126 - 126 * percent}
              strokeLinecap="round"
              style={{
                transition:
                  "stroke-dashoffset 1s ease-out, stroke 0.5s ease, filter 0.3s ease",
                filter: `drop-shadow(0 0 6px ${color}50)`,
              }}
            />
          </svg>

          {/* Center text */}
          <div className="absolute bottom-2 text-center">
            <p className="text-2xl font-bold" style={{ color }}>
              {pressure} hPa
            </p>
            <p className="text-sm text-gray-600">
              {getPressureText(pressure)}
            </p>
          </div>
        </div>

        {/* Scale */}
        <div className="flex justify-between w-48 text-xs text-gray-500 mt-2">
          <span>950</span>
          <span>1000</span>
          <span>1050</span>
        </div>
      </div>
    </div>
  );
}
