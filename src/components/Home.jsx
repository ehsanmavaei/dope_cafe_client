import { motion } from "framer-motion";
import React ,{useEffect}from "react";
import { buttonClcik, staggerFadeInOut } from "../animations";
import {HeroBg } from "../assets";
import { useSelector, useDispatch } from "react-redux";
import { FaInstagram } from "react-icons/fa";
import { setCartItems } from "../context/actions/cartAction";
import { alertNULL, alertSuccess } from "../context/actions/alertActions";
import { IoBasket } from "../assets/icons";
import {  getConfig } from "../api";
import { setConfig } from "../context/actions/configAction";


const Home = ({ noimage, reference }) => {

  useEffect(() => {
    getConfig().then((data) => {
      dispatch(setConfig(data));
    });
  
  


 
  }, []);
  const products = useSelector((state) => state.products);
  const config = useSelector((state) => state.config);
  const dispatch = useDispatch();

  const sendToCart = (data) => {
    dispatch(alertSuccess("به سبد اضافه شد"));

    setInterval(() => {
      dispatch(alertNULL());
    }, 2500);

    dispatch(setCartItems(data));
  };
// let instagram=config && config[0].instagram
  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4  mb-20">
      <div className="flex flex-col items-start justify-start gap-6">
        {/* <a href={instagram}> */}
        <a href={`${config && config[0].instagram}`}>
          <div className="px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full cursor-pointer">
            <p className="text-lg font-semibold text-orange-500">
              اینستاگرام دپ
            </p>

            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
              <FaInstagram size={30} color="orange" />

              {/* <img
            
            /> */}
            </div>
          </div>
        </a>

        <p className="text-[40px] text-headingColor md:text-[72px]   font-primary ">
          بهترین قهوه ها در
        </p>
        <p className="text-orange-600  text-[40px] md:text-[72px] font-extrabold">
          {config && config[0].name}{" "}
        </p>

        <p className="text-textColor  text-3xl font-primary">
          {config &&  config[0].slogan}
          <br />
        </p>
        <p className=" text-gray-600 font-bold ">
        ساعت کار کافه از {config && config[0].start_working} تا {config && config[0].finish_working }
        </p>
        <motion.button
          onClick={() =>
            reference.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            })
          }
          {...buttonClcik}
          className="bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-gray-800
           text-base  font-bold "
        >
          بریم به منو{" "}
        </motion.button>
      </div>

      <div className="py-2 flex-1 flex items-center justify-end relative pt-10">
        <img
          className="absolute top-0 left-0 md:left-20  w-full h-420 md:w-auto md:h-650"
          src={HeroBg}
          alt=""
        />

        <div className="w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-14">
          {products &&
            products
              .filter((items) => items.category === config[0].promo)
              .slice(0, 6)
              .map((data, i) => (
                <motion.div
                  key={data._id}
                  {...staggerFadeInOut(i)}
                  className=" w-32 h-36 md:h-auto  md:w-190 p-4 bg-lightOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                >
                  <img
                    src={data.image ? data.image : noimage}
                    className="w-25 h-25 md:w-32 md:h-32 md:-mt-16 object-contain rounded-2xl"
                    alt=""
                  />
                  <p className="text-sm lg:text-xl font-semibold text-textColor">
                    {data.product_name.slice(0, 14)}
                  </p>

                  <p className="text-[12px] text-center  md:text-base text-lighttextGray font-semibold  capitalize">
                    {data.category}
                  </p>

                  <p className="text-sm  font-medium text-headingColor ">
                    <span className="text-xs text-red-600">
                      {data.price}
                      <span> تومان </span>
                    </span>
                  </p>
                  <motion.div
                    {...buttonClcik}
                    onClick={(e) => sendToCart(data)}
                    className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute top-7 left-4 cursor-pointer"
                  >
                    <IoBasket className="text-2xl text-primary" />
                  </motion.div>
                </motion.div>
              ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
