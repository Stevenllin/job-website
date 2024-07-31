import React, { useContext } from 'react'
import { ItemProps } from './types';
import ProgressBarContext from '../ProgressBarContext';
import { useNavigate } from 'react-router-dom';

const Item: React.FC<ItemProps> = (props) => {
  const progressBarContext = useContext(ProgressBarContext);
  const isActive = progressBarContext.currentStep === props.value;
  const navigate = useNavigate()

  const handleRedirect = () => {
    console.log(123123);
    navigate(props.url)
  }

  return (
    <div className={isActive ? 'progress-item--active' : 'progress-item'} onClick={handleRedirect} style={{ cursor: 'pointer' }}>
      <div className="number">
        {props.value}
        <div className="circle"></div>
      </div>
      <div className="text d-flex" style={{ alignSelf: 'center' }}>{props.children}</div>
    </div>
  )
}

export default Item
