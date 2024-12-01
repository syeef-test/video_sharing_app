import React from "react";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-reducer";

function Navigation() {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(authActions.logout());
    alert("Logout Succesful");
    history.push("/login");
  };

  return (
    <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!isAuth && <NavLink to="/login">Admin Login</NavLink>}
            {!isAuth && <NavLink to="/register">Admin Register</NavLink>}
            {isAuth && (
              <Button
                variant="danger"
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
