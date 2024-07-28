import { ROUTES } from "../../core/enums/routerPath";

/**
 * @description 流程步驟代碼
 */
export enum ProcessStepCodesEnum {
  /** Choose Template */
  ChooseTemplate = '1',
  /** General Info */
  GeneralInfo = '2',
  /** Work History */
  WorkHistory = '3',
  /** WorkSummary */
  WorkSummary = '3',
  /** Education */
  Education = '4',
  /** Skills */
  Skills = '5',
  /** Summary */
  Summary = '6',
  /** Finalize */
  Finalize = '7'
}

/** 
 * @description 流程步驟文字
 */
export enum ProcessStepTextEnum {
  /** Choose Template */
  ChooseTemplate = 'CV Template',
  /** General Info */
  GeneralInfo = 'Heading',
  /** Work History */
  WorkHistory = 'Work History',
  /** WorkSummary */
  WorkSummary = 'Work Summary',
  /** Education */
  Education = 'Education',
  /** Skills */
  Skills = 'Skills',
  /** Summary */
  Summary = 'Summary',
  /** Finalize */
  Finalize = 'Finalize'
}

export const ProcessStepTextMatchesCodes: Readonly<Record<ProcessStepTextEnum, ProcessStepCodesEnum>> = {
  /** Choose Template */
  [ProcessStepTextEnum.ChooseTemplate]: ProcessStepCodesEnum.ChooseTemplate,
  /** General Info */
  [ProcessStepTextEnum.GeneralInfo]: ProcessStepCodesEnum.GeneralInfo,
  /** Work History */
  [ProcessStepTextEnum.WorkHistory]: ProcessStepCodesEnum.WorkHistory,
  /** WorkSummary */
  [ProcessStepTextEnum.WorkSummary]: ProcessStepCodesEnum.WorkSummary,
  /** Education */
  [ProcessStepTextEnum.Education]: ProcessStepCodesEnum.Education,
  /** Skills */
  [ProcessStepTextEnum.Skills]: ProcessStepCodesEnum.Skills,
  /** Summary */
  [ProcessStepTextEnum.Summary]: ProcessStepCodesEnum.Summary,
  /** Finalize */
  [ProcessStepTextEnum.Finalize]: ProcessStepCodesEnum.Finalize,
}

/** 
 * @description 流程路由對應步驟代碼
 */
export const ProcessRouteMatchesStep: Readonly<Record<string, ProcessStepCodesEnum>> = {
  /** Choose Template */
  [ROUTES.FEATURES__CREATE_YOUR_CV__CHOOSE_TEMPLATE]: ProcessStepCodesEnum.ChooseTemplate,
  /** General Info */
  [ROUTES.FEATURES__CREATE_YOUR_CV__GENERAL_INFO]: ProcessStepCodesEnum.GeneralInfo,
  /** Work History */
  [ROUTES.FEATURES__CREATE_YOUR_CV__WORK_HISTORY]: ProcessStepCodesEnum.WorkHistory,
  /** Work Summary */
  [ROUTES.FEATURES__CREATE_YOUR_CV__WORK_SUMMARY]: ProcessStepCodesEnum.WorkSummary,
  /** Education */
  [ROUTES.FEATURES__CREATE_YOUR_CV__EDUCATION]: ProcessStepCodesEnum.Education,
  /** Skills */
  [ROUTES.FEATURES__CREATE_YOUR_CV__SKILLS]: ProcessStepCodesEnum.Skills,
  /** Summary */
  [ROUTES.FEATURES__CREATE_YOUR_CV__SUMMARY]: ProcessStepCodesEnum.Summary,
  /** Finalize */
  [ROUTES.FEATURES__CREATE_YOUR_CV__FINALIZE]: ProcessStepCodesEnum.Finalize,
}