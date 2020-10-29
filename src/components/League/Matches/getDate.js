import { weekDays } from '../../../static/weekDays';

const getDate = (date, time) => {
  const d = new Date(Number(date));
  let year = d.getFullYear() % 100;
  let month = d.getMonth();
  if (year.toString().length < 2) {
    year = `0${year}`;
  }
  if (month.toString().length < 2) {
    month = `0${month}`;
  }
  let dateOutput = `${weekDays[d.getDay()]}, ${d.getDate()}/${month}/${year}`;
  if (time) {
    d.setTime(Date.parse(`01 Jan 1970 ${time} GMT`));
    dateOutput += ` at ${d.getHours()}:${d.getMinutes()} IST`;
  }
  return dateOutput;
};

export default getDate;
