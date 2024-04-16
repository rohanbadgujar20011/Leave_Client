import React from "react";
import "./MainNav.css";
import { Link } from "react-router-dom";
const MainNav = () => {
  return (
    <div className="mainclass">
      <div className="logo">
        <h2>Leave Tracker</h2>
      </div>
      <div className="menus">
        <Link to={"/teacherlogin"} style={{ textDecoration: "none" }}>
          <h4 className="items">Teachers Login</h4>
        </Link>
        <Link style={{ textDecoration: "none" }}>
          <h4 className="items">Student Login</h4>
        </Link>
      </div>
    </div>
  );
};

export default MainNav;
