import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../Redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import "./auth.css";
import axios from "axios";
import OAuth from "../components/OAuth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(login(data));
      localStorage.setItem("userData", JSON.stringify(data));
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
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
              <h2 className="text-white text-center my-4">Login</h2>
              <Form onSubmit={handleSubmit}>
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

                <div className="d-flex my-3 justify-content-center">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                  </Button>
                </div>
                <div className="text-white text-center mt-2">
                  New to MovieSphere?
                  <span>
                    <Link to={"/"}>signup</Link>
                  </span>
                </div>
              </Form>
              <OAuth/>
            </div>
           
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Login;
