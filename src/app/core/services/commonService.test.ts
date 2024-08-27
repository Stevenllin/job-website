import commonService from "./commonService";
import { DateFormatEnum } from '../enums/date';
import { ColorMappingDefines } from '../models/color';
import { ColorNameEnum } from '../enums/color';
import { FontSizeEnum } from '../enums/font';
import { ProcessStepTextEnum } from '../../features/CreateYourCV/types';

beforeAll(() => {
  /** 因 DOMParser 是一個瀏覽器的 API，模拟 DOMParser */
  global.DOMParser = class {
    parseFromString(str: string, type: string) {
      // 使用 jsdom 创建一个虚拟的 DOM 进行测试
      const jsdom = require('jsdom');
      const { JSDOM } = jsdom;
      const dom = new JSDOM(str, { contentType: type });
      return dom.window.document;
    }
  };
});

describe('convertDateFormat', () => {
  /** 測試當格式為 DateFormatEnum.YYYYMM 時，日期應返回 YYYY-MM 格式 */
  it('should return date in YYYY-MM format when format is DateFormatEnum.YYYYMM', () => {
    const date = '2024-08-27';
    const result = commonService.convertDateFormat(date, DateFormatEnum.YYYYMM);
    expect(result).toBe('2024-08');
  });
  /** 測試當格式不是 DateFormatEnum.YYYYMM 時，日期應返回 YYYY-MM-DD 格式 */
  it('should return date in YYYY-MM-DD format when format is not DateFormatEnum.YYYYMM', () => {
    const date = '2024-08-27';
    const result = commonService.convertDateFormat(date, DateFormatEnum.YYYYMMDD);
    expect(result).toBe('2024-08-27');
  });
  /** 測試單數位的日期和月份的格式化 */
  it('should correctly format single digit day and month', () => {
    const date = '2024-01-09';
    const result = commonService.convertDateFormat(date, DateFormatEnum.YYYYMMDD);
    expect(result).toBe('2024-01-9');
  });
  /** 測試處理無效的日期字符串 */
  it('should handle invalid date string', () => {
    const date = 'invalid-date';
    const result = commonService.convertDateFormat(date, DateFormatEnum.YYYYMMDD);
    expect(result).toBe('NaN-NaN-NaN');
  });
});

describe('convertInnerHTMLToDoc', () => {
  /** 測試 P 標籤內的文本內容是否正確 */
  it('should convert an HTML string to a Document', () => {
    const htmlString = '<div><p>Hello, world!</p></div>';
    const doc = commonService.convertInnerHTMLToDoc(htmlString);
    expect(doc.querySelector('p')?.textContent).toBe('Hello, world!');
  });
  /** 測試空 HTML 字串 */
  it('should correctly handle empty HTML string', () => {
    const htmlString = '';
    const doc = commonService.convertInnerHTMLToDoc(htmlString);
    expect(doc.body.innerHTML).toBe('');
  });
  /** 測試 script 標籤 HTML 字串 */
  it('should correctly handle HTML with script tags', () => {
    const htmlString = '<div><script>alert("test")</script></div>';
    const doc = commonService.convertInnerHTMLToDoc(htmlString);
    const scriptElement = doc.querySelector('script');
    expect(scriptElement).not.toBeNull();
    expect(scriptElement?.textContent).toBe('alert("test")');
  });
  /** 測試 格式錯誤的 HTML 字串情況 */
  it('should handle malformed HTML gracefully', () => {
    const htmlString = '<div><p>Unclosed paragraph';
    const doc = commonService.convertInnerHTMLToDoc(htmlString);
    const pElement = doc.querySelector('p');
    expect(pElement).not.toBeNull();
    expect(pElement?.textContent).toBe('Unclosed paragraph');
  });
});

// describe('handleAddressSkillsData', () => {
//   it('should correctly handle and transform skills data', () => {
//     const skills = {
//       input1_1: 'JavaScript',
//       rate1_1: 5,
//       input2_1: 'TypeScript',
//       rate2_1: 4,
//       input1_2: 'React',
//       rate1_2: 4,
//     };
//     const result = commonService.handleAddressSkillsData(skills);

//     expect(result).toEqual([
//       { id: '1', input: 'JavaScript', rate: 5 },
//       { id: '2', input: 'React', rate: 4 },
//       { id: '3', input: 'TypeScript', rate: 4 },
//     ]);
//   });

//   it('should handle empty skills data', () => {
//     const skills = {};
//     const result = commonService.handleAddressSkillsData(skills);

//     expect(result).toEqual([]);
//   });
// });

describe('formatCurrency', () => {
  /** 測試格式化正整數金額 */
  it('should format positive integer amounts correctly', () => {
    const amount = 123456;
    const formatted = commonService.formatCurrency(amount);
    expect(formatted).toBe('$123,456');
  });
  /** 測試格式化負整數金額 */
  it('should format negative integer amounts correctly', () => {
    const amount = -7890;
    const formatted = commonService.formatCurrency(amount);
    expect(formatted).toBe('-$7,890');
  });
  /** 測試格式化金額為零 */
  it('should format zero amount correctly', () => {
    const amount = 0;
    const formatted = commonService.formatCurrency(amount);
    expect(formatted).toBe('$0');
  });
  /** 測試格式化金額極大數值 */
  it('should handle very large amounts correctly', () => {
    const amount = 1000000000;
    const formatted = commonService.formatCurrency(amount);
    expect(formatted).toBe('$1,000,000,000');
  });
});

