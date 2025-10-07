export default function Wind({
    wind,
    airPollution
}) {
    const msTokmh = 3.6;
    const speedKMH = (wind.speed * msTokmh).toFixed(2);
    const gusts = (wind.gust * msTokmh).toFixed(2);
    const airQuality = airPollution.list[0].main.aqi;

    const getColor = (airQuality) => {
        switch (airQuality) {
            case 1: return '#2ECC71'; // 🟢
            case 2: return '#F1C40F'; // 🟡
            case 3: return '#E67E22'; // 🟠
            case 4: return '#E74C3C'; // 🔴
            case 5: return '#8E44AD'; // 🟣
            default: return '#BDC3C7';
        }
    };

    const getAirQualityText = (airQuality) => {
        switch (airQuality) {
            case 1: return 'Good'; 
            case 2: return 'Fair'; 
            case 3: return 'Moderate'; 
            case 4: return 'Poor';
            case 5: return 'Very Poor';
            default: return 'No data';
        }
    };

    return (
        <div
            className="border rounded-2xl p-5 bg-white text-gray-800 m-1"
        >
            <div>
                <div className="font-semibold">Wind</div>
                <div className="text-center">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <tbody className="bg-white border-b border-gray-200">
                            <tr className="bg-white border-b border-gray-200">
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Speed</td>
                                <td>{speedKMH} km/h</td>
                            </tr>
                            <tr className="bg-white border-b border-gray-200">
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Wind Gusts</td>
                                <td>{gusts === 'NaN' ? 'No data' : `${gusts} km/h`}</td>
                            </tr>
                            <tr className="bg-white border-b border-gray-200">
                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">Air Quality</td>
                                <td className='h-3' style={{ color: getColor(airQuality) }}>
                                    {getAirQualityText(airQuality)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
