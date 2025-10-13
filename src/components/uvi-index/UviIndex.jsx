export default function UVIndex({ uviIndex }) {
    const uvi = uviIndex.value;
    const getUVLevel = (value) => {
        if (value < 3) return { text: "Low", color: "#2ECC71" }; // green
        if (value < 6) return { text: "Moderate", color: "#F1C40F" }; // yellow
        if (value < 8) return { text: "High", color: "#E67E22" }; // orange
        if (value < 11) return { text: "Very High", color: "#E74C3C" }; // red
        return { text: "Extreme", color: "#8E44AD" }; // purple
    };

    const level = getUVLevel(uvi);

    return (
        <div className="border rounded-2xl p-5 bg-white text-gray-800 m-1 shadow-md">
            <h2 className="font-semibold text-lg mb-2">UV Index</h2>

            {/* Value and descrp */}
            <div className="flex items-baseline justify-between mb-2">
                <span className="text-3xl font-bold" style={{ color: level.color }}>
                    {uvi.toFixed(1)}
                </span>
                <span className="text-md font-semibold" style={{ color: level.color }}>
                    {level.text}
                </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div
                    className="h-3 rounded-full transition-all duration-500"
                    style={{
                        width: `${Math.min((uvi / 11) * 100, 100)}%`,
                        background: `linear-gradient(to right, #2ECC71, #F1C40F, #E67E22, #E74C3C, #8E44AD)`,
                    }}
                ></div>
            </div>

            <div className="flex justify-between text-xs text-gray-600">
                <span>0</span>
                <span>3</span>
                <span>6</span>
                <span>8</span>
                <span>11+</span>
            </div>
        </div>
    );
}
