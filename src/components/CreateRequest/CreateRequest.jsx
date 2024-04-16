import React, { useState } from "react";
import "./CreateRequest.css";
import { useAuth } from "../../context/AuthContext";
import { createleave } from "../../util/Allapi";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
const CreateRequest = ({ setSelectedOption }) => {
  // State variables to hold form data
  const { userInfo, teacherData, rectorData } = useAuth();
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");
  const [assignedTeacher, setAssignedTeacher] = useState();
  const [assignedRector, setAssignedRector] = useState("");
  const navigate = useNavigate();
  

  // Function to handle form submission

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      fromDate,
      toDate,
      reason,
      assignedTeacher,
      assignedRector,
    };

    try {
      const res = await axios.post(createleave, formData);
      console.log(res.data);
      toast.success(res.data.message);
      setSelectedOption("history");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
        console.log("Error status:", error.response.status);
        console.log("Error message:", error.response.data);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <div className="leave-form-container">
      <Toaster position="top-center" />
      <h2>Leave Request Form</h2>
      <form onSubmit={handleSubmit} className="leave-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            style={{ backgroundColor: "#a8adaa" }}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            style={{ backgroundColor: "#a8adaa" }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled
          />
        </div>
        <div className="form-group">
          <label>From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>To:</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Reason:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Assigned Teacher:</label>
          <select
            value={assignedTeacher}
            onChange={(e) => setAssignedTeacher(e.target.value)}
          >
            <option value="">Select Teacher</option>
            {teacherData.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Assigned Rector:</label>
          <select
            value={assignedRector}
            onChange={(e) => setAssignedRector(e.target.value)}
          >
            <option value="">Select Rector</option>
            {rectorData.map((rector) => (
              <option key={rector._id} value={rector._id}>
                {rector.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateRequest;
