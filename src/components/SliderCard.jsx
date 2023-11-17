import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buttonClcik, fadeIn } from "../animations";
import { addNewItemToCart, getAllCartItems } from "../api";
import { HiCurrencyRupee, IoBasket } from "../assets/icons";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { addToCart, setCartItems } from "../context/actions/cartAction";
import noimage from "../assets/img/no-image.png";
import { TbMoodSad } from "react-icons/tb";
import { ToastContainer, toast } from "react-toastify";
import '../assets/css/utilCss.css'

const SliderCard = ({
  data,
  index,
  reference,
  showBackToTheTop,
  number,
  noimage,
}) => {
  console.log(number);
  const cart = useSelector((state) => state.cart);

  const user = useSelector((state) => state.user);
  // const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const sendToCart = (data) => {
    // toast.success("به سبد اضافه شد")
    dispatch(alertSuccess("به سبد اضافه شد"));

    // addNewItemToCart(user?.user_id, data).then((res) => {
    //   getAllCartItems(user?.user_id).then((items) => {
    //     dispatch(setCartItems(items));
    //   });
    setInterval(() => {
      dispatch(alertNULL());
    }, 2500);
    // });
    // setCartdata(oldArray => [...oldArray, data]);

    dispatch(setCartItems(data));
  };

  return (
    <>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
              {parseFloat(data.price)} ت 
              </p>

              <motion.div
                {...buttonClcik}
                onClick={(e) => sendToCart(data)}
                className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute top-7 left-4 cursor-pointer"
              >
                
                <IoBasket className="text-2xl text-primary"  />
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
                  block: "center",
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
          <div className=" flex justify-center items-center text-xl">
            از اینا نداریم ببخشید
            <TbMoodSad size={22} />
          </div>
        </>
      )}
    </>
  );
};

export default SliderCard;
