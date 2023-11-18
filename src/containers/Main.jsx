import React, { useEffect, useRef, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getAllProductsList } from "../api";
import { Cart, Header, Home, HomeSLider } from "../components";
import { FilterSection} from "../components";
import { setAllProducts } from "../context/actions/productActions";
import { setAllProductsList } from "../context/actions/productListActions";
import { setUserDetails } from "../context/actions/userActions";
import noimage from "../assets/img/no-image.png";
import MainLoder from '../components/MainLoader'

import "swiper/css";
import "swiper/css/pagination";
// const FilterSection = lazy(() => import("../components/FilterSection"));

const Main = () => {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const isCart = useSelector((state) => state.isCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
    getAllProductsList().then((data) => {
      dispatch(setAllProductsList(data));
    });
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      console.log("the function was called to set the state ");
      dispatch(setUserDetails(user));
    }
  }, []);
  const scollToRef = useRef();

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary  font-meduim">
      <Header reference={scollToRef} />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <Home reference={scollToRef} noimage={noimage} />
        <HomeSLider noimage={noimage} />
        <FilterSection reference={scollToRef} noimage={noimage} />

     
      </div>

      {isCart && <Cart noimage={noimage} />}
    </main>
  );
};

export default Main;
