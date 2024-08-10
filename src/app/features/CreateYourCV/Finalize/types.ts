import { ColorPickerEnum } from '../../../core/enums/color';
import { FontSizeEnum } from '../../../core/enums/font';

export interface TemplateStyle {
  color: ColorPickerEnum;
  fontSize: FontSizeEnum;
  fontStyle: string;
  paragraphSpacing: number;
  lineSpacing: number;
}