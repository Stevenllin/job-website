import { InputType } from '../../features/CreateYourCV/Skills/types';
import { DateFormatEnum } from '../enums/date';
import Typo from 'typo-js';
import { TemplateSideEnum } from '../enums/template';
import { Style } from '../models/style';
import { ColorNameEnum } from '../enums/color';
import { ColorMappingDefines } from '../models/color';
import { FontSizeEnum } from '../enums/font';
import { ProcessStepTextEnum } from '../../features/CreateYourCV/types';
import { SpellingResult } from '../../features/CreateYourCV/Finalize/types';

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

/**
 * 
 * @param amount 目標數字
 * @returns 回傳金額格式
 */
const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  });
}

/**
 * 
 * @param array 目標陣列
 * @param elem 目標整合的參數
 * @returns 
 */
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

/**
 * @description 根據 HTML 取得內容純文字
 * @param textContent 是目標步驟的內容
 * @param fn 目標欲執行函數
 */
const handleFilterText = (textContent: string, fn: (item: ChildNode, side?: TemplateSideEnum) => void) => {
  const doc: Document = convertInnerHTMLToDoc(textContent);
  const content = doc.getElementsByTagName('body')[0];
  content.childNodes.forEach(item => fn(item))
}

/**
 * @description 檢核文字的 Spelling
 * 
 */
const checkSpelling = async (target: string[]) => {
  const fetchText = async (dictionaries: string) => {
    const response = await fetch(dictionaries);
    return await response.text();
  };
  const [aff, dic] = await Promise.all([fetchText("/job-website/dictionaries/fr_FR/fr_FR.aff"), fetchText("/job-website/dictionaries/fr_FR/fr_FR.dic")]);
  const typo = new Typo("fr_FR", aff, dic);
  
  const result: SpellingResult[] = target.map(string => {
    return {
      string,
      check: typo.check(string),
      suggestion: typo.suggest(string)
    }
  })
  return result;
}

const handleAddressTemplateStyle = (template: any) => {
  /** 預設 Style */
  const defaultStyle = {
    color: ColorNameEnum.Gray,
    fontSize: FontSizeEnum.Medium,
    fontStyle: 'Arial',
    lineSpacing: 8,
    paragraphSpacing: 8,
  }

  const colorEnum = template[ProcessStepTextEnum.Finalize]?.color as ColorNameEnum
  const style: Style = {
    color: ColorMappingDefines[colorEnum]?.Primary || defaultStyle.color,
    fontSize: template[ProcessStepTextEnum.Finalize]?.fontSize || defaultStyle.fontSize,
    fontStyle: template[ProcessStepTextEnum.Finalize]?.fontStyle || defaultStyle.fontStyle,
    lineSpacing: template[ProcessStepTextEnum.Finalize]?.lineSpacing || defaultStyle.lineSpacing,
    paragraphSpacing: template[ProcessStepTextEnum.Finalize]?.paragraphSpacing || defaultStyle.paragraphSpacing,
  };

  return style;
}

export default {
  convertDateFormat,
  convertInnerHTMLToDoc,
  handleCheckTemplatePage,
  handleAddressSkillsData,
  throttle,
  formatCurrency,
  groupData,
  toAbbreviation,
  checkSpelling,
  handleFilterText,
  handleAddressTemplateStyle
}