import { motion } from "framer-motion";
import React from "react";
import { buttonClcik, staggerFadeInOut } from "../animations";
import { Delivery, HeroBg } from "../assets";
import { randomData } from "../utils/styles";
import { useSelector } from "react-redux";
import { FaInstagram } from "react-icons/fa";


const Home = ({ noimage,reference }) => {
  const products = useSelector((state) => state.products);
  // filterd.map(items=> console.log(items))

  // console.log(filterd)
  return (
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div className="flex flex-col items-start justify-start gap-6">

      <a href="https://www.instagram.com/in_the_dope">
      <div className="px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full cursor-pointer">
          <p className="text-lg font-semibold text-orange-500">اینستاگرام دپ</p>
        

          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
          <FaInstagram size={30} color="orange" />

            {/* <img
            
            /> */}
          </div>
        </div>
      </a>
      

        <p className="text-[40px] text-headingColor md:text-[72px]   font-primary ">
         بهترین قهو ها در{" "}
         <br />
          <span className="text-orange-600">کافه دپ</span>
        </p>

        <p className="text-textColor text-lg">
          دلم خلوتی ساده می‌خواهد … چند خطی شعر فروغ فرخزاد با دو فنجان قهوه کمی
          سکوت و او، که پایان هر قطعه دستش را زیر چانه بزند و بگوید: باز هم
          بخوان…
<br />
          ساعت کار کافه 
08:00-24:00
        </p>
        <motion.button
          onClick={() =>
            reference.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "nearest",
            })
          }
          {...buttonClcik}
          className="bg-gradient-to-bl from-orange-400 to-orange-600 px-4 py-2 rounded-xl text-gray-800
           text-base  font-bold "
        >
          بریم به منو        </motion.button>
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
              .filter((items) => items.category === "بستنی")
              .slice(0, 6)
              .map((data, i) => (
                <motion.div
                  key={data._id}
                  // {...staggerFadeInOut(data._id)}
                  className=" w-32 h-36 md:h-auto  md:w-190 p-4 bg-lightOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                >
                  <img
                    src={data.image ? data.image : noimage}
                    className="w-25 h-25 md:w-32 md:h-32 md:-mt-16 object-contain "
                    alt=""
                  />
                  <p className="text-sm lg:text-xl font-semibold text-textColor">
                    {data.product_name.slice(0, 14)}
                  </p>

                  <p className="text-[12px] text-center  md:text-base text-lighttextGray font-semibold  capitalize">
                    {data.category}
                  </p>

                  <p className="text-sm  font-semibold text-headingColor">
                    <span className="text-xs text-red-600"></span> {data.price}
                  </p>
                </motion.div>
              ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
