export default function ButtonsMap({ activeLayers, toggleLayer }) {
    return (
        <div
            className="absolute top-2 right-2 flex flex-col gap-1 bg-white/90 p-2 rounded-xl shadow-md"
            style={{ zIndex: 1000 }}
        >
            {[
                { key: "temperature", icon: "🌡", color: "bg-red-500" },
                { key: "precipitation", icon: "🌧", color: "bg-blue-500" },
                { key: "clouds", icon: "☁", color: "bg-gray-600" },
            ].map((btn) => (
                <label key={btn.key}>
                    <input
                        type="radio"
                        name="layer"
                        checked={activeLayers[btn.key]}
                        onChange={() => toggleLayer(btn.key)}
                        className="hidden"
                    />
                    <span
                        className={`px-2 py-2 rounded-lg font-semibold block text-center ${activeLayers[btn.key] ? `${btn.color} text-white` : "bg-gray-200"
                            }`}
                    >
                        {btn.icon}
                    </span>
                </label>
            ))}
        </div>
    );
}
