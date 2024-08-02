import React, { useContext } from 'react'
import { ItemProps } from './types';
import ProgressBarContext from '../ProgressBarContext';
import { useNavigate } from 'react-router-dom';
import storageService from '../../../../../core/services/storageService';
import { StorageKeysEnum } from '../../../../../core/enums/storage';

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
  console.log('data', data);
  console.log('errors', errors);


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
          <div className="mb-2 fs-1 text-center" style={{ color: 'red' }}>
            Add missing information
          </div>
        )
      }
    </>
  )
}

export default Item
