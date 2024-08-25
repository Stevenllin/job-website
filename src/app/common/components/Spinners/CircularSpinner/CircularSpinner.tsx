import React from 'react';
import { useSelector } from 'react-redux';
import Circular from '../LoadingCollection/Circular';
import { RootState } from '../../../../store/types';

const CircularSpinner: React.FC = () => {
  /** 取得 Spinner 的狀態 */
  const spinnerState = useSelector((state: RootState) => state.UI.spinners);
  console.log('spinnerState', spinnerState)
  return (
    <>
      <Circular visible={spinnerState.visible} />
    </>
  );
};

export default CircularSpinner;
