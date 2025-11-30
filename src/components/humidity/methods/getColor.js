export const getColor = (humidityPercent) => {
    if (humidityPercent < 30) return "#F1C40F"; // 🟡
    else if (humidityPercent < 60) return "#2ECC71"; // 🟢
    else if (humidityPercent < 80) return "#3B82F6"; // 🔵
    else return "#1E3A8A"; // 🟣
};