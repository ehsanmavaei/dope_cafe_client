import React, { useEffect, useState } from "react";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClcik } from "../animations";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

import { gettoken, login, signup } from "../api";
import { setUserDetails } from "../context/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  // const alert = useSelector((state) => state.alert);

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user]);

  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirm_password === "") {
      // dispatch(alertInfo("Required fields should not be empty"));
      toast.warning("Required fields should not be empty");
    } else {
      if (password === confirm_password) {
        setUserEmail("");
        setConfirm_password("");
        setPassword("");

        signup(userEmail, password)
          .then((response) => {
            //save it to localstorage

            localStorage.setItem("user", JSON.stringify(response));

            gettoken();

            dispatch(setUserDetails(response));
            navigate("/dashboard", { replace: true });
          })
          .catch((error) => {
            toast.error(error.response.data.error);
          });
      } else {
        // dispatch(alertWarning());
        // toast.alert("Password doesn't match")
      }
    }
  };

  const signInWithEmailPass = async () => {
    if (userEmail === "" || password === "") {
      toast.warning("همه فیلد ها باید پر شوند");
    }
    if (userEmail !== "" && password !== "") {
      login(userEmail, password)
        .then((response) => {
          //save it to localstorage

          localStorage.setItem("user", JSON.stringify(response));
          gettoken();

          dispatch(setUserDetails(response));
        })
        .catch((error) => {
          toast.error(error.response.data.error);
        });
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
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
      <div className=" w-screen h-screen relative overflow-hidden flex  font-bold   ">
        {/* background image */}
        <img
          src={LoginBg}
          className="w-full h-full object-cover absolute top-0 left-0"
          alt=""
        />

        {/* content box */}
        <div className="flex flex-col items-center bg-lightOverlay w-[80%] md:w-508 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
          {/* Top logo section */}
          <div className="flex items-center justify-start gap-4 w-full">
            <p className="text-headingColor font-semibold text-5xl">کافه</p>
            <img src={Logo} className=" w-24" alt="" />
          </div>

          {/* welcome text */}
          <p className="text-3xl font-semibold text-headingColor">
            به دپ خوش آمدید
          </p>
          <p className="text-xl text-textColor -mt-6">
            {isSignUp ? "ثبت" : "ورود"}
          </p>

          {/* input section */}
          <div className=" w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
            <LoginInput
              placeHolder={"ایمیل"}
              icon={<FaEnvelope className="text-xl text-textColor" />}
              inputState={userEmail}
              inputStateFunc={setUserEmail}
              type="email"
              isSignUp={isSignUp}
            />

            <LoginInput
              placeHolder={"کلمه ورود"}
              icon={<FaLock className="text-xl text-textColor" />}
              inputState={password}
              inputStateFunc={setPassword}
              type="password"
              isSignUp={isSignUp}
            />

            {isSignUp && (
              <LoginInput
                placeHolder={"Confirm Password Here"}
                icon={<FaLock className="text-xl text-textColor" />}
                inputState={confirm_password}
                inputStateFunc={setConfirm_password}
                type="password"
                isSignUp={isSignUp}
              />
            )}

            {!isSignUp ? (
              <p>
                {/* Doesn't have an account:{" "} */}
                <motion.button
                  {...buttonClcik}
                  className="text-red-400 underline cursor-pointer bg-transparent"
                  onClick={() => setIsSignUp(true)}
                >
                  {/* Create one */}
                </motion.button>
              </p>
            ) : (
              <p>
                Already have an account:{" "}
                <motion.button
                  {...buttonClcik}
                  className="text-red-400 underline cursor-pointer bg-transparent"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign-in here
                </motion.button>
              </p>
            )}

            {/* button section */}
            {isSignUp ? (
              <motion.button
                {...buttonClcik}
                className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
                onClick={signUpWithEmailPass}
              >
                Sign Up
              </motion.button>
            ) : (
              <motion.button
                {...buttonClcik}
                onClick={signInWithEmailPass}
                className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              >
                ورود
              </motion.button>
            )}
          </div>

          <div className="flex items-center justify-between gap-16">
            <div className="w-24 h-[1px] rounded-md bg-white"></div>
            <p className="text-white">...</p>
            <div className="w-24 h-[1px] rounded-md bg-white"></div>
          </div>
          {/* 
          <motion.div
            {...buttonClcik}
            className="flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
            onClick={loginWithGoogle}
          >
            <FcGoogle className="text-3xl" />
            <p className="capitalize text-base text-headingColor">
              Signin with Google
            </p>
          </motion.div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
