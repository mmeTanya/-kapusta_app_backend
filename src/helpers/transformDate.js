const transformDate = (year, month) => {
  let date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth =
    date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1;
  if (year && month) {
    if (month < 10) month = '0' + Number(month);
    date = year + '-' + month + '-' + '01';
  } else if (year && !month) {
    date = year + '-' + currentMonth + '-' + '01';
  } else if (!year && month) {
    if (month < 10) month = '0' + Number(month);
    date = currentYear + '-' + month + '-' + '01';
  } else {
    date = null;
  }
  return date;
};

module.exports = transformDate;
