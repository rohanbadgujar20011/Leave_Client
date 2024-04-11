import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Admindashboard from "./Pages/Admindashboard/Admindashboard";
import Studentdashboard from "./Pages/Studentdashboard/Studentdashboard";
import { useAuth } from "./context/AuthContext";
import {
  validatelogin,
  leavesbyemail,
  getallteacher,
  getallrector,
} from "./util/Allapi"; // assuming you have a second API
import withSessionTimeoutCheck from "./withSessionTimeoutCheck";
import axios from "axios";

const AllRoute = () => {
  const {
    isLoggedIn,
    userRole,
    setUserData,
    setleaves,
    setteacher,
    setrector,
  } = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  console.log(isLoggedIn, userRole);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchData = async () => {
        try {
          const res1 = await axios.get(validatelogin, {
            headers: {
              Authorization: token,
            },
          });
          console.log("Log 1");
          console.log(res1.data.user);
          setUserData(res1.data.user);

          const res2 = await axios.get(
            `${leavesbyemail}/${res1.data.user.email}`
          );
          console.log("Log 2");
          console.log(res2.data.leaves);
          setleaves(res2.data.leaves);
          const res3 = await axios.get(`${getallteacher}`, {
            headers: {
              Authorization: token,
            },
          });
          console.log("Log 3");
          console.log(res3.data);
          setteacher(res3.data);

          const res4 = await axios.get(`${getallrector}`, {
            headers: {
              Authorization: token,
            },
          });
          console.log("Log 3");
          console.log(res4.data);
          setrector(res4.data);
        } catch (error) {
          alert(error);
          localStorage.clear();
          navigate("/login");
        }
      };

      fetchData();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        {isLoggedIn && userRole === "student" && (
          <Route path="/studentdashboard" element={<Studentdashboard />} />
        )}
        {isLoggedIn && userRole === "admin" && (
          <Route path="/admindashboard" element={<Admindashboard />} />
        )}
        {!isLoggedIn && (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </div>
  );
};

export default AllRoute;
