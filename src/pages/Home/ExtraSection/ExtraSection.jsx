import Lottie from "lottie-react";
import b from "../../../assets/animation/b.json";
import d from "../../../assets/animation/d.json";
import e from "../../../assets/animation/e.json";

const ExtraSection = () => {
  return (
    <div>
      <h2 className=" md:mb-5 mt-8 text-center text-3xl font-bold">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <Lottie className="md:-mt-10 h-[300px] md:h-auto" animationData={e} loop={true} />
          <h4 className="text-green-500 text-xl text-center py-4 font-medium">
            Choose Your Favorite
          </h4>
          <p className="text-center">
            Choose your favorite meals and order online or by phone. It is easy
            to customize your order.
          </p>
        </div>
        <div>
          <Lottie className="h-[300px] md:h-auto" animationData={d} loop={true} />
          <h4 className="text-green-500 text-xl text-center pt-5 pb-4 lg:pt-10 font-medium">
            We Deliver Your Meals
          </h4>
          <p className="text-center">
            We will delivery  your food within 20 - 30 minutes depends on the distance and processing time.
          </p>
        </div>
        <div>
          <Lottie className="md:-mt-10 h-[300px] md:h-auto" animationData={b} loop={true} />
          <h4 className="text-green-500 text-xl text-center py-4 font-medium">
            Eat and Enjoy
          </h4>
          <p className="text-center">
            Enjoy your favourites food with us. Do not forget to rate us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtraSection;
