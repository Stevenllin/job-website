import { Rule, RuleObject } from 'antd/lib/form';
import { StoreValue } from 'antd/lib/form/interface';
import { FormInstance } from 'antd/lib/form/Form';

/** 策略模式 */

/**
 * @description 必填欄位
 * @param message 錯誤訊息
 */
export const getRequiredRule = (message: string) => ({ required: true, message });

/**
 * @description 驗證電話號碼格式
 * @param isRequired 是否必填
 */
export const getMobileRule = (isRequired: boolean) => {
  const rules: Rule[] = [
    ...(isRequired ? [getRequiredRule('Please input your phone number!')] : []),
    { pattern: /^[0-9]{10}$/, message: 'Please enter a valid phone number!' },
  ];
  return rules;
}

/**
 * @description 驗證 Email 格式
 * @param isRequired 是否必填
 */
export const getEmailRule = (isRequired: boolean) => {
  const rules: Rule[] = [
    ...(isRequired ? [getRequiredRule('Please input your E-mail!')] : []),
    { type: 'email', message: 'Please enter a valid E-mail!', }
  ];
  return rules;
}

/**
 * @description 客製化 start date 的規則
 */
export const validateStartDate = (form: FormInstance) => ({
  validator(_: RuleObject, value: StoreValue) {
    const endDate = form.getFieldValue('end_date');
    if (!value || !endDate || value.isBefore(endDate)) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('Start date must be earlier than end date!'))
  }
});

/**
 * @description 客製化 end date 的規則
 */
export const validateEndDate = (form: FormInstance) => ({
  validator(_: RuleObject, value: StoreValue) {
    const startDate = form.getFieldValue('start_date');
    if (!value || !startDate || value.isAfter(startDate)) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('End date must be later than start date!'))
  }
})

/**
 * @description 驗證 Start Date
 * 
 * @param isRequired 是否必填
 * @param form 表單實例
 * @returns 
 */
export const getStartDateRule = (isRequired: boolean, form: FormInstance) => {
  const rules: Rule[] = [
    ...(isRequired ? [getRequiredRule('Please input the start date')] : []),
    validateStartDate(form)
  ];
  return rules;
}

/**
 * @description 驗證 End Date
 * 
 * @param isRequired 是否必填
 * @param form 表單實例
 * @returns 
 */
export const getEndDateRule = (isRequired: boolean, form: FormInstance) => {
  const rules: Rule[] = [
    ...(isRequired ? [getRequiredRule('Please input the end date')] : []),
    validateEndDate(form)
  ];
  return rules;
}