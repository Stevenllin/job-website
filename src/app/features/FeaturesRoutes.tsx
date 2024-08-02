import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../core/enums/router';
import Home from './Home';
import CreateYourCV from './CreateYourCV';
import FindJobs from './FindJobs';
import SalaryInfomation from './SalaryInfomation';
import Faq from './Faq';

const FeaturesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.FEATURES__HOME} element={<Home />} />
      <Route path="*" element={<CreateYourCV />} />
      <Route path={ROUTES.FEATURES__FIND_JOBS} element={<FindJobs />} />
      <Route path={ROUTES.FEATURES__SALARY_INFORMATION} element={<SalaryInfomation />} />
      <Route path={ROUTES.FEATURES__FAQ} element={<Faq />} />
    </Routes>
  )
}

export default FeaturesRoutes
