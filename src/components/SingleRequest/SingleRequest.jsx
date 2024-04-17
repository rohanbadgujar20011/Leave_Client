import React from "react";
import "./SingleRequest.css";
import { useAuth } from "../../context/AuthContext";
import { approveleavebyteacher, rejectleavebyteacher } from "../../util/Allapi";
import axios from "axios";

const SingleRequest = ({ id, setSelectedOption }) => {
  const { userLeaves, teacherData, rectorData } = useAuth();
  const token = localStorage.getItem("token");

  // Find the leave with the matching ID
  const leave = userLeaves.find((leave) => leave._id === id);

  // Function to find teacher name by ID
  const findTeacherNameById = (teacherId) => {
    const teacher = teacherData.find((teacher) => teacher._id === teacherId);
    return teacher ? teacher.name : "";
  };

  // Function to find rector name by ID
  const findRectorNameById = (rectorId) => {
    const rector = rectorData.find((rector) => rector._id === rectorId);
    return rector ? rector.name : "";
  };

  const handleapprove = async (leaveID, teacherId) => {
    console.log(`clicked id ${leaveID}`);
    const res = await axios.patch(
      approveleavebyteacher,
      {
        teacherid: teacherId,
        leaveid: leaveID,
      },
      {
        headers: {
          Authorization: token, // Set the Authorization header with the token
        },
      }
    );
    setSelectedOption("newRequest");
    window.location.reload();
  };
  const handledisapprove = async (leaveID, teacherId) => {
    console.log(`clicked id ${leaveID}`);
    const res = await axios.patch(
      rejectleavebyteacher,
      {
        teacherid: teacherId,
        leaveid: leaveID,
      },
      {
        headers: {
          Authorization: token, // Set the Authorization header with the token
        },
      }
    );
    setSelectedOption("requestHistory");
    window.location.reload();
  };

  return (
    <div className="leave-form-container">
      {leave ? (
        <div>
          <h2>Leave Request Details</h2>
          <form className="leave-form">
            <div className="form-group">
              <label>Leave ID:</label>
              <input type="text" value={leave.leaveID} disabled />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" value={leave.name} disabled />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={leave.email} disabled />
            </div>
            <div className="form-group">
              <label>From:</label>
              <input
                type="text"
                value={new Date(leave.from).toLocaleDateString()}
                disabled
              />
            </div>
            <div className="form-group">
              <label>To:</label>
              <input
                type="text"
                value={new Date(leave.to).toLocaleDateString()}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Reason:</label>
              <input type="text" value={leave.reason} disabled />
            </div>
            <div className="form-group">
              <label>Assigned Teacher:</label>
              <input
                type="text"
                value={findTeacherNameById(leave.assignedTeacher)}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Assigned Rector:</label>
              <input
                type="text"
                value={findRectorNameById(leave.assignedRector)}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Status I:</label>
              <input
                type="text"
                value={leave.statusI ? "Approved" : "Pending"}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Status II:</label>
              <input
                type="text"
                value={leave.statusII ? "Approved" : "Pending"}
                disabled
              />
            </div>
            {leave.isRejected ? (
              <>
                <button type="button" className="disapprove-button" disabled>
                  Reject Leave
                </button>
              </>
            ) : leave.statusI ? (
              <>
                <div className="bothbutton">
                  <button className="approve-button" disabled>
                    Already approved
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="bothbutton">
                  <button
                    type="button"
                    className="approve-button"
                    onClick={() =>
                      handleapprove(leave._id, leave.assignedTeacher)
                    }
                  >
                    Approve
                  </button>

                  <button
                    type="button"
                    className="disapprove-button"
                    onClick={() =>
                      handledisapprove(leave._id, leave.assignedTeacher)
                    }
                  >
                    Reject
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      ) : (
        <p>No leave found with ID: {id}</p>
      )}
    </div>
  );
};

export default SingleRequest;
