import { useState, useEffect, useMemo } from "react";
import storageService from "../../services/storageService";
import { StorageKeysEnum } from '../../../core/enums/storage';
import { useLocation } from 'react-router-dom';
import { ProcessStepTextMatchesCodes, ProcessRouteMatchesStep } from '../../../features/CreateYourCV/types';

const useGetCreateTemplateStep = () => {
  const location = useLocation();
  /** 取得緩存 */
  const cache = JSON.parse(storageService.getItem(StorageKeysEnum.Template) ?? '{}');
  const cacheKeys: string[] = Object.keys(cache);
  const [targetStep, setTargetStep] = useState<number>();
  const path = location.pathname;
  const currentStep = parseInt(ProcessRouteMatchesStep[path])

  /** 將 Enum 為 key 轉換為 string */
  const resultObject = useMemo(() => {
    const obj: Record<string, string> = {};
    Object.entries(ProcessStepTextMatchesCodes).forEach(([key, val]) => {
      obj[key] = val;
    });
    return obj;
  }, []);
  
  /**
   * @description 
   */
  useEffect(() => {
    const sortedHistoryStep = cacheKeys.map(item =>  parseInt(resultObject[item])).sort((a, b) => a - b);

    /** 若尚未訪問過頁面，則轉導至第一 step */
    if (!sortedHistoryStep[sortedHistoryStep.length-1]) {
      setTargetStep(1)
    } else if (currentStep > sortedHistoryStep[sortedHistoryStep.length-1] + 1) {
      /** 若 currentStep 大於最大的 step 的兩階，就沒有權限查看 */
      /** 轉導至最大可訪問的 step */
      setTargetStep(sortedHistoryStep[sortedHistoryStep.length-1])
    } else {
      setTargetStep(currentStep)
    }
  }, [location.pathname])

  
  return {
    targetStep,
    currentStep
  };
}

export default useGetCreateTemplateStep;