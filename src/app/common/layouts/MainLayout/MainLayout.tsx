import React, { useEffect } from 'react'
import Header from '../Header'
import { useDispatch } from 'react-redux';
import { initFetchCommonDataAction } from '../../../store/common/actions';
import { MainLayoutProps } from './types';
import { CommonActions } from '../../../store/common/types'
/**
 * 
 * @description 主要共用 Layout、路由
 */
const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const reduxDispatch = useDispatch();
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
    </>
  )
}

export default MainLayout
