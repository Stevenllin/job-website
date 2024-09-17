import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import storageService from '../../services/storageService';
import { StorageKeysEnum } from '../../enums/storage';
import { ProcessStepTextEnum } from '../../../features/CreateYourCV/types';
import commonService from '../../services/commonService';

const useTemplateProgressBar = () => {
  const location = useLocation();
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
  const [currentProgress, setCurrentProgress] = useState<number>(0);

  useEffect(() => {
    /** 儲存已驗證成功的頁面 */
    const valid: string[] = commonService.handleCheckTemplatePage(cache, true)
    setCurrentProgress(Math.ceil((valid.length/(Object.keys(ProcessStepTextEnum).length-1))*100))
  }, [location.pathname])

  return currentProgress;
}

export default useTemplateProgressBar;