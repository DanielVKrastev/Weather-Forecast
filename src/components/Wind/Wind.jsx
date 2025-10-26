import { ArrowUp } from "lucide-react";

export default function Wind({ wind, airPollution }) {
    const msTokmh = 3.6;
    const speedKMH = (wind.speed * msTokmh).toFixed(1);
    const gusts = wind.gust ? (wind.gust * msTokmh).toFixed(1) : null;
    const airQuality = airPollution?.list?.[0]?.main?.aqi || 0;
    const direction = wind.deg || 0;

    const getColor = (aqi) => {
        switch (aqi) {
            case 1: return "#2ECC71"; // 🟢 Good
            case 2: return "#F1C40F"; // 🟡 Fair
            case 3: return "#E67E22"; // 🟠 Moderate
            case 4: return "#E74C3C"; // 🔴 Poor
            case 5: return "#8E44AD"; // 🟣 Very Poor
            default: return "#BDC3C7"; // gray
        }
    };

    const getAirQualityText = (aqi) => {
        switch (aqi) {
            case 1: return "Good";
            case 2: return "Fair";
            case 3: return "Moderate";
            case 4: return "Poor";
            case 5: return "Very Poor";
            default: return "No data";
        }
    };

    const color = getColor(airQuality);
    const text = getAirQualityText(airQuality);

    return (
        <div className="border rounded-2xl p-6 bg-gradient-to-br from-white to-gray-50 text-gray-800 m-2 shadow-md hover:shadow-lg transition-all duration-500 h-full">
            <h3 className="font-semibold text-lg mb-3 flex justify-between items-center">
                Wind
                <span
                    className="text-xs px-2 py-1 rounded-full text-white font-semibold"
                    style={{ backgroundColor: color }}
                >
                    {text}
                </span>
            </h3>

            <div className="flex flex-col items-center">
                {/* Icon rotation */}
                <div className="relative mb-3">
                    <ArrowUp
                        size={40}
                        style={{
                            transform: `rotate(${direction}deg)`,
                            transition: "transform 0.8s ease",
                            color: color,
                        }}
                    />
                    <p className="text-xs text-gray-500 text-center mt-1">
                        {direction}°
                    </p>
                </div>

                {/* Speeds */}
                <div className="text-center mb-3">
                    <p className="text-3xl font-bold" style={{ color }}>
                        {speedKMH} km/h
                    </p>
                    <p className="text-sm text-gray-600">
                        Gusts: {gusts ? `${gusts} km/h` : "No data"}
                    </p>
                </div>

                {/* Air Quality Bar */}
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mt-2">
                    <div
                        className="h-3 rounded-full transition-all duration-700"
                        style={{
                            width: `${(airQuality / 5) * 100}%`,
                            background: `linear-gradient(to right, #60A5FA, #22D3EE, #34D399, #10B981)`, // blue → cyan → green
                            boxShadow: "0 0 8px rgba(34,211,238,0.5)",
                        }}
                    ></div>
                </div>

                <div className="flex justify-between w-full text-xs text-gray-500 mt-1">
                    <span>Good</span>
                    <span>Fair</span>
                    <span>Moderate</span>
                    <span>Poor</span>
                    <span>V.Poor</span>
                </div>
            </div>
        </div>
    );
}
