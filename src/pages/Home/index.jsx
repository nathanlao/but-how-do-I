import { useState, useEffect } from 'react';
import Title from '../../components/Title';
import PostSection from '../PostSection';
import Footer from '../../components/Footer/Footer';
import './Home.css';

const Home = () => {
  const [blur, setBlur] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [isComponentVisible, setComponentVisible] = useState(false); // Prevent initial rendering flash when scroll to top

  const computeBlurAndOpacity = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const maxBlur = 15;
    const minOpacity = 0;
    const ratio = scrollY / (windowHeight * 0.7);

    const newBlur = Math.min(maxBlur, Math.ceil(ratio * maxBlur));
    const newOpacity = Math.max(minOpacity, 1.5 - ratio);

    setBlur(newBlur);
    setOpacity(newOpacity);
  };

  useEffect(() => {
    const onScroll = () => computeBlurAndOpacity();
    const onResize = () => computeBlurAndOpacity();

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      setComponentVisible(true); // Home page visible when scolling is finished
    }, 500);

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  if (!isComponentVisible) {
    return <div className="disable-display">Loading...</div>;
  }

  return (
    <div className={`fade-in ${isComponentVisible ? 'visible' : ''}`}>
      <div className="h-screen w-screen -z-10"></div>
      <div
        className="fixed top-0 h-screen w-screen -z-10"
        style={{ filter: `blur(${blur}px)`, opacity: opacity }}
      >
        <Title />
      </div>
      <div className="-z-10" style={{ height: '50vh' }}></div>
      <PostSection />
      <div className="text-center mt-1 mb-4 w-full z-50">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
