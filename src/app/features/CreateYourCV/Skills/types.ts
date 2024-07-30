import { SkillsNameEnum, SkillsTypeTextEnum, SkillsTypeCodeEnum, SkillsTypeBackgroundEnum } from '../../../core/enums/skills';

export interface InputType {
  id: string;
  input: string;
  rate: number;
  [key: string]: any; // 添加索引簽名以允許動態屬性
}

export interface Skill {
  name: SkillsNameEnum;
  id: number;
  typeCode: SkillsTypeCodeEnum;
  typeText: SkillsTypeTextEnum,
  checked: boolean;
}

export interface SkillsType {
  label: SkillsTypeTextEnum;
  value: number;
}

// 定義 Skills 背景顏色
export const SkillsTypeBackgroundDefines: Readonly<Record<SkillsTypeTextEnum, SkillsTypeBackgroundEnum>> = {
  [SkillsTypeTextEnum.ALL]: SkillsTypeBackgroundEnum.ALL,
  [SkillsTypeTextEnum.SOFTWARE_ENGINEER]: SkillsTypeBackgroundEnum.SOFTWARE_ENGINEER,
  [SkillsTypeTextEnum.DESIGNER]: SkillsTypeBackgroundEnum.DESIGNER,
  [SkillsTypeTextEnum.MARKETING]: SkillsTypeBackgroundEnum.MARKETING,
  [SkillsTypeTextEnum.PM]: SkillsTypeBackgroundEnum.PM,
  [SkillsTypeTextEnum.FINANCE]: SkillsTypeBackgroundEnum.FINANCE,
  [SkillsTypeTextEnum.OTHER]: SkillsTypeBackgroundEnum.OTHER,
}

// 定義技能類型
export const SkillsTypeDefines: SkillsType[] = [
  { label: SkillsTypeTextEnum.ALL, value: SkillsTypeCodeEnum.ALL },
  { label: SkillsTypeTextEnum.SOFTWARE_ENGINEER, value: SkillsTypeCodeEnum.SOFTWARE_ENGINEER },
  { label: SkillsTypeTextEnum.DESIGNER, value: SkillsTypeCodeEnum.DESIGNER },
  { label: SkillsTypeTextEnum.MARKETING, value: SkillsTypeCodeEnum.MARKETING },
  { label: SkillsTypeTextEnum.PM, value: SkillsTypeCodeEnum.PM },
  { label: SkillsTypeTextEnum.FINANCE, value: SkillsTypeCodeEnum.FINANCE },
  { label: SkillsTypeTextEnum.OTHER, value: SkillsTypeCodeEnum.OTHER },
]

