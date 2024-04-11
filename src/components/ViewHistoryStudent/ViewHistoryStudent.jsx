import React, { useEffect, useState } from "react";
import "./ViewHistory.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { leavesbyemail } from "../../util/Allapi";

const ViewHistoryStudent = () => {
  const { setleaves, userInfo, userLeaves, teacherData, rectorData } =
    useAuth();

  // const [userLeaves, setuserLeaves] = useState(userInfo.leaves);

  // useEffect(() => {
  //   const fetchLeaves = async () => {
  //     try {
  //       const res = await axios.get(`${leavesbyemail}/${userInfo.email}`);
  //       setleaves(res.data);
  //     } catch (error) {
  //       console.error("Error fetching leaves:", error);
  //       // Handle error if needed
  //     }
  //   };

  //   fetchLeaves();
  // }, []);

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
                <td>{leave.reason}</td>
                <td>{findTeacherNameById(leave.assignedTeacher)}</td>
                <td>{findRectorNameById(leave.assignedRector)}</td>
                <td
                  style={{
                    color: leave.statusI ? "green" : "red",
                    height: "5px",
                  }}
                >
                  {leave.statusI ? "Approved" : "Pending"}
                </td>
                <td
                  style={{
                    color: leave.statusII ? "green" : "red",
                    height: "5px",
                  }}
                >
                  {leave.statusII ? "Approved" : "Pending"}
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

export default ViewHistoryStudent;
