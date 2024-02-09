import { HeroImage } from "../components/shared/HeroImage";
import burgerImage from "../assets/stickyBurgerhalf.png";
import "../components/shared/Style/style.css";
import HomePageCategories from "../components/shared/HomePageCategories";

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
      <div className="mt-10">
        <HomePageCategories />
      </div>
    </div>
  );
};

export default Home;
