export  const getDayName = (dt) =>
    new Date(dt * 1000).toLocaleDateString("en-GB", { weekday: "short" });