import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../core/enums/router';
import CircularSpinner from '../common/components/Spinners/CircularSpinner';

const FeaturesRoutes: React.FC = () => {
  const Home = lazy(() => import('./Home'));
  const CreateYourCV = lazy(() => import('./CreateYourCV'));
  const FindJobs = lazy(() => import('./FindJobs'));
  const SalaryInformation = lazy(() => import('./SalaryInformation'));
  const Faq = lazy(() => import('./Faq'));

  return (
    <Suspense fallback={<CircularSpinner />}>
      <Routes>
        <Route path={ROUTES.FEATURES__HOME} element={<Home />} />
        <Route path="*" element={<CreateYourCV />} />
        <Route path={ROUTES.FEATURES__FIND_JOBS} element={<FindJobs />} />
        <Route path={ROUTES.FEATURES__SALARY_INFORMATION} element={<SalaryInformation />} />
        <Route path={ROUTES.FEATURES__FAQ} element={<Faq />} />
      </Routes>
    </Suspense>
  )
}

export default FeaturesRoutes
