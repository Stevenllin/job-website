import { Navigate } from 'react-router-dom';
import { CreateTemplateGuardProps } from './types';
import useGetCreateTemplateStep from '../../hooks/useGetCreateTemplateStep';
import { ProcessRouteMatchesStep } from '../../../features/CreateYourCV/types';

const CreateTemplateGuard: React.FC<CreateTemplateGuardProps> = ({ children }) => {
  const {targetStep, currentStep} = useGetCreateTemplateStep();
  
  if (targetStep === currentStep) {
    return children;
  }
  if (targetStep) {
    let redirectTo = '/create-your-cv/choose-template';
    Object.entries(ProcessRouteMatchesStep).forEach(([key, val]) => {
      if (String(targetStep) === val) {
        redirectTo = key;
      }
    });
    
    /** 需要將 Navigation 放入 return 中 */
    return <Navigate to={redirectTo} replace />
  }
};

export default CreateTemplateGuard;