// 定義技能陣列
export const SkillsDefines: Skill[] = [
  { name: SkillsNameEnum.JAVASCRIPT, id: 1, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.HTML, id: 2, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.CSS, id: 3, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.VUE, id: 4, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.REACT, id: 5, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.NODE, id: 6, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.EXPRESS, id: 7, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.MONGODB, id: 8, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.SQL, id: 9, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.GIT, id: 10, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.WEBPACK, id: 11, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.BABEL, id: 12, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.TYPESCRIPT, id: 13, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.GRAPHQL, id: 14, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.SASS, id: 15, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.BOOTSTRAP, id: 16, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.DOCKER, id: 17, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.KUBERNETES, id: 18, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.AWS, id: 19, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.AZURE, id: 20, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.FIREBASE, id: 21, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.JAVA, id: 22, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.PYTHON, id: 23, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.CPP, id: 24, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.RUBY, id: 25, typeCode: SkillsTypeCodeEnum.SOFTWARE_ENGINEER, typeText: SkillsTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.PHOTOSHOP, id: 26, typeCode: SkillsTypeCodeEnum.DESIGNER, typeText: SkillsTypeTextEnum.DESIGNER, checked: false },
  { name: SkillsNameEnum.ILLUSTRATOR, id: 27, typeCode: SkillsTypeCodeEnum.DESIGNER, typeText: SkillsTypeTextEnum.DESIGNER, checked: false },
  { name: SkillsNameEnum.SKETCH, id: 28, typeCode: SkillsTypeCodeEnum.DESIGNER, typeText: SkillsTypeTextEnum.DESIGNER, checked: false },
  { name: SkillsNameEnum.FIGMA, id: 29, typeCode: SkillsTypeCodeEnum.DESIGNER, typeText: SkillsTypeTextEnum.DESIGNER, checked: false },
  { name: SkillsNameEnum.WIRE_FRAMING, id: 30, typeCode: SkillsTypeCodeEnum.DESIGNER, typeText: SkillsTypeTextEnum.DESIGNER, checked: false },
  { name: SkillsNameEnum.PROTOTYPING, id: 31, typeCode: SkillsTypeCodeEnum.DESIGNER, typeText: SkillsTypeTextEnum.DESIGNER, checked: false },
  { name: SkillsNameEnum.PROJECT_MANAGEMENT, id: 32, typeCode: SkillsTypeCodeEnum.PM, typeText: SkillsTypeTextEnum.PM, checked: false },
  { name: SkillsNameEnum.SCRUM, id: 33, typeCode: SkillsTypeCodeEnum.PM, typeText: SkillsTypeTextEnum.PM, checked: false },
  { name: SkillsNameEnum.AGILE, id: 34, typeCode: SkillsTypeCodeEnum.PM, typeText: SkillsTypeTextEnum.PM, checked: false },
  { name: SkillsNameEnum.JIRA, id: 35, typeCode: SkillsTypeCodeEnum.PM, typeText: SkillsTypeTextEnum.PM, checked: false },
  { name: SkillsNameEnum.MARKET_RESEARCH, id: 36, typeCode: SkillsTypeCodeEnum.MARKETING, typeText: SkillsTypeTextEnum.MARKETING, checked: false },
  { name: SkillsNameEnum.SEO, id: 37, typeCode: SkillsTypeCodeEnum.MARKETING, typeText: SkillsTypeTextEnum.MARKETING, checked: false },
  { name: SkillsNameEnum.CONTENT_MARKETING, id: 38, typeCode: SkillsTypeCodeEnum.MARKETING, typeText: SkillsTypeTextEnum.MARKETING, checked: false },
  { name: SkillsNameEnum.SOCIAL_MEDIA_MARKETING, id: 39, typeCode: SkillsTypeCodeEnum.MARKETING, typeText: SkillsTypeTextEnum.MARKETING, checked: false },
  { name: SkillsNameEnum.GOOGLE_ANALYTICS, id: 40, typeCode: SkillsTypeCodeEnum.MARKETING, typeText: SkillsTypeTextEnum.MARKETING, checked: false },
  { name: SkillsNameEnum.ACCOUNTING, id: 41, typeCode: SkillsTypeCodeEnum.FINANCE, typeText: SkillsTypeTextEnum.FINANCE, checked: false },
  { name: SkillsNameEnum.FINANCIAL_ANALYSIS, id: 42, typeCode: SkillsTypeCodeEnum.FINANCE, typeText: SkillsTypeTextEnum.FINANCE, checked: false },
  { name: SkillsNameEnum.INVESTMENT_STRATEGIES, id: 43, typeCode: SkillsTypeCodeEnum.FINANCE, typeText: SkillsTypeTextEnum.FINANCE, checked: false },
  { name: SkillsNameEnum.RISK_MANAGEMENT, id: 44, typeCode: SkillsTypeCodeEnum.FINANCE, typeText: SkillsTypeTextEnum.FINANCE, checked: false },
  { name: SkillsNameEnum.BUDGETING, id: 45, typeCode: SkillsTypeCodeEnum.FINANCE, typeText: SkillsTypeTextEnum.FINANCE, checked: false },
  { name: SkillsNameEnum.COMMUNICATION, id: 46, typeCode: SkillsTypeCodeEnum.OTHER, typeText: SkillsTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.TEAMWORK, id: 47, typeCode: SkillsTypeCodeEnum.OTHER, typeText: SkillsTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.PROBLEM_SOLVING, id: 48, typeCode: SkillsTypeCodeEnum.OTHER, typeText: SkillsTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.LEADERSHIP, id: 49, typeCode: SkillsTypeCodeEnum.OTHER, typeText: SkillsTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.TIME_MANAGEMENT, id: 50, typeCode: SkillsTypeCodeEnum.OTHER, typeText: SkillsTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.ADAPTABILITY, id: 51, typeCode: SkillsTypeCodeEnum.OTHER, typeText: SkillsTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.CREATIVITY, id: 52, typeCode: SkillsTypeCodeEnum.OTHER, typeText: SkillsTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.WORK_ETHIC, id: 53, typeCode: SkillsTypeCodeEnum.OTHER, typeText: SkillsTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.INTERPERSONAL_SKILLS, id: 54, typeCode: SkillsTypeCodeEnum.OTHER, typeText: SkillsTypeTextEnum.OTHER, checked: false },
]