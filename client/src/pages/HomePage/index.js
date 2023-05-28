import { Carousel } from 'antd';

import './index.css';

const HomePage = () => {
  return (
    <Carousel waitForAnimate dots={false} autoplay effect="fade" className="homepage--slide">
      <div className="homepage--slide-1 mySlide appear"></div>
      <div className="homepage--slide-2 mySlide"></div>
      <div className="homepage--slide-3 mySlide"></div>
    </Carousel>
  );
};

export default HomePage;
