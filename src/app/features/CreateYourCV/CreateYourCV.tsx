import React from 'react';
import { useLocation } from 'react-router-dom';
import CreateYourCVRoutes from './CreateYourCVRoutes';
import ProgressBar from '../../common/components/CompoundComponent/ProgressBar';
import { ProcessStepTextEnum, ProcessRouteMatchesStep, ProcessStepCodesEnum } from './types';

const CreateYourCV: React.FC = () => {
  const routerLocation = useLocation();

  return (
    <ProgressBar
      currentStep={ProcessRouteMatchesStep[routerLocation.pathname]}
      step={[
        { title: ProcessStepTextEnum.ChooseTemplate, value: ProcessStepCodesEnum.ChooseTemplate, visible: true },
        { title: ProcessStepTextEnum.GeneralInfo, value: ProcessStepCodesEnum.GeneralInfo, visible: true },
        { title: ProcessStepTextEnum.WorkHistory, value: ProcessStepCodesEnum.WorkHistory, visible: true },
        { title: ProcessStepTextEnum.Education, value: ProcessStepCodesEnum.Education, visible: true },
        { title: ProcessStepTextEnum.Skills, value: ProcessStepCodesEnum.Skills, visible: true },
        { title: ProcessStepTextEnum.Summary, value: ProcessStepCodesEnum.Summary, visible: true },
        { title: ProcessStepTextEnum.Finalize, value: ProcessStepCodesEnum.Finalize, visible: true },
      ]}
    >
      <CreateYourCVRoutes />
    </ProgressBar>
  )
}

export default CreateYourCV
