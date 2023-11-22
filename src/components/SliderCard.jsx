import { motion } from "framer-motion";
import React, {  } from "react";
import { useDispatch, } from "react-redux";
import { buttonClcik, fadeIn } from "../animations";
// import { addNewItemToCart, getAllCartItems } from "../api";
import { IoBasket } from "../assets/icons";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { setCartItems } from "../context/actions/cartAction";
// import noimage from "../assets/img/no-image.png";
import { TbMoodSad } from "react-icons/tb";

import "../assets/css/utilCss.css";

const SliderCard = ({
  data,
  index,
  reference,
  showBackToTheTop,
  number,
  noimage,
}) => {


  const dispatch = useDispatch();

  const sendToCart = (data) => {

    dispatch(alertSuccess("به سبد اضافه شد"));

  
    setInterval(() => {
      dispatch(alertNULL());
    }, 2500);


    dispatch(setCartItems(data));
  };

  return (
    <>
      {number > 0 ? (
        data.product_name !== "dd" ? (
          <motion.div
            {...fadeIn}
            className="bg-lightOverlay  hover:drop-shadow-lg  font-light backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-full md:w-340 md:min-w-350 gap-3"
          >
            <img
              src={data.image ? data.image : noimage}
              className="w-40 h-40 object-contain"
              alt=""
            />
            <div className=" pt-12">
              <p className="text-xl text-headingColor font-semibold">
                {data.product_name}
              </p>
              <p className="text-lg font-semibold text-red-500 flex  items-end justify-end gap-1">
                {parseFloat(data.price)}
                <span>تومان</span>{" "}
              </p>

              <motion.div
                {...buttonClcik}
                onClick={(e) => sendToCart(data)}
                className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute top-7 left-4 cursor-pointer"
              >
                <IoBasket className="text-2xl text-primary" />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            {...fadeIn}
            className=" bg-red-300 hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-center relative px-4 py-2 w-full    gap-3 h-10  md:bg-transparent cursor-pointer "
          >
            <div
              className="pt-1 text-center bg-red-300 rounded-full p-3 px-5"
              onClick={() =>
                reference.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                inline: "nearest",
                })
              }
            >
              <p className="text-xl text-headingColor font-medium text-center">
                برگردیم به منو اصلی{" "}
              </p>
            </div>
          </motion.div>
        )
      ) : (
        <>
          <div className=" flex justify-center items-center text-xl   mb-52  ">
            از اینا نداریم ببخشید
            <TbMoodSad size={22} />
          </div>
        </>
      )}
    </>
  );
};

export default SliderCard;
