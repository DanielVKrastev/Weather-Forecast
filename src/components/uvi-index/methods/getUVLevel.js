export const getUVLevel = (value) => {
    if (value < 3) return { text: "Low", color: "#2ECC71", emoji: "🟢" };
    if (value < 6) return { text: "Moderate", color: "#F1C40F", emoji: "🟡" };
    if (value < 8) return { text: "High", color: "#E67E22", emoji: "🟠" };
    if (value < 11) return { text: "Very High", color: "#E74C3C", emoji: "🔴" };
    return { text: "Extreme", color: "#8E44AD", emoji: "🟣" };
  };