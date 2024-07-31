import React from 'react';
import { useLocation } from 'react-router-dom';
import CreateYourCVRoutes from './CreateYourCVRoutes';
import ProgressBar from '../../common/components/CompoundComponent/ProgressBar';
import { ProcessStepTextEnum, ProcessRouteMatchesStep, ProcessStepCodesEnum } from './types';
import { ROUTES } from '../../core/enums/routerPath';

const CreateYourCV: React.FC = () => {
  const routerLocation = useLocation();

  return (
    <ProgressBar
      currentStep={ProcessRouteMatchesStep[routerLocation.pathname]}
      step={[
        { url: ROUTES.FEATURES__CREATE_YOUR_CV__CHOOSE_TEMPLATE, title: ProcessStepTextEnum.ChooseTemplate, value: ProcessStepCodesEnum.ChooseTemplate, visible: true },
        { url: ROUTES.FEATURES__CREATE_YOUR_CV__GENERAL_INFO, title: ProcessStepTextEnum.GeneralInfo, value: ProcessStepCodesEnum.GeneralInfo, visible: true },
        { url: ROUTES.FEATURES__CREATE_YOUR_CV__WORK_HISTORY, title: ProcessStepTextEnum.WorkHistory, value: ProcessStepCodesEnum.WorkHistory, visible: true },
        { url: ROUTES.FEATURES__CREATE_YOUR_CV__EDUCATION, title: ProcessStepTextEnum.Education, value: ProcessStepCodesEnum.Education, visible: true },
        { url: ROUTES.FEATURES__CREATE_YOUR_CV__SKILLS, title: ProcessStepTextEnum.Skills, value: ProcessStepCodesEnum.Skills, visible: true },
        { url: ROUTES.FEATURES__CREATE_YOUR_CV__SUMMARY, title: ProcessStepTextEnum.Summary, value: ProcessStepCodesEnum.Summary, visible: true },
        { url: ROUTES.FEATURES__CREATE_YOUR_CV__FINALIZE, title: ProcessStepTextEnum.Finalize, value: ProcessStepCodesEnum.Finalize, visible: true },
      ]}
    >
      <CreateYourCVRoutes />
    </ProgressBar>
  )
}

export default CreateYourCV
