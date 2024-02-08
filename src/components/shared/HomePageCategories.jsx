import { useState, useEffect } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import api from "../authorization/api";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import './Style/style.css'


const HomePageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(5);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/products/add-on-category/get/list");
        setCategories(response.data.categories);
      } catch (error) {
        console.log("failed to get categories");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        setVisibleSlides(4);
      } else if (screenWidth < 768) {
        setVisibleSlides(4);
      } else if (screenWidth < 1024) {
        setVisibleSlides(8);
      } else {
        setVisibleSlides(8);
      }
    };

    handleResize(); // Call the function initially to set the correct number of visible slides
    window.addEventListener("resize", handleResize); // Add event listener for window resize
    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener
    };
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === categories.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBack = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="container mx-auto">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={categories.length}
        visibleSlides={visibleSlides} // Use the dynamic number of visible slides
        currentSlide={activeIndex}
      >
        <Slider>
          {categories.map((category, index) => (
            <Slide index={index} key={category._id}>
              <img
                src={category.image}
                alt={category.title}
                className="cursor-pointer w-40 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              />
            </Slide>
          ))}
        </Slider>
        <div className="arrow">
          <ButtonBack onClick={handleBack}>
            <FaLongArrowAltLeft />
          </ButtonBack>
          <ButtonNext onClick={handleNext}>
            <FaLongArrowAltRight />
          </ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  );
};

export default HomePageCategories;
