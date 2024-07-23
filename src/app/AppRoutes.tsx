import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Features from './features/Features';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Features />} />  
      </Routes>
    </Router>
  )
}

export default AppRoutes
