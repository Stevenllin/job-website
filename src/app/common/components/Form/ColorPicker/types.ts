import { ColorNameEnum } from '../../../../core/enums/color';

export interface ColorTemplateProps {
  onChange: (color: ColorNameEnum) => void;
  selected: string;
}