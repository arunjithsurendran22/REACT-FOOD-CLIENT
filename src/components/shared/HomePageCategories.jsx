import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import api from "../authorization/api";

const HomePageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [numCategoriesToShow, setNumCategoriesToShow] = useState(3);

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

  const next = () => {
    setActiveIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  const prev = () => {
    setActiveIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const handleResize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1100) {
      setNumCategoriesToShow(10);
    } else if (screenWidth >= 1000) {
      setNumCategoriesToShow(6);
    } else if (screenWidth >= 768) {
      setNumCategoriesToShow(5);
    } else if (screenWidth >= 640) {
      setNumCategoriesToShow(4);
    } else {
      setNumCategoriesToShow(3);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleCategories = categories.slice(
    activeIndex,
    activeIndex + numCategoriesToShow
  );

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={
          categories.length <= numCategoriesToShow || activeIndex === 0
        }
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2 flex-wrap">
        {visibleCategories.map((category, index) => (
          <img
            key={index}
            src={category.image}
            alt={category.title}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-40 rounded-full cursor-pointer"
            onClick={() => setActiveIndex(activeIndex + index)}
          />
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={
          categories.length <= numCategoriesToShow ||
          activeIndex === categories.length - numCategoriesToShow
        }
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default HomePageCategories;
