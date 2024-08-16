import { InputType } from '../../features/CreateYourCV/Skills/types';
import { DateFormatEnum } from '../enums/date';
/**
 * 
 * @param date 日期
 * @returns 轉換日期 YYYY-MM-DD
 */
const convertDateFormat = (date: string, format: DateFormatEnum) => {
  let d = new Date(date),
    day = '' + d.getDate(),
    month = '' + (d.getMonth() + 1),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;

  if (format === DateFormatEnum.YYYYMM) return [year, month].join('-');
  return [year, month, day].join('-'); 
}

/**
 * @description 將 HTML 字串轉譯成真實的 DOM
 */
const convertInnerHTMLToDoc = (innerHTML: string) => {
  /** 創建一個臨時的 DOM 元素来解析 HTML 字符串 */
  const parser = new DOMParser();
  return parser.parseFromString(innerHTML, 'text/html');
}

/**
 * @description 檢查驗證成功或失敗的頁面
 * @param cache - 儲存頁面的快取數據
 * @param checkValid - 檢查驗證成功或失敗的標誌，為 true 時檢查成功的頁面，為 false 時檢查失敗的頁面
 * @returns 檢查結果的頁面列表
 */
const handleCheckTemplatePage = (cache: any, checkValid: boolean) => {
  const pages: string[] = [];

  Object.entries(cache).forEach(([key, value]: any) => {
    if (!Array.isArray(value)) {
      /** 若是 GeneralInfo */
      const { errors } = value;
      /** 若驗證成功或失敗 */
      const isValid = !errors || (errors && errors.length === 0);
      if (checkValid ? isValid : !isValid) pages.push(key);
    } else {
      /** 若是 Work History */
      /** 檢查其中 errors 是否含有錯誤欄位 */
      const isContainError = value.some(elem => elem.errors && elem.errors.length !== 0);
      if (checkValid ? !isContainError : isContainError) pages.push(key);
    }
  });

  return pages;
};

/**
 * @description 處理 Skills 的資料
 */
const handleAddressSkillsData = (skills: any) => {
  const result: InputType[] = [];
  Object.entries(skills).forEach((item: any) => {
    const [key, value] = item;
    /** 取得 id */
    const [input, id] = key.split('_');

    let entry = result.find(obj => obj.id === id);
    if (!entry) {
      /** 若不存在，則 push 一筆資料 */
      entry = { id, input: '', rate: 0 };
      result.push(entry);
    }
    entry[input] = value;
  })
  return result;
}

/**
 * @description
 */
function throttle<T extends (...args: any[]) => void>(fn: T, delay = 300) {
  let timer: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>): void => {
    if (timer) return;

    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
}

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
}

const groupData = (array: any[], elem: any) => {
  const groupedJobs = array.reduce((acc, job) => {
    const jobType = job[elem];
  
    if (!acc[jobType]) acc[jobType] = [];
  
    acc[jobType].push(job);
  
    return acc;
  }, {});

  return groupedJobs
}

/**
 * 將字符串轉換为缩寫
 * @param {string} str - 需要轉換的字符串
 * @returns {string} - 转换后的缩写
 */
const toAbbreviation = (str: string) => {
  // 将字符串按空格拆分成单词数组
  const words = str.split(' ');

  // 提取每个单词的首字母并转换为大写
  const abbreviation = words.map(word => word.charAt(0).toUpperCase()).join('');

  return abbreviation;
}

export default {
  convertDateFormat,
  convertInnerHTMLToDoc,
  handleCheckTemplatePage,
  handleAddressSkillsData,
  throttle,
  formatCurrency,
  groupData,
  toAbbreviation
}