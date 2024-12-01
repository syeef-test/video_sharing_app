import React, { useState, useRef } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-reducer";

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const loginReponse = await axios.post(
        `http://127.0.0.1:3000/api/auth/adminLogin`,
        {
          email: email,
          password: password,
        }
      );

      if (loginReponse.status === 200) {
        alert("Admin Login Succesfull");
        dispatch(authActions.login(loginReponse.data));
        history.push("/adminhome");
      }
    } catch (error) {
      setError("Error Occured");
      console.log(error);
      alert(error.response.data.message);
    } finally {
      setLoading(false);
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card style={{ padding: "20px", maxWidth: "400px" }}>
          <h2>Admin Login</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" ref={emailRef} required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" ref={passwordRef} required />
            </div>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Loging in..." : "Login"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default Login;
