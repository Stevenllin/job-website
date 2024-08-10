import React from 'react'
import { ColorPickers } from '../../../../core/models/color'
import { ColorTemplateProps } from './types';
import { ColorNameEnum } from '../../../../core/enums/color';

const ColorPicker: React.FC<ColorTemplateProps> = (props) => {
  const handleChange = (color: ColorNameEnum) => {
    props.onChange(color);
  }

  return (
    <div id="color-picker">
      {/** 優化 UI */}
      {ColorPickers.map((color, index) => {
        return (
            <label key={index} className="radio">
              <input type="radio" name="color" value={color.value} onChange={() => handleChange(color.text)} />
              <span
                className={`checkmark${props.selected === color.text ? ' selected' : ''}`}
                style={{ backgroundColor: color.value }}
              ></span>
            </label>
        )
      })}
    </div>
  )
}

export default ColorPicker
