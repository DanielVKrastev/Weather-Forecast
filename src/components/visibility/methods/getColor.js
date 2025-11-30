export const getColor = (visibility) => {
    if (visibility < 1) return "#E74C3C"; // 🔴
    else if (visibility < 5) return "#E67E22"; // 🟠
    else if (visibility < 10) return "#F1C40F"; // 🟡
    else return "#2ECC71"; // 🟢
  };