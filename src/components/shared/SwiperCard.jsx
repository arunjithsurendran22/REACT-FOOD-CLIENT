import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";
import { Pagination } from "swiper/modules";
import api from "../authorization/api";

export default function SwiperCard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/products/add-on-category/get/list");
        setCategories(response.data.categories);
        console.log(response.data);
      } catch (error) {
        console.log("failed to get categories");
      }
    };
    fetchCategories();
  }, []);

  return (
    <Swiper
      slidesPerView={10}
      spaceBetween={12}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 5, spaceBetween: 20 },
        768: { slidesPerView: 5, spaceBetween: 40 },
        1024: { slidesPerView: 5, spaceBetween: 50 },
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {/* Map over the array of categories and render each image */}
      {categories.map((category) => (
        <SwiperSlide key={category._id}>
          <img src={category.image} alt={category.productTitle} className="" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
