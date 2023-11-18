import { motion } from "framer-motion";
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fadeInOut } from "./animations";
import { getAllCartItems, validateUserJWTToken } from "./api";
import { Alert, MainLoader, CheckOutSuccess, UsersOrder } from "./components";

import { setCartItems } from "./context/actions/cartAction";
import { setUserDetails } from "./context/actions/userActions";
import { Login, Main } from "./containers";
// import { Dashboard} from "./containers";
const Dashboard = lazy(() => import("./containers/Dashboard"));

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    setInterval(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <Suspense fallback={MainLoader}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route path="/checkout-success" element={<CheckOutSuccess />} />
        <Route path="/user-orders" element={<UsersOrder />} />
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;
