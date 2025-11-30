export const getVisibilityText = (visibility) => {
    if (visibility < 1) return "Very low";
    else if (visibility < 5) return "Low";
    else if (visibility < 10) return "Moderate";
    else return "Good";
  };
