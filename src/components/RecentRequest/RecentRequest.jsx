import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import SingleRequest from "../SingleRequest/SingleRequest";

const RecentRequest = ({ setSelectedOption }) => {
  const {
    setleaves,
    userInfo,
    userLeaves,
    teacherData,
    rectorData,
    setviewId,
  } = useAuth();

  useEffect(() => {
    console.log("userLeaves updated:", userLeaves);
  }, [userLeaves]);
  const findTeacherNameById = (teacherId) => {
    const foundTeacher = teacherData.find(
      (teacher) => teacher._id === teacherId
    );
    console.log("found teacher", foundTeacher);
    return foundTeacher ? foundTeacher.name : ""; // Return teacher name if found, otherwise empty string
  };
  const findRectorNameById = (rectorId) => {
    const foundRector = rectorData.find((rector) => rector._id === rectorId);
    console.log("found Rector", foundRector);
    return foundRector ? foundRector.name : ""; // Return teacher name if found, otherwise empty string
  };
  const handleViewRequest = (leaveId) => {
    setSelectedOption("singleiew");
    setviewId(leaveId);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Leave ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Assigned Teacher</th>
            <th>Assigned Rector</th>

            <th>Status I</th>
            <th>Status II</th>
            <th>View</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {userLeaves && userLeaves.length > 0 ? (
            userLeaves.map((leave) => (
              <tr key={leave._id}>
                <td>{leave.leaveID}</td>
                <td>{leave.name}</td>
                <td>{leave.email}</td>
                <td>{new Date(leave.from).toLocaleDateString()}</td>
                <td>{new Date(leave.to).toLocaleDateString()}</td>
                <td>
                  {leave.reason.length > 50
                    ? leave.reason.substring(0, 10) + "..."
                    : leave.reason}
                </td>

                <td>{findTeacherNameById(leave.assignedTeacher)}</td>
                <td>{findRectorNameById(leave.assignedRector)}</td>
                <td
                  style={{
                    color: leave.statusI
                      ? "green"
                      : leave.isRejected
                      ? "Red"
                      : "blue",
                    height: "5px",
                  }}
                >
                  {leave.statusI
                    ? "Approved"
                    : leave.isRejected
                    ? "Rejected"
                    : "Pending"}
                </td>
                <td
                  style={{
                    color: leave.statusII ? "green" : "red",
                    height: "5px",
                  }}
                >
                  {leave.statusII ? "Approved" : "Pending"}
                </td>
                <td
                  style={{
                    fontSize: "20px",
                    paddingLeft: "30px",
                    cursor: "pointer",
                  }}
                >
                  <FaEye
                    onClick={() => handleViewRequest(leave._id)}
                    setSelectedOption={setSelectedOption}
                  />
                </td>
                <td>{new Date(leave.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No leave history found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentRequest;