describe('groupData', () => {
  /** 測試正常的分组功能 */
  it('should group array items by the specified element', () => {
    const array = [
      { type: 'A', name: 'Job1' },
      { type: 'B', name: 'Job2' },
      { type: 'A', name: 'Job3' },
      { type: 'C', name: 'Job4' },
    ];
    const elem = 'type';
    const grouped = commonService.groupData(array, elem);

    expect(grouped).toEqual({
      A: [
        { type: 'A', name: 'Job1' },
        { type: 'A', name: 'Job3' },
      ],
      B: [
        { type: 'B', name: 'Job2' },
      ],
      C: [
        { type: 'C', name: 'Job4' },
      ],
    });
  });
  /** 測試空數組情況 */
  it('should return an empty object when given an empty array', () => {
    const array: any[] = [];
    const elem = 'type';
    const grouped = commonService.groupData(array, elem);
    expect(grouped).toEqual({});
  });
  /** 測試缺少指定數組字段 */
  it('should handle items without the specified element', () => {
    const array = [
      { name: 'Job1' },
      { name: 'Job2' },
      { name: 'Job3' },
    ];
    const elem = 'type';
    const grouped = commonService.groupData(array, elem);
    expect(grouped).toEqual({
      undefined: [
        { name: 'Job1' },
        { name: 'Job2' },
        { name: 'Job3' },
      ],
    });
  });
  /** 測試不同類型的元素 */
  it('should handle elements with non-string types correctly', () => {
    const array = [
      { type: 1, name: 'Job1' },
      { type: 2, name: 'Job2' },
      { type: 1, name: 'Job3' },
    ];
    const elem = 'type';
    const grouped = commonService.groupData(array, elem);
    expect(grouped).toEqual({
      1: [
        { type: 1, name: 'Job1' },
        { type: 1, name: 'Job3' },
      ],
      2: [
        { type: 2, name: 'Job2' },
      ],
    });
  });
});

describe('toAbbreviation', () => {
  /** 測試正常的字符轉換 */
  it('should convert a string to an abbreviation correctly', () => {
    const str = 'National Aeronautics and Space Administration';
    const abbreviation = commonService.toAbbreviation(str);
    expect(abbreviation).toBe('NAASA');
  });
  /** 測試單詞含特殊字符 */
  it('should handle words with special characters', () => {
    const str = 'United Nations Educational, Scientific and Cultural Organization';
    const abbreviation = commonService.toAbbreviation(str);
    expect(abbreviation).toBe('UNESACO');
  });
  /** 測試只有一個單詞的字串 */
  it('should handle single-word strings correctly', () => {
    const str = 'JavaScript';
    const abbreviation = commonService.toAbbreviation(str);
    expect(abbreviation).toBe('J');
  });
  /** 測試包含空字符的情況 */
  it('should handle empty strings correctly', () => {
    const str = '';
    const abbreviation = commonService.toAbbreviation(str);
    expect(abbreviation).toBe('');
  });
});

describe('handleAddressTemplateStyle', () => {
  /** 測試模板樣式覆蓋 */
  it('should apply template style if provided', () => {
    const template = {
      [ProcessStepTextEnum.Finalize]: {
        color: ColorNameEnum.SkyBlue,
        fontSize: FontSizeEnum.Large,
        fontStyle: 'Helvetica',
        lineSpacing: 12,
        paragraphSpacing: 16,
      }
    };
    const style = commonService.handleAddressTemplateStyle(template);
    expect(style).toEqual({
      color: ColorMappingDefines[ColorNameEnum.SkyBlue]?.Primary,
      fontSize: FontSizeEnum.Large,
      fontStyle: 'Helvetica',
      lineSpacing: 12,
      paragraphSpacing: 16,
    });
  });
  /** 測試使用默認樣式 */
  it('should apply default style when no template style is provided', () => {
    const template = {};
    const style = commonService.handleAddressTemplateStyle(template);
    expect(style).toEqual({
      color: ColorNameEnum.Gray,
      fontSize: FontSizeEnum.Medium,
      fontStyle: 'Arial',
      lineSpacing: 8,
      paragraphSpacing: 8,
    });
  });
  /** 測試使用部分模板樣式 */
  it('should apply default values for missing properties in the template', () => {
    const template = {
      [ProcessStepTextEnum.Finalize]: {
        color: ColorNameEnum.RoyalPurple,
      }
    };
    const style = commonService.handleAddressTemplateStyle(template);
    expect(style).toEqual({
      color: ColorMappingDefines[ColorNameEnum.RoyalPurple]?.Primary,
      fontSize: FontSizeEnum.Medium,
      fontStyle: 'Arial',
      lineSpacing: 8,
      paragraphSpacing: 8,
    });
  });
});