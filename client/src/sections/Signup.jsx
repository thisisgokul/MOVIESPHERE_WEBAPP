import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import "./auth.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !password || !email) {
      return setError("Please fill all the inputs..");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError("Please enter a valid email address.");
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
    }
    setError("");
    try {
      await axios.post("http://localhost:5000/api/signup", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError("email already registered");
      } else {
        setError("An error occurred while signing up. Please try again later.");
      }
    }
  };

  return (
    <Container fluid className="backgroundStyle">
      <div className="overlay"></div>

      <Container>
        <Navbar.Brand href="#">
          <h1 className="text-white mt-3">
            MOvie<span style={{ color: "red" }}>S</span>phere
          </h1>
        </Navbar.Brand>
        <Row className="justify-content-center align-items-center vh-100">
          <Col xs={12} md={6} lg={4}>
            <div className="signup-form">
              <h2 className="text-white text-center my-4">Sign Up Now</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Fullname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter fullname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <p className="text-danger">{error}</p>
                <div className="d-flex my-3 justify-content-center">
                  <Button type="submit" variant="primary">
                    Signup
                  </Button>
                </div>
                <div className="text-white text-center mt-2">
                  Already have an account?{" "}
                  <span>
                    <Link to={"/login"}>Login</Link>
                  </span>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Signup;
