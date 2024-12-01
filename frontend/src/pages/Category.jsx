import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Category() {
  const [category, setCategory] = useState([]);
  const categoryNameRef = useRef(null);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const token = localStorage.getItem("token");

      if (editCategoryId === null) {
        const addCategoryResponse = await axios.post(
          `http://127.0.0.1:3000/api/category/addCategory`,
          { categoryName: categoryNameRef.current.value },
          { headers: { authorization: token } }
        );
        if (addCategoryResponse.status === 200) {
          console.log(addCategoryResponse);
          //setCategory(categoryDetailsResponse.data.data);
          getCategoryDetails();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>Category</h3>
        <div>
          <Card style={{ padding: "20px", maxWidth: "400px" }}>
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="categoryName">Category Name:</label>
                <input
                  type="text"
                  id="categoryName"
                  ref={categoryNameRef}
                  required
                />
              </div>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Adding Category..." : "Add Category"}
              </Button>
            </form>
          </Card>
        </div>
        <br />
        <ul style={{ padding: "0", margin: "20px auto", width: "80%" }}>
          {category.length > 0 ? (
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
            ))
          ) : (
            <li>No Category Data Found</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Category;
