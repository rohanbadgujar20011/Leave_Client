import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { login } from "../../util/Allapi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../assets/images/background.png";
import Logo from "../../assets/images/logo.png";
import { useAuth } from "../../context/AuthContext";
import MainNav from "../../components/MainNav/MainNav";
const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login: authLogin, setUserData, setleaves, setUserRole } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(login, {
        email: inputEmail,
        password: inputPassword,
      });

      if (res.status === 200) {
        // Redirect to dashboard or home page upon successful login
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userRole", res.data.Role);
        localStorage.setItem("isLoggedIn", true);
        authLogin();
        setUserData(res.data.user);
        setleaves(res.data.leaves);
        setUserRole("student");
        console.log(res.data.leaves);

        setTimeout(() => {
          navigate("/studentdashboard");
          setLoading(false);
        }, 4000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  return (
    <div>
      <MainNav />
      <div
        className="sign-in__wrapper"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="sign-in__backdrop"></div>
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
          {/* Header */}
          <img
            className="img-thumbnail mx-auto d-block mb-2"
            src={Logo}
            alt="logo"
          />
          <div className="h4 mb-2 text-center">Login</div>
          {showError ? (
            <Alert
              className="mb-2"
              variant="danger"
              onClose={() => showError(false)}
              dismissible
            >
              {errorMessage}
            </Alert>
          ) : (
            <div />
          )}
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            style={{ marginTop: "15px" }}
            variant="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
          <div className="d-grid justify-content-end">
            <Button className="text-muted px-0" variant="link" href="/register">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
