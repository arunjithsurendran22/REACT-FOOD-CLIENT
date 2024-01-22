import burgerImage from "../../assets/burger-8TCokDPn (1).png";
import bgImage from "../../assets/bg-v1QzD1cj.png";
import "../../components/shared/Style/style.css";
import { Button } from "@material-tailwind/react";

export function HeroImage() {
  return (
    <div className="flex flex-col md:flex-row justify-between md:bg-white h-96 md:h-fit">
      <div className="flex flex-col justify-around w-full  md:w-6/12" >
        <div className="flex flex-col justify-between h-40 md:h-96  items-center">
          <div className="text-2xl lg:text-7xl font-light italic">
            <h1>We believe good food</h1>
            <h1>Offers great smiles</h1>
          </div>
          <div>
            <Button
              className="px-6 md:px-20 py-4"
              style={{ background: "#ee2737" }}
            >
              Click
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-6/12" >
        <img
          src={bgImage}
          alt=""
          className="relative w-fit t hidden md:block"
        />
        <img
          src={burgerImage}
          alt=""
          className="absolute top-52 w-5/12  shake-animation"
        />
      </div>
    </div>
  );
}
