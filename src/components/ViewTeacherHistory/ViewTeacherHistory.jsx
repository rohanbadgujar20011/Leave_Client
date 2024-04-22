import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import "./ViewTeacherHistory.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { reassignleave } from "../../util/Allapi";
import { RxLoop } from "react-icons/rx";
import { useAuth } from "../../context/AuthContext";
import SingleRequest from "../SingleRequest/SingleRequest";
import axios from "axios";

const ViewTeacherHistory = ({ setSelectedOption }) => {
  const {
    setleaves,
    userInfo,
    userLeaves,
    teacherData,
    rectorData,
    setviewId,
  } = useAuth();
  const [show, setShow] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [reassignedTeacher, setReassignedTeacher] = useState(null);
  const [leaveid, setleaveid] = useState(null);
  const token = localStorage.getItem("token");

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

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = (teacher, teacherid, leaveid) => {
    setleaveid(leaveid);
    setSelectedTeacher(teacherid);
    setShow(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.patch(
      reassignleave,
      {
        from: selectedTeacher,
        to: reassignedTeacher,
        leaveid,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    console.log("Reassigning leave to:", response.data);

    setShow(false);
  };

  return (
    <div className="table-container">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Teacher Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTeacher && (
            <form onSubmit={handleSubmit}>
              <div>
                <p>Assigned to : {selectedTeacher}</p>
                <p>Reassign to :</p>
                <select
                  value={reassignedTeacher}
                  onChange={(e) => setReassignedTeacher(e.target.value)}
                >
                  <option value="">Select Teacher</option>
                  {teacherData.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Add more details as needed */}
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Modal.Body>
      </Modal>

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
            <th>Reassign</th>
          </tr>
        </thead>
        <tbody>
          {userLeaves && userLeaves.length > 0 ? (
            userLeaves
              .filter((leave) => !leave.statusI && !leave.isRejected)
              .map((leave) => (
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
                      color: leave.statusII
                        ? "green"
                        : leave.isRejected
                        ? "Red"
                        : "blue",
                      height: "5px",
                    }}
                  >
                    {leave.statusII
                      ? "Approved"
                      : leave.isRejected
                      ? "Rejected"
                      : "Pending"}
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
                  <td>
                    <RxLoop
                      onClick={() =>
                        handleShow(
                          findTeacherNameById(leave.assignedTeacher),
                          leave.assignedTeacher,
                          leave._id
                        )
                      }
                      style={{ fontSize: "25px", marginLeft: "10px" }}
                    />
                  </td>
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

export default ViewTeacherHistory;
