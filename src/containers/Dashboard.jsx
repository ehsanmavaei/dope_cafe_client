import React,{useEffect} from "react";
import { DBLeftSection, DBRightSection } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";





const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true }
      );
      } else {
    navigate("/login",{replace:true})
    
    }
  
  }, []);
  return (
    <div className="w-screen h-screen flex items-center bg-primary">
      <DBLeftSection />
      <DBRightSection />
    </div>
  );
};

export default Dashboard;
