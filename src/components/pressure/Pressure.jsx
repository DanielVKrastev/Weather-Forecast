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

    return (<>
        <div className="border rounded-2xl p-6 bg-white text-gray-800 m-2 shadow-md ">
            <h3 className="font-semibold text-lg mb-2">Atmospheric Pressure</h3>
            <div className="flex flex-col items-center justify-center">

                <div className="relative w-48 h-24 flex items-end justify-center">
                    <svg viewBox="0 0 100 50" className="w-full h-full">
                        {/* background */}
                        <path
                            d="M10,50 A40,40 0 0,1 90,50"
                            stroke="#e5e7eb"
                            strokeWidth="10"
                            fill="none"
                        />
                        {/* active */}
                        <path
                            d="M10,50 A40,40 0 0,1 90,50"
                            stroke={getColor(pressure)}
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray="126"
                            strokeDashoffset={126 - 126 * percent}
                            strokeLinecap="round"
                            style={{
                                transition: "stroke-dashoffset 1s ease, stroke 0.5s ease",
                            }}
                        />
                    </svg>

                    {/* Text center */}
                    <div className="absolute bottom-2 text-center">
                        <p className="text-xl font-bold" style={{ color: getColor(pressure) }}>
                            {pressure} hPa
                        </p>
                        <p className="text-sm text-gray-600">{getPressureText(pressure)}</p>
                    </div>
                </div>

                <div className="flex justify-between w-48 text-xs text-gray-500 mt-2">
                    <span>950</span>
                    <span>1000</span>
                    <span>1050</span>
                </div>
            </div>
        </div>

    </>
    );
}
