import React, { useState, useEffect } from "react";
import "./TeacherDashboard.css";
import { useNavigate } from "react-router-dom";
import Navbars from "../../components/Navbars/AdminNavbar";
import ViewTeacherHistory from "../../components/ViewTeacherHistory/ViewTeacherHistory";
import RequestbyId from "../../components/RequestbyID/RequestbyId";
import { useAuth } from "../../context/AuthContext";
import SingleRequest from "../../components/SingleRequest/SingleRequest";
const TeacherDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("newRequest"); // State to manage the selected option
  const navigate = useNavigate();
  const { userLeaves, viewId } = useAuth();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="wrapper">
      <div className="sidebar">
        <h1 style={{ paddingTop: "10px", color: "white" }}>
          Teacher Dashboard
        </h1>
        <hr />
        <div className="side-menu">
          <div
            className="side-item"
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginLeft: "10px",
            }}
            onClick={() => handleOptionChange("newRequest")}
          >
            <h3>New Request</h3>
            <h3 className="notification">{userLeaves.length}</h3>
          </div>
          <div
            className="side-item"
            onClick={() => handleOptionChange("requestHistory")}
          >
            <h3>Request History</h3>
          </div>
          <div
            className="side-item"
            onClick={() => handleOptionChange("requestByID")}
          >
            <h3>Get Request By ID</h3>
          </div>
          <div
            className="side-item"
            onClick={() => handleOptionChange("reassignRequest")}
          >
            <h3>Reassign Request</h3>
          </div>
        </div>
      </div>
      <div className="right-menu">
        <Navbars />
        <div>
          {selectedOption === "newRequest" && (
            <ViewTeacherHistory setSelectedOption={setSelectedOption} />
          )}
          {selectedOption === "requestByID" && (
            <RequestbyId setSelectedOption={setSelectedOption} />
          )}
          {selectedOption === "singleiew" && (
            <SingleRequest id={viewId} setSelectedOption={setSelectedOption} />
          )}
          {/* {selectedOption === "newRequest" && <NewRequest />}
          {selectedOption === "requestHistory" && <RequestHistory />}
          {selectedOption === "requestByID" && <RequestByID />}
          {selectedOption === "reassignRequest" && <ReassignRequest />} */}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
