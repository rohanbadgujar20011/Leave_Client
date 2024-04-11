import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validatelogin } from "./util/Allapi";
const withSessionTimeoutCheck = (WrappedComponent) => {
  const ComponentWithSessionTimeoutCheck = (props) => {
    const navigate = useNavigate();

    const testApiAccessibility = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // No token available, session has timed out
          alert("Session timed out. Please log in again.");
          localStorage.clear(); // Clear all localStorage
          navigate("/login"); // Redirect to login page
        } else {
          // Token available, test API accessibility
          const res=await axios.get(validatelogin, {
            headers: {
              Authorization: token,
            },
          });
          console.log("Its authorize");
        }
      } catch (error) {
        // If API test fails, handle session timeout
        alert("Session timed out. Please log in again.");
        localStorage.clear(); // Clear all localStorage
        navigate("/login"); // Redirect to login page
      }
    };

    useEffect(() => {
      testApiAccessibility();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return ComponentWithSessionTimeoutCheck;
};

export default withSessionTimeoutCheck;
