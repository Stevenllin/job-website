import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import CreateYourCV from './CreateYourCV';
import FindJobs from './FindJobs';
import SalaryInfomation from './SalaryInfomation';
import Faq from './Faq';

const FeaturesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-your-cv" element={<CreateYourCV />} />
      <Route path="/find-jobs" element={<FindJobs />} />
      <Route path="/salary-information" element={<SalaryInfomation />} />
      <Route path="/faq" element={<Faq />} />
    </Routes>
  )
}

export default FeaturesRoutes
