// AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userInfo, setUserInfo] = useState(null);
  const [userLeaves, setUserLeaves] = useState([]);
  const [teacherData, setteacherData] = useState([]);
  const [rectorData, setrectorData] = useState([]);
  const [viewId, setviewId] = useState();
  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };
  const setUserData = (userData) => {
    console.log("ye hai user data", userData);
    setUserInfo(userData);

    console.log(userData);
  };
  const setleaves = (leaves) => {
    setUserLeaves(leaves);
    console.log(userLeaves);
  };
  const setteacher = (teachers) => {
    console.log(teachers);
    setteacherData(teachers);
  };
  const setrector = (rectors) => {
    console.log(rectors);
    setrectorData(rectors);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userRole,
        login,
        userInfo,
        logout,
        setUserData,
        setleaves,
        userLeaves,
        setteacher,
        setUserRole,
        teacherData,
        setrector,
        rectorData,
        setviewId,
        viewId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
