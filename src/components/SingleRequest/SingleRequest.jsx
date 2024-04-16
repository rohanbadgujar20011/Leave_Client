import React from "react";
import "./SingleRequest.css";
import { useAuth } from "../../context/AuthContext";

const SingleRequest = ({ id }) => {
  const { userLeaves, teacherData, rectorData } = useAuth();

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

  return (
    <div>
      {leave ? (
        <div>
          <h2>Leave Request Details</h2>
          <p>Leave ID: {leave.leaveID}</p>
          <p>Name: {leave.name}</p>
          <p>Email: {leave.email}</p>
          <p>From: {new Date(leave.from).toLocaleDateString()}</p>
          <p>To: {new Date(leave.to).toLocaleDateString()}</p>
          <p>Reason: {leave.reason}</p>
          <p>Assigned Teacher: {findTeacherNameById(leave.assignedTeacher)}</p>
          <p>Assigned Rector: {findRectorNameById(leave.assignedRector)}</p>
          <p>Status I: {leave.statusI ? "Approved" : "Pending"}</p>
          <p>Status II: {leave.statusII ? "Approved" : "Pending"}</p>
          <p>Created At: {new Date(leave.createdAt).toLocaleString()}</p>
        </div>
      ) : (
        <p>No leave found with ID: {id}</p>
      )}
    </div>
  );
};

export default SingleRequest;
