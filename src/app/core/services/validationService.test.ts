import { getRequiredRule, getMobileRule, getEmailRule, getStartDateRule, getEndDateRule, validateEndDate, validateStartDate } from './validationService';

describe('getRequiredRule', () => {
  let mockForm: any;

  beforeEach(() => {
    // 创建一个模拟的表单实例
    mockForm = {
      getFieldValue: jest.fn()
    };
  });
  /** 測試必填欄位 */
  it('should return an object with required true and the correct message', () => {
    const message = 'This field is required';
    const result = getRequiredRule(message);

    expect(result).toEqual({
      required: true,
      message: message,
    });
  });
  /** 測試電話號碼（必填） */
  it('should return an array with required rule and phone number pattern when isRequired is true', () => {
    const rules = getMobileRule(true);

    expect(rules).toEqual([
      getRequiredRule('Please input your phone number!'),
      { pattern: /^[0-9]{10}$/, message: 'Please enter a valid phone number!' },
    ]);
  });
  /** 測試電話號碼（選填） */
  it('should return an array with only phone number pattern rule when isRequired is false', () => {
    const rules = getMobileRule(false);

    expect(rules).toEqual([
      { pattern: /^[0-9]{10}$/, message: 'Please enter a valid phone number!' },
    ]);
  });
  /** 測試 Email（必填） */
  it('should return an array with required rule and email type rule when isRequired is true', () => {
    const rules = getEmailRule(true);

    expect(rules).toEqual([
      getRequiredRule('Please input your E-mail!'),
      { type: 'email', message: 'Please enter a valid E-mail!' },
    ]);
  });
  /** 測試 Email（選填） */
  it('should return an array with only email type rule when isRequired is false', () => {
    const rules = getEmailRule(false);

    expect(rules).toEqual([
      { type: 'email', message: 'Please enter a valid E-mail!' },
    ]);
  });

  it('should return the correct rules for start date when isRequired is true', () => {
    const form = mockForm;
    form.getFieldValue = jest.fn().mockReturnValue(null);
    const rules = getStartDateRule(true, form);
    
    expect(rules[0]).toMatchObject({ required: true, message: 'Please input the start date' });
    /** 檢查 validator 函數是否存在 */
    expect(rules[1]).toHaveProperty('validator');
  });

  it('should return the correct rules for end date when isRequired is true', () => {
    const form = mockForm;
    form.getFieldValue = jest.fn().mockReturnValue(null);
    const rules = getEndDateRule(true, form);

    expect(rules[0]).toMatchObject({ required: true, message: 'Please input the end date' });
    /** 檢查 validator 函數是否存在 */
    expect(rules[1]).toHaveProperty('validator');
  });

  it('should validate start date correctly', async () => {
    const form = mockForm;
    /** 模擬的函數，用於獲取表單字段的值 */
    form.getFieldValue = jest.fn((field) => {
      if (field === 'end_date') {
        /** 返回為 true 表示開始日期晚於結束日期 */
        return { isBefore: () => true };
      }
      return null;
    });
    /** 初始化 Start Date 規則 */
    const validator = validateStartDate(form).validator;
    /** 調用 validator 這個函數，傳入開始日期早於結束日期的情況，因此 Promise 成功解析 不拋出異常 */
    await expect(validator({}, { isBefore: () => true })).resolves.not.toThrow();
  });

  it('should validate end date correctly', async () => {
    const form = mockForm;
    form.getFieldValue = jest.fn((field) => {
      if (field === 'start_date') {
        /** 返回為 true 表示結束日期早於開始日期 */
        return { isAfter: () => true };
      }
      return null;
    });

    const validator = validateEndDate(form).validator;
    await expect(validator({}, { isAfter: () => true })).resolves.not.toThrow();
  });

  it('should reject invalid start date', async () => {
    const form = mockForm;
    /** 返回為 false 表示開始日期晚於結束日期 */
    form.getFieldValue = jest.fn().mockReturnValue({ isBefore: () => false });

    const validator = validateStartDate(form).validator;
    await expect(validator({}, { isBefore: () => false })).rejects.toThrow('Start date must be earlier than end date!');
  });

  it('should reject invalid end date', async () => {
    const form = mockForm;
    /** 返回為 false 表示結束日期早於開始日期 */
    form.getFieldValue = jest.fn().mockReturnValue({ isAfter: () => false });

    const validator = validateEndDate(form).validator;
    await expect(validator({}, { isAfter: () => false })).rejects.toThrow('End date must be later than start date!');
  });
});