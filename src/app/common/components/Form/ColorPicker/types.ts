import { ColorPickerEnum } from '../../../../core/enums/color';

export interface ColorTemplateProps {
  onChange: (color: ColorPickerEnum) => void;
  selected: string;
}