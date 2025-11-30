export const getDate = (dt) =>
    new Date(dt * 1000).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
    });