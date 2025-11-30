export const getPressureText = (pressureValue) => {
    if (pressureValue < 1000) return "Low pressure";
    else if (pressureValue < 1015) return "Normal";
    else if (pressureValue < 1030) return "High";
    else return "Very high";
  };