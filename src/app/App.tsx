import React from 'react'
import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  )
}

export default App
