export const selectVideo = (weather, weatherMain, weatherDescription) => {
        if (!weatherMain) return "/videos/sunny.mp4";

        const main = weatherMain.toLowerCase();
        const description = weatherDescription.toLowerCase();

        const sunriseTime = new Date(weather.sys.sunrise * 1000);
        const sunsetTime = new Date(weather.sys.sunset * 1000);
        const hourTime = new Date(weather.dt * 1000);

        // get only hours
        const sunriseHour = sunriseTime.getHours();
        const sunsetHour = sunsetTime.getHours();
        const hours = hourTime.getHours();

        // check is night
        const isNight = hours < sunriseHour || hours >= sunsetHour;

        const dayVideos = {
            clear: "/videos/sunny.mp4",
            drizzle: "/videos/water-drops-rain.mp4",
            snow: "/videos/snow-snowing.mp4",
            fog: "/videos/fog.mp4",
            thunderstorm: "/videos/thunders-storm-lighting.mp4",
            rain:
                description.includes("light") || description.includes("moderate")
                    ? "/videos/rain-slow.mp4"
                    : "/videos/water-drops-rain.mp4",
            clouds:
                description.includes("few") || description.includes("scattered")
                    ? "/videos/few-clouds.mp4"
                    : "/videos/dark-clouds.mp4",
        };

        const nightVideos = {
            clear: "/videos/clear-night-sky.mp4",
            drizzle: "/videos/water-drops-rain.mp4",
            snow: "/videos/snow-snowing.mp4",
            fog: "/videos/fog.mp4",
            thunderstorm: "/videos/thunders-storm-lighting.mp4",
            rain: "/videos/rain-night.mp4",
            clouds: "/videos/cloud-night-forest.mp4",
        };

        return isNight
            ? nightVideos[main] || "/videos/clear-night-sky.mp4"
            : dayVideos[main] || "/videos/sunny.mp4";
    };