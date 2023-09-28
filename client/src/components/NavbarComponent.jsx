import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLogout, AiOutlineSearch } from "react-icons/ai";
import { Form, Button } from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

import "react-bootstrap-typeahead/css/Typeahead.css";
import { Container } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authSlice";

const NavbarComponent = ({
  onSearch,
  handleSearch,
  suggestions,
  IMAGE_PATH,
  setSearch,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    try {
      axios.get("http://localhost:5000/api/logout", {
        withCredentials: true
      })
      dispatch(logout());
      localStorage.removeItem("userData");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <Navbar className=" fixed-top bg-dark" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <h1 className="heading">
            MOvie<span style={{ color: "red" }}>S</span>phere
          </h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <div className="d-flex" style={{ color: "white" }}>
            <FaUserCircle size={44} className="mt-1 mx-1" />
            {user && (
              <>
                <h2 className="mx-2 mt-2 welocome">welcome </h2>
                <NavDropdown
                  className="mt-3 dropdown "
                  title={user.name}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Divider />
                  <div className="cursor-pointer">
                    <button className="logout-btn" onClick={handleLogout}>
                      <AiOutlineLogout className=" mx-2" size={26} />
                      Logout
                    </button>
                  </div>
                </NavDropdown>
              </>
            )}
          </div>
          <Form onSubmit={onSearch} className="d-flex ">
            <AsyncTypeahead
              id="movie-search"
              placeholder="Search"
              labelKey={(option) => option.title}
              minLength={1}
              delay={500}
              onSearch={handleSearch}
              onChange={(selected) => {
                if (selected && selected.length > 0) {
                  setSearch(selected[0].title);
                }
              }}
              options={suggestions}
              renderMenuItemChildren={(option) => (
                <div key={option.title}>
                  <img
                    src={`${IMAGE_PATH}${option.posterPath}`}
                    alt={option.title}
                    style={{
                      height: "40px",
                      width: "auto",
                      marginRight: "10px",
                    }}
                  />
                  {option.title}
                </div>
              )}
            />

            <Button type="submit" className="mx-1" variant="outline-success">
              <AiOutlineSearch size={25} />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
