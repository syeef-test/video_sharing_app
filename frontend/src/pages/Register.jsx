import React, { useState, useRef } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Register() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirm_passwordRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const confirm_password = confirm_passwordRef.current.value;

      if (password === confirm_password) {
        const registerReponse = await axios.post(`url`, {
          email: email,
          password: password,
        });

        if (registerReponse.status === 200) {
          alert("Admin Created Succesfully");
        }
      } else {
        alert("Password And Confirm Password Did Not Match");
      }
    } catch (error) {
      setError("Error Occured");
      console.log(error);
      alert("Error Occured");
    } finally {
      setLoading(false);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirm_passwordRef.current.value = "";
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
          <h2>Admin Register</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" ref={emailRef} required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" ref={passwordRef} required />
            </div>
            <div>
              <label htmlFor="confirm_password">Confirm Password:</label>
              <input
                type="password"
                id="confirm_password"
                ref={confirm_passwordRef}
                required
              />
            </div>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default Register;
