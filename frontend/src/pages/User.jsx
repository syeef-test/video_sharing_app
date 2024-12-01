import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function User() {
  const [user, setUser] = useState([]);

  const getUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const userDetailsResponse = await axios.get(
        `http://127.0.0.1:3000/api/user/getUser`,
        { headers: { authorization: token } }
      );
      if (userDetailsResponse.status === 200) {
        console.log(userDetailsResponse);
        setUser(userDetailsResponse.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>User</h3>
        <br />
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
