import React from 'react';
import { CheckItemProps } from './types';
import { FaSquarePlus } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import { IconSizeEnum } from '../../../core/enums/icon';

const CheckItem: React.FC<CheckItemProps> = (props) => {
  return (
    <div className="check-item-container fs-3">
      {
        props.item.checked ?
        <FaCheckSquare style={{ fill: '#0766bc', 'fontSize': IconSizeEnum.Large }} onClick={() => props.onCheck(props.item)} />
        :
        <FaSquarePlus style={{ 'fontSize': IconSizeEnum.Large }} onClick={() => props.onCheck(props.item)} />
      }
      <div>
        <p className="fs-2 fw-dark">{props.name}</p>
        <span className="fs-1">{props?.type}</span>
      </div>
    </div>
  )
}

export default CheckItem;