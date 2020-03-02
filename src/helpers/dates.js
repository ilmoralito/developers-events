import { TODAY, CURRENT_WEEK, CURRENT_MONTH } from "../constants/periods";

const months = {
  "01": "ENE",
  "02": "FEB",
  "03": "MAR",
  "04": "ABR",
  "05": "MAY",
  "06": "JUN",
  "07": "JUL",
  "08": "AGO",
  "09": "SEP",
  "10": "OCT",
  "11": "NOV",
  "12": "DIC"
};

const getDayAndMonth = date => {
  const [, month, day] = date.split("-");

  return [day, months[month]];
};

const getBorderDates = period => {
  const currentDate = new Date();
  let from = undefined;
  let until = undefined;

  if (period === TODAY) {
    const today = new Date();

    from = new Date(today.setHours(0, 0, 0, 0));
    until = new Date(today.setHours(24, 0, 0, 0));
  }

  if (period === CURRENT_WEEK) {
    const first = currentDate.getDate() - currentDate.getDay();
    const last = first + 6;

    from = new Date(currentDate.setDate(first));
    until = new Date(currentDate.setDate(last));
  }

  if (period === CURRENT_MONTH) {
    from = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    until = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  }

  return [from, until];
};

const getToday = () => new Date().toISOString().split("T")[0];

const isDateInPeriod = ({ date, period }) => {
  const [from, until] = getBorderDates(period);
  const timestamp = new Date(date).getTime();

  return timestamp >= from.getTime() && timestamp <= until.getTime();
};

export { getDayAndMonth, getToday, isDateInPeriod };
