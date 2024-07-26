const convertDateFormat = (date: string) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;

  return [year, month].join('-');
}

export default {
  convertDateFormat,
}