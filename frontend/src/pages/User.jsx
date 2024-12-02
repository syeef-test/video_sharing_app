import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function User() {
  const [user, setUser] = useState([]);

  const userEmailRef = useRef(null);
  const userPasswordRef = useRef(null);
  const [editUserId, setEdituserId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const userDetailsResponse = await axios.get(
        `http://127.0.0.1:3000/api/user/getUser`,
        { headers: { authorization: token } }
      );
      if (userDetailsResponse.status === 200) {
        //console.log(userDetailsResponse);
        setUser(userDetailsResponse.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const token = localStorage.getItem("token");

      if (editUserId === null) {
        const addUserResponse = await axios.post(
          `http://127.0.0.1:3000/api/user/addUser`,
          {
            email: userEmailRef.current.value,
            password: userPasswordRef.current.value,
          },
          { headers: { authorization: token } }
        );
        if (addUserResponse.status === 200) {
          console.log(addUserResponse);
          //setCategory(categoryDetailsResponse.data.data);
          getUserDetails();
        }
      } else {
        const editUserResponse = await axios.put(
          `http://127.0.0.1:3000/api/user/updateUser/${editUserId}`,
          {
            email: userEmailRef.current.value,
            password: userPasswordRef.current.value,
          },
          { headers: { authorization: token } }
        );
        if (editUserResponse.status === 200) {
          console.log(editUserResponse);
          alert("User Details Updated Succesfully");
          //setCategory(categoryDetailsResponse.data.data);
          getUserDetails();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      const deleteUserResponse = await axios.delete(
        `http://127.0.0.1:3000/api/user/deleteUser/${userId}`,
        { headers: { authorization: token } }
      );

      if (deleteUserResponse.status === 200) {
        alert("User Deleted Succesfully");
        getUserDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = async (item) => {
    try {
      setEdituserId(item._id);
      //console.log("email", item.email);

      userEmailRef.current.value = item.email;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>User</h3>
        <br />
        <div>
          <Card style={{ padding: "20px", maxWidth: "400px" }}>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="userEmail">User Email:</label>
                <input type="text" id="userEmail" ref={userEmailRef} required />
              </div>
              <div>
                <label htmlFor="userPassword">User Password:</label>
                <input
                  type="text"
                  id="userPassword"
                  ref={userPasswordRef}
                  required
                />
              </div>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Adding User..." : "Add User"}
              </Button>
            </form>
          </Card>
        </div>
        <ul style={{ padding: "0", margin: "20px auto", width: "80%" }}>
          {user.length > 0 ? (
            user.map((item) => (
              <li
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                key={item._id}
              >
                {item.email}
                <Button variant="success" onClick={() => editHandler(item)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteHandler(item._id)}
                >
                  Delete
                </Button>
              </li>
            ))
          ) : (
            <li>No User Data Found</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default User;
