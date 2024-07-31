import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/types';
import EducationSampleRefModal from '../EducationSampleRefModal';

const ModalCollection: React.FC = () => {
  const modalsState = useSelector((state: RootState) => state.UI.modals);

  return (
    <>
      {<EducationSampleRefModal visible={modalsState.educationSampleRefVisible}></EducationSampleRefModal>}
    </>
  )
}

export default ModalCollection
