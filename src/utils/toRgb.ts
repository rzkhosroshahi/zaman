export const toRgba = (RGB, opacity = 1) => {
  return (
    "rgba(" +
    parseInt(RGB.substring(1, 3), 16) +
    "," +
    parseInt(RGB.substring(3, 5), 16) +
    "," +
    parseInt(RGB.substring(5, 7), 16) +
    "," +
    opacity +
    ")"
  );
};
