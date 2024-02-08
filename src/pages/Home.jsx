import { HeroImage } from "../components/shared/HeroImage";
import burgerImage from "../assets/stickyBurgerhalf.png";
import "../components/shared/Style/style.css";
import { RestaurantCard } from "../components/shared/RestaurantCard";
import SwiperCard from "../components/shared/SwiperCard";

const Home = () => {
  return (
    <div className="relative">
      <div>
        <img
          src={burgerImage}
          alt=""
          className="absolute bottom-3/4 hidden md:block"
        />
      </div>
      <div>
        <HeroImage className="relative" />
      </div>
      <div className="  flex flex-col justify-center items-center h-52">
        <SwiperCard />
      </div>
      <div>
        <RestaurantCard />
      </div>
    </div>
  );
};

export default Home;
