export const calculateDays = (startDate: string, endDate: string): number => {
  // To set two dates to two variables
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  // To calculate the time difference of two dates
  const differenceInTime = date2.getTime() - date1.getTime();

  // return final no. of days (result)
  return differenceInTime / (1000 * 3600 * 24) + 1
}