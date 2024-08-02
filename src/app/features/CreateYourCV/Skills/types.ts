import { SkillsNameEnum, SkillsTypeBackgroundEnum } from '../../../core/enums/skills';
import { PositionTypeTextEnum, PositionTypeCodeEnum } from '../../../core/enums/position';

export interface InputType {
  id: string;
  input: string;
  rate: number;
  [key: string]: any; // 添加索引簽名以允許動態屬性
}

export interface Skill {
  name: SkillsNameEnum;
  id: number;
  typeCode: PositionTypeCodeEnum;
  typeText: PositionTypeTextEnum,
  checked: boolean;
}

export interface SkillsType {
  label: PositionTypeTextEnum;
  value: number;
}

// 定義 Skills 背景顏色
export const SkillsTypeBackgroundDefines: Readonly<Record<PositionTypeTextEnum, SkillsTypeBackgroundEnum>> = {
  [PositionTypeTextEnum.ALL]: SkillsTypeBackgroundEnum.ALL,
  [PositionTypeTextEnum.SOFTWARE_ENGINEER]: SkillsTypeBackgroundEnum.SOFTWARE_ENGINEER,
  [PositionTypeTextEnum.DESIGNER]: SkillsTypeBackgroundEnum.DESIGNER,
  [PositionTypeTextEnum.MARKETING]: SkillsTypeBackgroundEnum.MARKETING,
  [PositionTypeTextEnum.PM]: SkillsTypeBackgroundEnum.PM,
  [PositionTypeTextEnum.FINANCE]: SkillsTypeBackgroundEnum.FINANCE,
  [PositionTypeTextEnum.OTHER]: SkillsTypeBackgroundEnum.OTHER,
}

// 定義技能類型
export const SkillsTypeDefines: SkillsType[] = [
  { label: PositionTypeTextEnum.ALL, value: PositionTypeCodeEnum.ALL },
  { label: PositionTypeTextEnum.SOFTWARE_ENGINEER, value: PositionTypeCodeEnum.SOFTWARE_ENGINEER },
  { label: PositionTypeTextEnum.DESIGNER, value: PositionTypeCodeEnum.DESIGNER },
  { label: PositionTypeTextEnum.MARKETING, value: PositionTypeCodeEnum.MARKETING },
  { label: PositionTypeTextEnum.PM, value: PositionTypeCodeEnum.PM },
  { label: PositionTypeTextEnum.FINANCE, value: PositionTypeCodeEnum.FINANCE },
  { label: PositionTypeTextEnum.OTHER, value: PositionTypeCodeEnum.OTHER },
]

