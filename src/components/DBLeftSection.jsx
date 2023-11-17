import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const DBLeftSection = () => {


  
  return (
    <div className="h-full py-12 flex flex-col bg-lightOverlay backdrop-blur-md shadow-md min-w-210 w-300 gap-3  font-bold ">
      <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4">
      {/* <p className="font-semibold text-2xl">کافه</p> */}
        <img src={Logo} className=" w-28" alt="" />
    
      </NavLink>

      <hr />

      <ul className="flex flex-col gap-4">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
         صفحه اصلی
        </NavLink>
        {/* <NavLink
          to={"/dashboard/orders"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Orders
        </NavLink> */}
        <NavLink
          to={"/dashboard/products"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          مجموعه ها
        </NavLink>
        <NavLink
          to={"/dashboard/items"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          محصولات
        </NavLink>
        <NavLink
          to={"/dashboard/newItem"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
         اضافه کردن 
        </NavLink>
        {/* <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8  border-red-500`
              : isNotActiveStyles
          }
        >
          Users
        </NavLink> */}
      </ul>

      <div className="w-full items-center justify-center flex h-225 mt-auto px-2 ">
        <div className="w-full h-full rounded-md bg-red-400 flex items-center justify-center flex-col gap-3 px-3">
          <div className="w-12 h-12 borde bg-white rounded-full flex items-center justify-center">
            <p className="text-2xl font-bold text-red-500">?</p>
          </div>
          <p className="text-xl text-primary font-semibold">کمک میخوای؟</p>
          <p className="text-base text-gray-300 text-center">
           یه زنگ بزن میام درستش میکنم
          </p>
          <p className="px-4 py-2 rounded-full bg-primary text-red-400 cursor-pointer">
          09363310730
          </p>
        </div>
      </div>
    </div>
  );
};

export default DBLeftSection;
