import { ROUTES } from "../../core/enums/routerPath";

/**
 * @description 流程步驟代碼
 */
export enum ProccessStepCodesEnum {
  /** Choose Template */
  ChooseTemplate = '1',
  /** General Info */
  GeneralInfo = '2',
  /** Work History */
  WorkHistory = '3',
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
  /** Education */
  Education = 'Education',
  /** Skills */
  Skills = 'Skills',
  /** Summary */
  Summary = 'Summary',
  /** Finalize */
  Finalize = 'Finalize'
}

/** 
 * @description 流程路由對應步驟代碼
 */
export const ProcessRouteMatchesStep: Readonly<Record<string, ProccessStepCodesEnum>> = {
  /** Choose Template */
  [ROUTES.FEATURES__CREATE_YOUR_CV__CHOOSE_TEMPLATE]: ProccessStepCodesEnum.ChooseTemplate,
  /** General Info */
  [ROUTES.FEATURES__CREATE_YOUR_CV__GENERAL_INFO]: ProccessStepCodesEnum.GeneralInfo,
  /** Work History */
  [ROUTES.FEATURES__CREATE_YOUR_CV__WORK_HISTORY]: ProccessStepCodesEnum.WorkHistory,
  /** Education */
  [ROUTES.FEATURES__CREATE_YOUR_CV__EDUCATION]: ProccessStepCodesEnum.Education,
  /** Skills */
  [ROUTES.FEATURES__CREATE_YOUR_CV__SKILLS]: ProccessStepCodesEnum.Skills,
  /** Summary */
  [ROUTES.FEATURES__CREATE_YOUR_CV__SUMMARY]: ProccessStepCodesEnum.Summary,
  /** Finalize */
  [ROUTES.FEATURES__CREATE_YOUR_CV__FINALIZE]: ProccessStepCodesEnum.Finalize,
}