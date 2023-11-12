const normalizeDateParts = (value: number) => (value < 10 ? `0${value}` : value);

export const getCurrentDateTime = () => {
  const date = new Date();

  const currentMonth = date.getMonth() + 1;
  const monthPart = normalizeDateParts(currentMonth);

  const currentDate = date.getDate();
  const datePart = normalizeDateParts(currentDate);

  const currentHours = date.getHours();
  const hoursPart = normalizeDateParts(currentHours);

  const currentMinutes = date.getMinutes();
  const minutesPart = normalizeDateParts(currentMinutes);

  return `${date.getFullYear()}-${monthPart}-${datePart}T${hoursPart}:${minutesPart}`;
};
