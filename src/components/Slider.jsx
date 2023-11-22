import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import { SliderCard } from "../components";

const Slider = ({noimage}) => {
  const products = useSelector((state) => state.products);
  const [fruits, setFruits] = useState(null);
  useEffect(() => {
    setFruits(products?.filter((data) => data.category === "شیک "));
    // console.log(fruits);
  }, [products]);

  return (
    <div className="w-full  pt-3">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        // Responsive breakpoints
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
        // scrollbar={{ draggable: true }}

        centeredSlides={false}
        grabCursor={true}
        className="mySwiper"
      >
        {fruits &&
          fruits.map((data, i) => (
            <SwiperSlide key={data._id}>
              <SliderCard key={data._id} data={data} index={i} number={2}  noimage={noimage}/>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
