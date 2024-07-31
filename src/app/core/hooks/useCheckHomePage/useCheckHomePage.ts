import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../enums/routerPath';

const useCheckHomePage = () => {
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState<boolean>(false)

  useEffect(() => {
    (async() => {
      const pathname = location.pathname;
      setIsHomePage(pathname === ROUTES.FEATURES__HOME)
    })()
  }, [location.pathname])

  return isHomePage;
}

export default useCheckHomePage;