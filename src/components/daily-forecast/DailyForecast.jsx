import ScrollContainer from "react-indiana-drag-scroll";

export default function DailyForecast({
    dailyForecast
}) {

    const dailyForecastList = dailyForecast.list;

    console.log(dailyForecastList);

    return (
        <ScrollContainer className="grid grid-cols-1 grid-flow-row border p-4 overflow-x-auto h-96">
            <div
                className="border rounded-2xl p-1 text-center bg-white text-gray-800 w-full h-16 m-1"
            >
                <div>
                    <div className="font-semibold">Sat</div>
                    <div className="text-lg">Rain</div>
                    <div className="text-sm">Min: 4</div>
                </div>

            </div>
            <div
                className="border rounded-2xl p-1 text-center bg-white text-gray-800 w-full h-16 m-1"
            >
                <div>
                    <div className="font-semibold">Sat</div>
                    <div className="text-lg">Rain</div>
                    <div className="text-sm">Min: 4</div>
                </div>

            </div>
            <div
                className="border rounded-2xl p-1 text-center bg-white text-gray-800 w-full h-16 m-1"
            >
                <div>
                    <div className="font-semibold">Sat</div>
                    <div className="text-lg">Rain</div>
                    <div className="text-sm">Min: 4</div>
                </div>

            </div>
            <div
                className="border rounded-2xl p-1 text-center bg-white text-gray-800 w-full h-16 m-1"
            >
                <div>
                    <div className="font-semibold">Sat</div>
                    <div className="text-lg">Rain</div>
                    <div className="text-sm">Min: 4</div>
                </div>

            </div>

            <div
                className="border rounded-2xl p-1 text-center bg-white text-gray-800 w-full h-16 m-1"
            >
                <div>
                    <div className="font-semibold">Sat</div>
                    <div className="text-lg">Rain</div>
                    <div className="text-sm">Min: 4</div>
                </div>

            </div>

            <div
                className="border rounded-2xl p-1 text-center bg-white text-gray-800 w-full h-16 m-1"
            >
                <div>
                    <div className="font-semibold">Sat</div>
                    <div className="text-lg">Rain</div>
                    <div className="text-sm">Min: 4</div>
                </div>

            </div>

            <div
                className="border rounded-2xl p-1 text-center bg-white text-gray-800 w-full h-16 m-1"
            >
                <div>
                    <div className="font-semibold">Sat</div>
                    <div className="text-lg">Rain</div>
                    <div className="text-sm">Min: 4</div>
                </div>



            </div>

            <div
                className="border rounded-2xl p-1 text-center bg-white text-gray-800 w-full h-16 m-1"
            >
                <div>
                    <div className="font-semibold">Sat</div>
                    <div className="text-lg">Rain</div>
                    <div className="text-sm">Min: 4</div>
                </div>



            </div>

            <div
                className="border rounded-2xl p-1 text-center bg-white text-gray-800 w-full h-16 m-1"
            >
                <div>
                    <div className="font-semibold">Sat</div>
                    <div className="text-lg">Rain</div>
                    <div className="text-sm">Min: 4</div>
                </div>

            </div>

                        <div
                className="border rounded-2xl p-1 text-center bg-white text-gray-800 w-full h-16 m-1"
            >
                <div>
                    <div className="font-semibold">Sat</div>
                    <div className="text-lg">Rain</div>
                    <div className="text-sm">Min: 4</div>
                </div>

            </div>
        </ScrollContainer>
    );
}
