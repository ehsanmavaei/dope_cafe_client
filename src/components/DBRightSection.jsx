import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  DBHeader,
  DBHome,
  DBItems,
  DBNewItem,
  DBOrders,
  DBUsers,
  DBProducts,
  DBConfig
} from "../components";

const DBRightSection = () => {
  return (
    <div className="flex flex-col py-12 px-12 flex-1 h-full">
      <DBHeader />
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none ">
        <Routes>
          <Route path="/home" element={<DBHome />} />
          <Route path="/orders" element={<DBOrders />} />
          <Route path="/items" element={<DBItems />} />
          <Route path="/products" element={<DBProducts />} />
          <Route path="/newItem" element={<DBNewItem />} />
          <Route path="/config" element={<DBConfig />} />
          {/* <Route path="/users" element={<DBUsers />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default DBRightSection;
