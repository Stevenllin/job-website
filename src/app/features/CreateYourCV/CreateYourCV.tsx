import React from 'react';
import { useLocation } from 'react-router-dom';
import CreateYourCVRoutes from './CreateYourCVRoutes';
import ProgressBar from '../../common/components/CompoundComponent/ProgressBar';
import { ProcessStepTextEnum, ProcessRouteMatchesStep, ProccessStepCodesEnum } from './types';

const CreateYourCV: React.FC = () => {
  const routerLocation = useLocation();
  return (
    <ProgressBar
      currentStep={ProcessRouteMatchesStep[routerLocation.pathname]}
      step={[
        { title: ProcessStepTextEnum.ChooseTemplate, value: ProccessStepCodesEnum.ChooseTemplate, visible: true },
        { title: ProcessStepTextEnum.GeneralInfo, value: ProccessStepCodesEnum.GeneralInfo, visible: true },
        { title: ProcessStepTextEnum.WorkHistory, value: ProccessStepCodesEnum.WorkHistory, visible: true },
        { title: ProcessStepTextEnum.Education, value: ProccessStepCodesEnum.Education, visible: true },
        { title: ProcessStepTextEnum.Skills, value: ProccessStepCodesEnum.Skills, visible: true },
        { title: ProcessStepTextEnum.Summary, value: ProccessStepCodesEnum.Summary, visible: true },
        { title: ProcessStepTextEnum.Finalize, value: ProccessStepCodesEnum.Finalize, visible: true },
      ]}
    >
      <CreateYourCVRoutes />
    </ProgressBar>
  )
}

export default CreateYourCV
