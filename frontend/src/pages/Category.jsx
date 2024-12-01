import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Category() {
  const [category, setCategory] = useState([]);

  const getCategoryDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const categoryDetailsResponse = await axios.get(
        `http://127.0.0.1:3000/api/category/getCategory`,
        { headers: { authorization: token } }
      );
      if (categoryDetailsResponse.status === 200) {
        console.log(categoryDetailsResponse);
        setCategory(categoryDetailsResponse.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryDetails();
  }, []);
  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>Category</h3>
        <br />
        <ul style={{ padding: "0", margin: "20px auto", width: "80%" }}>
          {category &&
            category.map((item) => (
              <li
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                key={item._id}
              >
                {item.categoryName}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default Category;
