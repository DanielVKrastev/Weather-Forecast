export default function Humidity({
    weather
}) {
    const humidity = weather.main.humidity;
    
    const getColor = (humidityPercent) => {
        if (humidityPercent < 30) return '#F1C40F'; // 🟡
        else if (humidityPercent < 60) return '#2ECC71'; // 🟢
        else if (humidityPercent < 80) return '#3b82f6'; // 🔵
        else if (humidityPercent <= 100) return '#1e3a8a'; // 🔵
        else return '#737373';
    };

    const getHumidityText = (humidityPercent) => {
        if (humidityPercent < 30) return "Dry air";
        else if (humidityPercent < 60) return "Comfortable";
        else if (humidityPercent < 80) return "Humid";
        else if (humidityPercent <= 100) return "Very humid";
        else return "No data";
    };


    return (
        <div
            className="border rounded-2xl p-5 bg-white text-gray-800 m-1 h-full"
        >
            <div>
                <div className="font-semibold">Humidity</div>
                <div className="text-left">
                    <p className="text-sm text-gray-600">
                        Feels: <span className="font-bold" style={{ color: getColor(humidity) }}>{getHumidityText(humidity)}</span>
                    </p>
                    <div className="text-xl font-bold mt-3 mb-3">{humidity}%</div>
                    <div className="w-full h-4 mb-4 bg-gray-200 rounded-full">
                        <div className="h-4 animate-gradient-x bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400 rounded-full" style={{ width: "50%" }}></div>
                    </div>
                </div>

            </div>
        </div>
    );
}
