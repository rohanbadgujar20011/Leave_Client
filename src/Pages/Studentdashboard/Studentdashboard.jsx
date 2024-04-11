import React, { useState, useEffect } from "react";
import "./Studentdashboard.css";
import { useNavigate } from "react-router-dom";
import Navbars from "../../components/Navbars/AdminNavbar";
import CreateRequest from "../../components/CreateRequest/CreateRequest";
import ViewHistoryStudent from "../../components/ViewHistoryStudent/ViewHistoryStudent";
const Studentdashboard = () => {
  const [selectedOption, setSelectedOption] = useState("history"); // State to manage the selected option
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);
  const handleOptionChange = (option) => {
    console.log("option");
    setSelectedOption(option);
  };
  return (
    <div className="wrapper">
      <div className="sidebar">
        <h1 style={{ paddingTop: "10px", color: "white" }}>
          Student Dashboard
        </h1>
        <hr />
        <div className="side-menu">
          <div
            className="side-item"
            onClick={() => handleOptionChange("create")}
          >
            <h3>Create Request</h3>
          </div>
          <div
            className="side-item"
            onClick={() => handleOptionChange("history")}
          >
            <h3>View History</h3>
          </div>
        </div>
      </div>
      <div className="right-menu">
        <Navbars />
        <div>
          {selectedOption === "create" && (
            <CreateRequest setSelectedOption={setSelectedOption} />
          )}{" "}
          {selectedOption === "history" && (
            <ViewHistoryStudent setSelectedOption={setSelectedOption} />
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default Studentdashboard;
