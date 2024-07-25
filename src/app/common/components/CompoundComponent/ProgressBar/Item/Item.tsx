import React, { useContext } from 'react'
import { ItemProps } from './types';
import ProgressBarContext from '../ProgressBarContext';

const Item: React.FC<ItemProps> = (props) => {
  const progressBarContext = useContext(ProgressBarContext);
  const isActive = progressBarContext.currentStep === props.value;
  return (
    <div className={isActive ? 'progress-item--active' : 'progress-item'}>
      <div className="number">
        {props.value}
        <div className="circle"></div>
      </div>
      <div className="text">{props.children}</div>
    </div>
  )
}

export default Item
