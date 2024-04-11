import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./register.css";
import { register } from "../../util/Allapi";
import axios from "axios";
import BackgroundImage from "../../assets/images/background.png";
import Logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfPassword, setInputConfPassword] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputYear, setInputYear] = useState("");
  const [inputDepartment, setInputDepartment] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setmessage] = useState("");
  const navigate=useNavigate()
  useEffect(() => {
    // Fetch list of teachers when component mounts
    const fetchTeachers = async () => {
      try {
        // Mocking data for teachers, replace it with actual API call
        const mockTeachers = ["Teacher 1", "Teacher 2", "Teacher 3"];
        setTeachers(mockTeachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await delay(500);
    console.log(
      `Password: ${inputPassword}, Name: ${inputName}, Email: ${inputEmail}, Year: ${inputYear}, Department: ${inputDepartment}, Teacher: ${selectedTeacher}`
    );

    if (inputPassword === inputConfPassword) {
      try {
        const res = await axios.post(register, {
          name: inputName,
          email: inputEmail,
          password: inputPassword,
          year: inputYear,
          department: inputDepartment,
        });

        if (res.status === 201) {
          setmessage(res.data.message);
          setShow(true);
          // Reset form fields
          setInputName("");
          setInputEmail("");
          setInputPassword("");
          setInputConfPassword("");
          setInputYear("");
          setInputDepartment("");
          setSelectedTeacher("");
          navigate("/login")
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setmessage(error.response.data.message);
          setShow(true);
        } else {
          setmessage("An error occurred. Please try again later.");
          setShow(true);
        }
      }
    } else {
      setmessage("Password not Matching");
      setShow(true);
    }

    setLoading(false);
    setTimeout(() => {
      setShow(false);
    }, 2000);
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Register</div>
        {/* Alert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            {message}
          </Alert>
        ) : (
          <div />
        )}

        <Form.Group className="mb-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={inputName}
            placeholder="Name"
            onChange={(e) => setInputName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={inputEmail}
            placeholder="Email"
            onChange={(e) => setInputEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Control
            as="select"
            value={inputYear}
            onChange={(e) => setInputYear(e.target.value)}
            required
          >
            <option value="">Select Year</option>
            <option value="First Year">First Year</option>
            <option value="Second Year">Second Year</option>
            <option value="Third Year">Third Year</option>
            <option value="Fourth Year">Fourth Year</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-2" controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            value={inputDepartment}
            onChange={(e) => setInputDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            <option value="Computer">Computer</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="E&TC">E&TC</option>
            <option value="AIML">AIML</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-2" controlId="teacher">
          <Form.Label>Teacher</Form.Label>
          <Form.Control
            as="select"
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
            required
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher, index) => (
              <option key={index} value={teacher}>
                {teacher}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={inputConfPassword}
            placeholder="Confirm Password"
            onChange={(e) => setInputConfPassword(e.target.value)}
            required
          />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Register
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit">
            Registering...
          </Button>
        )}
        <div className="d-grid justify-content-end">
          <Button className="text-muted px-0" variant="link" href="/login">
            Login
          </Button>
        </div>
      </Form>
      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center"></div>
    </div>
  );
};

export default Register;
