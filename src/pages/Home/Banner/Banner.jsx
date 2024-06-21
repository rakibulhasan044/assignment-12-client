import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import slider1 from '../../../assets/home-banner1.jpg'
import slider2 from '../../../assets/home-banner2.jpg'
import slider3 from '../../../assets/home-banner3.jpg'

const Banner = () => {
  return (
    <div>
      <Carousel
      autoPlay={true}
      interval={3000}
      infiniteLoop
      stopOnHover
      swipeable
      showStatus={false}
      showArrows>
        <div className="relative text-black">
          <img className="" src={slider1} />
          <div className=" absolute inset-0 flex flex-col items-start top-[10%] md:top-[20%]">
            <h3 className="text-2xl md:text-3xl font-semibold px-2 md:px-10">
                Healthy Inside,<br/>
            </h3>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold px-2 md:px-10 py-2">
                Fresh <span className=" text-green-400">Outside</span>
            </h3>
            <p className="px-2 md:px-10 md:text-xl text-gray-500 lg:pt-5">We deliver healthy food that are ready to <br/>
            eat.Just choose your own menu you like.</p>
          </div>
        </div>
        <div className="relative text-black">
          <img src={slider3} />
          <div className=" absolute inset-0 flex flex-col items-center top-[10%] md:top-[15%]">
          <h3 className="text-xl md:text-3xl lg:text-4xl font-semibold px-2 md:px-10 py-2">Healthy Food Comes From<br/><span className="text-green-400">Healthy Ingredients</span></h3>
          <p className="px-2 md:px-10 md:text-xl text-gray-500 lg:pt-5">We deliver healthy food that are ready to <br/>
            eat.Just choose your own menu you like.</p>
          </div>
        </div>
        <div className="relative text-black">
          <img src={slider2} />
          <div className="absolute inset-0 flex flex-col items-end top-[10%] md:top-[20%]">
            <h3 className="text-xl md:text-3xl lg:text-4xl font-semibold px-2 md:px-10 py-2">Healthy Food For, <br />
            <span className="text-green-400">All Day Long</span></h3>
            <p className="px-2 md:px-10 md:text-xl text-gray-500 lg:pt-5">We deliver healthy food that are ready to <br/>
            eat.Just choose your own menu you like.</p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
