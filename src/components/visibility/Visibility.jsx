export default function Visibility({ 
    weather 
}) {
    const visibilityKM = (weather.visibility / 1000).toFixed(1);

    const getColor = (visibility) => {
        if (visibility < 1) return '#E74C3C'; // 🔴
        else if (visibility < 5) return '#E67E22'; // 🟠
        else if (visibility < 10) return '#F1C40F'; // 🟡
        else return '#2ECC71'; // 🟢
    };

    const getVisibilityText = (visibility) => {
        if (visibility < 1) return "Very low";
        else if (visibility < 5) return "Low";
        else if (visibility < 10) return "Moderate";
        else return "Good";
    };

    return (
        <div className="border rounded-2xl p-5 bg-white text-gray-800 m-1 h-full">
            <div>
                <div className="font-semibold">Visibility</div>
                <div className="text-left">
                    <p className="text-sm text-gray-600">
                        Condition: <span className="font-bold" style={{ color: getColor(visibilityKM) }}>{getVisibilityText(visibilityKM)}</span>
                    </p>
                    <div className="text-xl font-bold mt-3 mb-3">{visibilityKM} km</div>
                    <div className="w-full h-4 mb-4 bg-gray-200 rounded-full">
                        <div 
                            className="h-4 animate-gradient-x bg-gradient-to-r from-green-200 via-green-300 to-green-400 rounded-full" 
                            style={{ width: `${Math.min(visibilityKM * 10, 100)}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
