import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useUrl = () => {
  const location = useLocation();

  useEffect(() => {
    (async() => {
      console.log('location', location);

    })()
  }, [location])

  return location;
}

export default useUrl;