import { useEffect, useState } from 'react';
import './FadeInWrapper.css';

const FadeInWrapper = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={`fade-in ${isMounted ? 'visible' : ''}`}>{children}</div>
  );
};

export default FadeInWrapper;
