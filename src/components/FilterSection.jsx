import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import { IoFastFood } from "../assets/icons";
import { useSelector } from "react-redux";
import { staggerFadeInOut } from "../animations";
import { statuses } from "../utils/styles";
import SliderCard from "./SliderCard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// import { useDispatch, useSelector } from "react-redux";

import "./styles.css";

const FilterSection = ({ noimage, reference }) => {
  const scollToRef = useRef();

  const [cartdata, setCartdata] = useState([]);
  const productsList = useSelector((state) => state.productsList);
  const autoplayOptions = {
    delay: 2000,
    stopOnInteraction: false,
    rootNode: (emblaRoot) => emblaRoot.parentElement,
  };

  const [category, setCategory] = useState("پیشنهاد ما");
  const products = useSelector((state) => state.products);
  const emptycart = products
    ? products.filter((data) => data.category === category)
    : [{}];

  const number = emptycart.length;

  const [emblaRef] = useEmblaCarousel({ dragFree: true, direction: "rtl" }, [
    Autoplay(autoplayOptions),
  ]);
  return (
    <motion.div
      className="w-full flex items-start justify-start flex-col  pt-14 "
      ref={reference}
    >
      <div className=" w-full flex items-center justify-between ">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-2xl text-headingColor font-medium">
            از منوی زیر انتخاب کنید
          </p>
          <div className="w-40 h-1 rounded-md bg-orange-500"></div>
        </div>
      </div>

      <div className="embla   h-52 pt-4   w-full" ref={emblaRef}>
        <div className="embla__container">
          {productsList &&
            productsList.map((data, i) => (
              <FilterCard
                key={data._id}
                data={data}
                category={category}
                setCategory={setCategory}
                index={i}
              />
            ))}
        </div>
      </div>
      <div className=" w-full flex items-center  justify-center flex-wrap gap-4 mb-72  ">
        {products &&
          products
            .filter((data) => data.category === category)
            .concat({ product_name: "dd" })
            .map((data, i) => (
              <SliderCard
                showBackToTheTop={true}
                cartdata={cartdata}
                setCartdata={setCartdata}
                key={i}
                data={data}
                index={i}
                reference={reference}
                number={number}
                noimage={noimage}
              />
            ))}
      </div>
    </motion.div>
  );
};

export const FilterCard = ({ data, index, category, setCategory }) => {
  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      onClick={() => setCategory(data.category_name)}
      className={`group w-28 min-w-[128px] cursor-pointer rounded-md    embla__slide "  gap-2 px-8 py-6 ${
        category === data.category_name ? "bg-red-500 " : "bg-primary"
      } hover:bg-red-500 shadow-md flex flex-col items-center justify-center gap-4`}
    >
      <div
        className={`w-10 h-10  rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${
          category === data.category_name ? "bg-primary" : "bg-red-500"
        }`}
      >
        <IoFastFood
          className={`${
            category === data.category_name ? "text-red-500" : "text-primary"
          } group-hover:text-red-500`}
        />
      </div>
      <p
        className={` text-base font-medium  ${
          category === data.category_name ? "text-primary" : "text-textColor"
        } group-hover:text-primary`}
      >
        {data.category_name}
      </p>
    </motion.div>
  );
};

export default FilterSection;
