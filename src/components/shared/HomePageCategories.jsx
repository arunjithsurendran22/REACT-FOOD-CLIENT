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
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import RestaurantCard from "../shared/RestaurantCard";
import { useNavigate } from "react-router-dom";

const HomePageCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(5);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/products/add-on-category/get/list");
        setCategories(response.data.categories);
      } catch (error) {
        console.log("Failed to get categories");
      }
    };

    fetchCategories();
  }, []);

  const handleClick = async (categoryId) => {
    try {
      const response = await api.get(
        `/products/add-on-category/get-vendor-List/${categoryId}`
      );
      setCategoriesData(response.data.formattedData);
      setSelectedCategoryId(categoryId); // Set the selected category ID
    } catch (error) {
      console.log("Failed to fetch vendor data");
    }
  };

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
        setVisibleSlides(10);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleVendorPage = (vendorId) => {
    navigate(`/vendor-page/${vendorId}`);
  };

  return (
    <div className="container mx-auto">
      {/* Category carousel */}
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={categories.length}
        visibleSlides={visibleSlides}
        currentSlide={activeIndex}
      >
        <Slider>
          {categories.map((category, index) => (
            <Slide index={index} key={category._id}>
              <img
                src={category.image}
                alt={category.title}
                className="cursor-pointer w-32   shadow-md hover:shadow-xl transition duration-300"
                onClick={() => handleClick(category._id)}
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

      {/* Category items */}
      {selectedCategoryId && (
        <div>
          <div className="grid grid-cols-2 mx-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-10 pb-20 ">
            {categoriesData.map((vendor) => (
              <div
                className="cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg "
                key={vendor.id}
                onClick={() => handleVendorPage(vendor.vendorId)}
              >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden h-60 md:h-72">
                  <img
                    src={vendor.backgroundImage}
                    alt={vendor.name}
                    className="w-full h-32 md:h-36 object-cover object-center"
                  />
                  <div className="p-2 flex flex-col justify-between md:h-32">
                    <h2 className="text-gray-900 text-xs md:text-lg font-bold mb-2">
                      {vendor.name}
                    </h2>
                    <p className="text-gray-600 text-xs md:text-sm mb-2">
                      {vendor.address.street}, {vendor.address.state}
                    </p>
                    <div>
                      <p className="text-gray-600 text-xs mb-2">
                        {vendor.workingHours.map((hour) => (
                          <span key={hour.day}>
                            {hour.day}: {hour.openingHours} {hour.openingState}{" "}
                            - {hour.closingHours} {hour.closingState}
                            <br />
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Default items */}
      {!selectedCategoryId && (
        <div>
          <RestaurantCard />
        </div>
      )}
    </div>
  );
};

export default HomePageCategories;
