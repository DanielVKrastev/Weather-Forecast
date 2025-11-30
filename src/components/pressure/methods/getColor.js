export const getColor = (pressureValue) => {
    if (pressureValue < 1000) return "#3B82F6"; // blue
    else if (pressureValue < 1015) return "#10B981"; // green
    else if (pressureValue < 1030) return "#FBBF24"; // yellow
    else return "#EF4444"; // red
  };