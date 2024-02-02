import { HeroImage } from "../components/shared/HeroImage";
import burgerImage from "../assets/stickyBurgerhalf.png";
import "../components/shared/Style/style.css";
import { RestaurantCard } from "../components/shared/RestaurantCard";

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
      <div className="flex justify-center  bg-gray-300 py-14">
        <h1 className="text-4xl font-bold">Categories</h1>
      </div>
      <div className=" container mx-auto columns-3 mt-20">
        <RestaurantCard />
      </div>
    </div>
  );
};

export default Home;
