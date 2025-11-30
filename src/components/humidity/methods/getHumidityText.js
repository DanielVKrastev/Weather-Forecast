export const getHumidityText = (humidityPercent) => {
    if (humidityPercent < 30) return "Dry air";
    else if (humidityPercent < 60) return "Comfortable";
    else if (humidityPercent < 80) return "Humid";
    else return "Very humid";
  };