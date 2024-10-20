const WEEKDAYS = ['Su', 'Mo', 'Tue', 'We', 'Th', 'Fr', 'Sa'];

export function dayToWeekday(day: number): string {
  return WEEKDAYS[day];
}

export function msToHours(ms: number): number {
  return Math.round((ms * 100) / 1000 / 60 / 60) / 100;
}

export function daysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}
