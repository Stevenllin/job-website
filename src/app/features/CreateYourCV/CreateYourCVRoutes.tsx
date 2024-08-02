import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../../core/enums/router';
import ChooseTemplate from './ChooseTemplate';
import GeneralInfo from './GeneralInfo';
import WorkHistory from './WorkHistory';
import WorkSummary from './WorkSummary';
import Education from './Education';
import Skills from './Skills';
import Summary from './Summary';
import Finalize from './Finalize';

const CreateYourCVRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.FEATURES__CREATE_YOUR_CV__CHOOSE_TEMPLATE} element={<ChooseTemplate/>} />
      <Route path={ROUTES.FEATURES__CREATE_YOUR_CV__GENERAL_INFO} element={<GeneralInfo/>} />
      <Route path={ROUTES.FEATURES__CREATE_YOUR_CV__WORK_HISTORY} element={<WorkHistory/>} />
      <Route path={ROUTES.FEATURES__CREATE_YOUR_CV__WORK_SUMMARY} element={<WorkSummary/>} />
      <Route path={ROUTES.FEATURES__CREATE_YOUR_CV__EDUCATION} element={<Education/>} />
      <Route path={ROUTES.FEATURES__CREATE_YOUR_CV__SKILLS} element={<Skills/>} />
      <Route path={ROUTES.FEATURES__CREATE_YOUR_CV__SUMMARY} element={<Summary/>} />
      <Route path={ROUTES.FEATURES__CREATE_YOUR_CV__FINALIZE} element={<Finalize/>} />
      <Route path='*' element={<Navigate to={ROUTES.FEATURES__CREATE_YOUR_CV__CHOOSE_TEMPLATE} />} />
    </Routes>
  )
}

export default CreateYourCVRoutes;