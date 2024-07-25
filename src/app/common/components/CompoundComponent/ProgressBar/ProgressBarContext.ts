import React from 'react';
import { ProgressBarContextValues } from './types';

const ProgressBarContext = React.createContext<ProgressBarContextValues>({
  currentStep: '1'
})

export default ProgressBarContext;