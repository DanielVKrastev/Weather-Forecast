export default function SunriseSunset({
    weather
}) {
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
        <div
            className="rounded-2xl p-4 bg-white text-gray-800 m-1 h-full"
        >
                <table className="w-full h-full text-center text-gray-500">
                    <tbody>
                        <tr>
                            <td colSpan={2} className="border-r border-gray-200"><img src="./icons/sunrise.png" alt="sunrise" className="h-auto min-h-[60px] max-h-[100px] mx-auto"/></td>
                            <td colSpan={2}><img src="./icons/sunset.png" alt="sunset" className="h-auto min-h-[60px] max-h-[100px] mx-auto"/></td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2 font-ligh">Sunrise</td>
                            <td className="px-4 py-2 font-bold border-r border-gray-200">{sunriseTime}</td>
                            <td className="px-4 py-2 font-light">Sunset</td>
                            <td className="px-4 py-2 font-bold">{sunsetTime}</td>
                        </tr>
                    </tbody>
                </table>

        </div>
    );
}
