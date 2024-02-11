import burgerImage from "../../assets/burger-8TCokDPn (1).png";
import bgImage from "../../assets/bg-v1QzD1cj.png";
import "../../components/shared/Style/style.css";

export function HeroImage() {
  return (
    <div className="bg-green-600 grid grid-cols-2 container mx-auto  md:h-screen/1.25">
      <div className="flex flex-col justify-center text-2xl  md:font-extrabold md:text-4xl lg:text-5xl mx-auto hero-text">
        <h1>We believe good food</h1>
        <h1>Offers great smiles</h1>
      </div>
      <div>
        <img src={bgImage} alt="" className="relative h-full" />
        <img
          src={burgerImage}
          alt={burgerImage}
          className="absolute top-20 w-4/12  shake-animation"
        />
      </div>
    </div>
  );
}
