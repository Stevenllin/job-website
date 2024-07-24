import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './assets/sass/app.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
