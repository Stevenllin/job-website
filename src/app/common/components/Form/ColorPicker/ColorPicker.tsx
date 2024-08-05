import React from 'react'
import { ColorPickerDefines } from '../../../../core/models/color'
import { ColorTemplateProps } from './types';
import { ColorPickerEnum } from '../../../../core/enums/color';

const ColorPicker: React.FC<ColorTemplateProps> = (props) => {
  const handleChange = (color: ColorPickerEnum) => {
    props.onChange(color);
  }

  return (
    <div id="color-picker">
      {/** 優化 UI */}
      {ColorPickerDefines.map((color, index) => {
        return (
          <label key={index} className="radio">
            <input type="radio" name="color" value={color} onChange={() => handleChange(color)} />
            <span
              className="checkmark"
              style={{ backgroundColor: color }}
            ></span>
          </label>
        )
      })}
    </div>
  )
}

export default ColorPicker
