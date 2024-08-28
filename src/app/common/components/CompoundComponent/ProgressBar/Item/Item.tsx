import React, { useContext } from 'react'
import { ItemProps } from './types';
import ProgressBarContext from '../ProgressBarContext';
import { useNavigate } from 'react-router-dom';
import storageService from '../../../../../core/services/storageService';
import { StorageKeysEnum } from '../../../../../core/enums/storage';
import { BiSolidError } from "react-icons/bi";
import { IconSizeEnum } from '../../../../../core/enums/icon';

const Item: React.FC<ItemProps> = (props) => {
  const progressBarContext = useContext(ProgressBarContext);
  const isActive = progressBarContext.currentStep === props.value;
  const navigate = useNavigate()
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
  /** 取得 Error */
  const data = cache[props.children]
  let errors = false;
  /** 如果為陣列（Work History） */
  if (Array.isArray(data)) {
    errors = data.some(item => item.errors && item.errors.length > 0);
  } else if (data?.errors) {
    errors = true
  }

  const handleRedirect = () => {
    navigate(props.url)
  }

  return (
    <>
      <div className={(errors ? 'mt-4 mb-2 ' : 'mt-4 mb-4 ') + (isActive ? 'progress-item--active' : 'progress-item')} onClick={handleRedirect} style={{ cursor: 'pointer' }}>
        <div className="number">
          {props.value}
          <div className="circle"></div>
        </div>
        <div className="text d-flex" style={{ alignSelf: 'center' }}>{props.children}</div>
        <br/>      
      </div>
      {
        errors && (
          <div className="mb-2 fs-1 text-center d-flex align-center" style={{ color: 'red', fontWeight: 'bold' }}>
            <BiSolidError style={{ fontSize: IconSizeEnum.Medium }} />
            <span className="ms-2">Missing information</span>
          </div>
        )
      }
    </>
  )
}

export default Item
