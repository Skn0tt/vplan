export const localiseDate = (date: Date) =>
  date.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
