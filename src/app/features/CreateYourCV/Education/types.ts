import { CourseworkTypeEnum } from "../../../core/enums/coursework";

export interface Coursework {
  name: string;
  id: number;
  checked: boolean;
  type: CourseworkTypeEnum;
  description: string;
}

/** 定義 Coursework */
export const CourseworkDefines: Coursework[] = [
  { name: 'Graduation with Distinction', id: 1, checked: false, type: CourseworkTypeEnum.ACHIEVEMENTS, description: 'Graduation with Distinction, [Semester, Year]' },
  { name: 'Number GPA/CGPA', id: 2, checked: false, type: CourseworkTypeEnum.ACHIEVEMENTS, description: '[Number] GPA/CGPA' },
  { name: 'Grade Letter GPA/CGPA', id: 3, checked: false, type: CourseworkTypeEnum.ACHIEVEMENTS, description: 'Final Grade: [Letter]' },
  { name: 'Percentage GPA/CGPA', id: 4, checked: false, type: CourseworkTypeEnum.ACHIEVEMENTS, description: 'Final Grade: [Number]%' },
  { name: 'Ranking', id: 5, checked: false, type: CourseworkTypeEnum.ACHIEVEMENTS, description: 'Ranked [Number]% in Class' },
  { name: 'Awards', id: 6, checked: false, type: CourseworkTypeEnum.AWARDS, description: 'Recipient of [Award Name], [Semester, Year]' },
  { name: 'Scholarship', id: 7, checked: false, type: CourseworkTypeEnum.AWARDS, description: '[Scholarship Name], [Year Awarded] from [Awarding Body]' },
  { name: 'Athletic or Competitive Scholarship', id: 8, checked: false, type: CourseworkTypeEnum.AWARDS, description: '[Scholarship Name], [Year Awarded] from [Awarding Body] for [Reason for Award]' },
  { name: 'Thesis Paper', id: 9, checked: false, type: CourseworkTypeEnum.PROJECTS, description: 'Thesis Paper: [Thesis Title]' },
  { name: 'Capstone Project', id: 10, checked: false, type: CourseworkTypeEnum.PROJECTS, description: '[Project Name], [Your Role and Brief Project Description] - Capstone Project' },
  { name: 'Research Project', id: 11, checked: false, type: CourseworkTypeEnum.ACHIEVEMENTS, description: '[Project Name], [Project Results Statement] - Research Project' },
  { name: 'Dissertation', id: 12, checked: false, type: CourseworkTypeEnum.ACHIEVEMENTS, description: 'Dissertation: [Dissertation Title]' },
]