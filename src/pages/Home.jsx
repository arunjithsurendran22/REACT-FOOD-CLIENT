import { HeroImage } from "../components/shared/HeroImage";
import "../components/shared/Style/style.css";
import HomePageCategories from "../components/shared/HomePageCategories";
import Footer from "../components/shared/Footer";
import { useEffect, useState } from "react";
import { useProfile } from "../components/shared/profile/ProfileProvider";

const Home = () => {
  const { profile, isLoading } = useProfile();
  const [name, setName] = useState("");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (profile && profile.name) {
      setName(profile.name);
      setTimeout(() => {
        setShowContent(true);
      }, 1000);
    }else{
      setShowContent(false)
    }

  }, [profile]);

  return (
    <div className="relative">
      <div className="">
        <HeroImage className="relative" />
      </div>
      {showContent && (
        <div className="justify-center mt-3 container mx-auto welcome-text">
          <div className="flex items-center">
            <p className="md:text-2xl italic font-thin">{name}</p>
            <p className="ml-5 md:font-thin md:text-2xl">
              , what's on your mind?
            </p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <HomePageCategories />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
