import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween';

export const checkIfTheDateIsBetween = (absenceStartDate: string, absenceEndDate: string, startDate: any, endDate: any): boolean => {
  dayjs.extend(isBetween);

  const checkingStartDate = dayjs(absenceStartDate).isBetween(startDate.subtract(1, 'day'), endDate.add(1, 'day'));
  const checkingEndDate = dayjs(absenceEndDate).isBetween(startDate.subtract(1, 'day'), endDate.add(1, 'day'));

  return checkingStartDate || checkingEndDate;
}