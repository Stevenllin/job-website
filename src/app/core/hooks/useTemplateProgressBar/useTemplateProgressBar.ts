import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import storageService from '../../services/storageService';
import { StorageKeysEnum } from '../../enums/storage';
import { ProcessStepTextEnum } from '../../../features/CreateYourCV/types';

const useTemplateProgressBar = () => {
  const location = useLocation();
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  useEffect(() => {
    /** 儲存已驗證成功的頁面 */
    const valid: string[] = [];

    Object.entries(cache).forEach((item: any) => {
      if (!Array.isArray(item[1])) {
        /** 若不是 GeneralInfo */
        const { errors }  = item[1]
        /** 若驗證成功 */
        if (!errors || (errors && errors.length === 0)) valid.push(item[0])
      } else {
        /** 若是，Work History */
        /** 檢查其中 errors 是否含有錯誤欄位 */
        const isContainError = item[1].some(elem => elem.errors && elem.errors.length !== 0);
        if (!isContainError) valid.push(item[0]);
      }
    })
    setCurrentProgress(Math.ceil((valid.length/Object.keys(ProcessStepTextEnum).length)*100))
  }, [location.pathname])

  return currentProgress;
}

export default useTemplateProgressBar;