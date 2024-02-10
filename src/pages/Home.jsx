import { HeroImage } from "../components/shared/HeroImage";
import "../components/shared/Style/style.css";
import HomePageCategories from "../components/shared/HomePageCategories";
import Footer from "../components/shared/Footer";

const Home = () => {
  return (
    <div className="relative">
      <div>
        <HeroImage className="relative" />
      </div>
      <div className="mt-10">
        <HomePageCategories />
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
