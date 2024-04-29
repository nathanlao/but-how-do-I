import { useState, useEffect } from 'react';

const Title = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    let dotCount = 0;
    const interval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      let dots = '';
      for (let i = 0; i < dotCount; i++) {
        dots += '.';
      }
      setDots(dots);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="title-text h-screen font-mono disable-select -z-10">
      <div className="h-1/2 relative -z-10">
        <div className="absolute bottom-0 text-2xl pl-7 pb-5">
          I am pursuing a CS degree
        </div>
      </div>
      <div className="h-1/2 relative -z-10">
        <div className="absolute text-5xl pl-5 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          BUT HOW DO I {dots}
        </div>
      </div>
    </div>
  );
};

export default Title;
