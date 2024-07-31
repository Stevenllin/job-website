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
    const cacheKeys = Object.keys(cache);
    setCurrentProgress(Math.ceil((cacheKeys.length/Object.keys(ProcessStepTextEnum).length)*100))
  }, [location.pathname])

  return currentProgress;
}

export default useTemplateProgressBar;