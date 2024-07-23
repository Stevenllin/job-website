import React from 'react'
import Header from '../Header'
import { MainLayoutProps } from './types';

/**
 * 
 * @description 主要共用 Layout、路由
 */
const MainLayout: React.FC<MainLayoutProps> = (props) => {
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
