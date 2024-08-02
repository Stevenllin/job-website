/**
 * 
 * @param date 日期
 * @returns 轉換日期 YYYY-MM-DD
 */
const convertDateFormat = (date: string) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;

  return [year, month].join('-');
}

const convertInnerHTMLToDoc = (innerHTML: string) => {
  /** 創建一個臨時的 DOM 元素来解析 HTML 字符串 */
  const parser = new DOMParser();
  return parser.parseFromString(innerHTML, 'text/html');
}

export default {
  convertDateFormat,
  convertInnerHTMLToDoc,
}