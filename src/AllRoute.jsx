import React, { useEffect, useRef } from "react";
// import { io } from "socket.io-client";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import fetchteacherData from "./context/fetchteacherdata";
import Studentdashboard from "./Pages/Studentdashboard/Studentdashboard";
import { useAuth } from "./context/AuthContext";
import TeacherDashboard from "./Pages/TeacherDashboard/TeacherDashboard";
import {
  validatelogin,
  leavesbyemail,
  getallteacher,
  getallrector,
} from "./util/Allapi"; // assuming you have a second API
import TeacherLogin from "./Pages/TeacherLogin/TeacherLogin";
import axios from "axios";
import fetchData from "./context/featchdata";

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
  // const socket = useRef();
  const host = process.env.REACT_APP_API_KEY;

  console.log(isLoggedIn, userRole);

  useEffect(() => {
    // socket.current = io(host);
    // socket.current.emit("add");
    try {
      if (isLoggedIn && userRole == "student") {
        fetchData(
          token,
          userRole,
          setUserData,
          setleaves,
          setteacher,
          setrector
        );
      } else if (isLoggedIn && userRole == "teacher") {
        fetchteacherData(
          token,
          userRole,
          setUserData,
          setleaves,
          setteacher,
          setrector
        );
      }
    } catch (error) {
      navigate("/login");
    }
  }, [isLoggedIn, token]);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/teacherlogin" element={<TeacherLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        {isLoggedIn && userRole === "student" && (
          <Route path="/studentdashboard" element={<Studentdashboard />} />
        )}
        {isLoggedIn && userRole === "teacher" && (
          <Route path="/teacherdashboard" element={<TeacherDashboard />} />
        )}
        {!isLoggedIn && (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </div>
  );
};

export default AllRoute;
