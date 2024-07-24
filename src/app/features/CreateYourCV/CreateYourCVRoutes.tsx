import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../../core/enums/routerPath';
import ChooseTemplate from './ChooseTemplate';

const CreateYourCVRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={ROUTES.FEATURES__CREATE_YOUR_CV__CHOOSE_TEMPLATE} element={<ChooseTemplate />} />
      <Route path='*' element={<Navigate to={ROUTES.FEATURES__CREATE_YOUR_CV__CHOOSE_TEMPLATE} />} />
    </Routes>
  )
}

export default CreateYourCVRoutes;