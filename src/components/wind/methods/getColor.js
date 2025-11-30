export const getColor = (aqi) => {
        switch (aqi) {
            case 1: return "#2ECC71"; // 🟢 Good
            case 2: return "#F1C40F"; // 🟡 Fair
            case 3: return "#E67E22"; // 🟠 Moderate
            case 4: return "#E74C3C"; // 🔴 Poor
            case 5: return "#8E44AD"; // 🟣 Very Poor
            default: return "#BDC3C7"; // gray
        }
    };