import { Sun, Sunrise, Sunset } from "lucide-react";

export default function SunriseSunset({ weather }) {
    const sunrise = weather.sys.sunrise;
    const sunset = weather.sys.sunset;

    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString("bg-BG", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString("bg-BG", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className="border rounded-2xl p-5 bg-gradient-to-br from-white to-gray-50 text-gray-800 shadow-md hover:shadow-lg transition-all duration-500 m-1 h-full">
            <h3 className="font-semibold text-lg mb-4 text-center">
                Sunrise & Sunset
            </h3>

            <div className="flex justify-around items-center">
                {/* Sunrise */}
                <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-t from-orange-200 to-yellow-300 rounded-full p-4 shadow-inner shadow-yellow-400">
                        <Sunrise className="w-10 h-10 text-amber-600" />
                    </div>
                    <div className="mt-2 text-sm text-gray-500">Sunrise</div>
                    <div className="text-lg font-semibold text-gray-800">{sunriseTime}</div>
                </div>

                {/* Divider */}
                <div className="h-16 w-px bg-gray-300 mx-2"></div>

                {/* Sunset */}
                <div className="flex flex-col items-center">
                    <div className="bg-gradient-to-t from-rose-200 to-orange-200 rounded-full p-4 shadow-inner shadow-orange-400">
                        <Sunset className="w-10 h-10 text-orange-700" />
                    </div>
                    <div className="mt-2 text-sm text-gray-500">Sunset</div>
                    <div className="text-lg font-semibold text-gray-800">{sunsetTime}</div>
                </div>
            </div>
        </div>
    );
}
