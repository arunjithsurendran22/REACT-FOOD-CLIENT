import { Categories } from "../components/shared/Categories";
import { HeroImage } from "../components/shared/HeroImage";
import Restaurant from "../components/shared/Restaurant";
import Products from "../components/shared/Products";
import burgerImage from "../assets/stickyBurgerhalf.png";
import "../components/shared/Style/style.css";

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
      <div className="flex justify-center my-10">
        <Categories />
      </div>
      <div className="flex justify-center  bg-gray-300 py-14">
        <h1 className="text-4xl font-bold">Popular Restaurant</h1>
      </div>
      <div className="flex justify-center mt-10">
        <Restaurant />
      </div>
      <div className="flex justify-center">
        <Products />
      </div>
    </div>
  );
};

export default Home;
