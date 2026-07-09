export function addMinutes(minutes: number): Date {
  const date = new Date();

  date.setMinutes(date.getMinutes() + minutes);

  return date;
}