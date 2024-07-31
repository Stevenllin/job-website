import React, { useEffect } from 'react'
import Header from '../Header'
import { initFetchCommonDataAction } from '../../../store/common/actions';
import { MainLayoutProps } from './types';
import useAppDispatch from '../../../core/hooks/useAppDispatch';
import ModalCollection from '../../components/Modals/ModalCollection';

/**
 * 
 * @description 主要共用 Layout、路由
 */
const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const reduxDispatch = useAppDispatch();
  /**
   * @description 組件初始化後執行的 Effect
  */
   useEffect(() => {
    reduxDispatch(initFetchCommonDataAction());
  }, [reduxDispatch]);

  return (
    <>
      {/** 引用共用 Header */}
      <Header />
      {/** 引用整個路由 */}
      <main>
        {props.children}
      </main>
      <ModalCollection />
    </>
  )
}

export default MainLayout
