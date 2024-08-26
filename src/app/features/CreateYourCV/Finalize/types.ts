import { ColorNameEnum } from '../../../core/enums/color';
import { FontSizeEnum } from '../../../core/enums/font';

export interface TemplateStyle {
  color: ColorNameEnum;
  fontSize: FontSizeEnum;
  fontStyle: string;
  paragraphSpacing: number;
  lineSpacing: number;
  typo: SpellingResult[]
}

export interface SpellingResult {
  string: string;
  check: boolean;
  suggestion: string[];
}