// 定義技能陣列
export const SkillsDefines: Skill[] = [
  { name: SkillsNameEnum.JAVASCRIPT, id: 1, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.HTML, id: 2, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.CSS, id: 3, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.VUE, id: 4, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.REACT, id: 5, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.NODE, id: 6, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.EXPRESS, id: 7, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.MONGODB, id: 8, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.SQL, id: 9, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.GIT, id: 10, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.WEBPACK, id: 11, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.BABEL, id: 12, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.TYPESCRIPT, id: 13, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.GRAPHQL, id: 14, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.SASS, id: 15, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.BOOTSTRAP, id: 16, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.DOCKER, id: 17, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.KUBERNETES, id: 18, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.AWS, id: 19, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.AZURE, id: 20, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.FIREBASE, id: 21, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.JAVA, id: 22, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.PYTHON, id: 23, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.CPP, id: 24, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.RUBY, id: 25, typeCode: PositionTypeCodeEnum.SOFTWARE_ENGINEER, typeText: PositionTypeTextEnum.SOFTWARE_ENGINEER, checked: false },
  { name: SkillsNameEnum.PHOTOSHOP, id: 26, typeCode: PositionTypeCodeEnum.DESIGNER, typeText: PositionTypeTextEnum.DESIGNER, checked: false },
  { name: SkillsNameEnum.ILLUSTRATOR, id: 27, typeCode: PositionTypeCodeEnum.DESIGNER, typeText: PositionTypeTextEnum.DESIGNER, checked: false },
  { name: SkillsNameEnum.SKETCH, id: 28, typeCode: PositionTypeCodeEnum.DESIGNER, typeText: PositionTypeTextEnum.DESIGNER, checked: false },
  { name: SkillsNameEnum.FIGMA, id: 29, typeCode: PositionTypeCodeEnum.DESIGNER, typeText: PositionTypeTextEnum.DESIGNER, checked: false },
  { name: SkillsNameEnum.WIRE_FRAMING, id: 30, typeCode: PositionTypeCodeEnum.DESIGNER, typeText: PositionTypeTextEnum.DESIGNER, checked: false },
  { name: SkillsNameEnum.PROTOTYPING, id: 31, typeCode: PositionTypeCodeEnum.DESIGNER, typeText: PositionTypeTextEnum.DESIGNER, checked: false },
  { name: SkillsNameEnum.PROJECT_MANAGEMENT, id: 32, typeCode: PositionTypeCodeEnum.PM, typeText: PositionTypeTextEnum.PM, checked: false },
  { name: SkillsNameEnum.SCRUM, id: 33, typeCode: PositionTypeCodeEnum.PM, typeText: PositionTypeTextEnum.PM, checked: false },
  { name: SkillsNameEnum.AGILE, id: 34, typeCode: PositionTypeCodeEnum.PM, typeText: PositionTypeTextEnum.PM, checked: false },
  { name: SkillsNameEnum.JIRA, id: 35, typeCode: PositionTypeCodeEnum.PM, typeText: PositionTypeTextEnum.PM, checked: false },
  { name: SkillsNameEnum.MARKET_RESEARCH, id: 36, typeCode: PositionTypeCodeEnum.MARKETING, typeText: PositionTypeTextEnum.MARKETING, checked: false },
  { name: SkillsNameEnum.SEO, id: 37, typeCode: PositionTypeCodeEnum.MARKETING, typeText: PositionTypeTextEnum.MARKETING, checked: false },
  { name: SkillsNameEnum.CONTENT_MARKETING, id: 38, typeCode: PositionTypeCodeEnum.MARKETING, typeText: PositionTypeTextEnum.MARKETING, checked: false },
  { name: SkillsNameEnum.SOCIAL_MEDIA_MARKETING, id: 39, typeCode: PositionTypeCodeEnum.MARKETING, typeText: PositionTypeTextEnum.MARKETING, checked: false },
  { name: SkillsNameEnum.GOOGLE_ANALYTICS, id: 40, typeCode: PositionTypeCodeEnum.MARKETING, typeText: PositionTypeTextEnum.MARKETING, checked: false },
  { name: SkillsNameEnum.ACCOUNTING, id: 41, typeCode: PositionTypeCodeEnum.FINANCE, typeText: PositionTypeTextEnum.FINANCE, checked: false },
  { name: SkillsNameEnum.FINANCIAL_ANALYSIS, id: 42, typeCode: PositionTypeCodeEnum.FINANCE, typeText: PositionTypeTextEnum.FINANCE, checked: false },
  { name: SkillsNameEnum.INVESTMENT_STRATEGIES, id: 43, typeCode: PositionTypeCodeEnum.FINANCE, typeText: PositionTypeTextEnum.FINANCE, checked: false },
  { name: SkillsNameEnum.RISK_MANAGEMENT, id: 44, typeCode: PositionTypeCodeEnum.FINANCE, typeText: PositionTypeTextEnum.FINANCE, checked: false },
  { name: SkillsNameEnum.BUDGETING, id: 45, typeCode: PositionTypeCodeEnum.FINANCE, typeText: PositionTypeTextEnum.FINANCE, checked: false },
  { name: SkillsNameEnum.COMMUNICATION, id: 46, typeCode: PositionTypeCodeEnum.OTHER, typeText: PositionTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.TEAMWORK, id: 47, typeCode: PositionTypeCodeEnum.OTHER, typeText: PositionTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.PROBLEM_SOLVING, id: 48, typeCode: PositionTypeCodeEnum.OTHER, typeText: PositionTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.LEADERSHIP, id: 49, typeCode: PositionTypeCodeEnum.OTHER, typeText: PositionTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.TIME_MANAGEMENT, id: 50, typeCode: PositionTypeCodeEnum.OTHER, typeText: PositionTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.ADAPTABILITY, id: 51, typeCode: PositionTypeCodeEnum.OTHER, typeText: PositionTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.CREATIVITY, id: 52, typeCode: PositionTypeCodeEnum.OTHER, typeText: PositionTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.WORK_ETHIC, id: 53, typeCode: PositionTypeCodeEnum.OTHER, typeText: PositionTypeTextEnum.OTHER, checked: false },
  { name: SkillsNameEnum.INTERPERSONAL_SKILLS, id: 54, typeCode: PositionTypeCodeEnum.OTHER, typeText: PositionTypeTextEnum.OTHER, checked: false },
]