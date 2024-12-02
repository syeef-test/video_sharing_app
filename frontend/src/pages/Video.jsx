import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Video() {
  const [video, setVideo] = useState([]);

  const videoTitleRef = useRef(null);
  const videoDescriptionRef = useRef(null);
  const videoLinkRef = useRef(null);

  const [editVideoId, setEditVideoId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getVideoDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const videoDetailsResponse = await axios.get(
        `http://127.0.0.1:3000/api/video/getVideo`,
        { headers: { authorization: token } }
      );
      if (videoDetailsResponse.status === 200) {
        console.log(videoDetailsResponse);
        setVideo(videoDetailsResponse.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideoDetails();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const token = localStorage.getItem("token");

      if (editVideoId === null) {
        const addVideoResponse = await axios.post(
          `http://127.0.0.1:3000/api/video/addVideo`,
          {
            title: videoTitleRef.current.value,
            description: videoDescriptionRef.current.value,
            videoLink: videoLinkRef.current.value,
          },
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

  const deleteHandler = async (videoId) => {
    try {
      const token = localStorage.getItem("token");

      const deleteVideoResponse = await axios.delete(
        `http://127.0.0.1:3000/api/video/deleteVideo/${videoId}`,
        { headers: { authorization: token } }
      );

      if (deleteVideoResponse.status === 200) {
        alert("Video Deleted Succesfully");
        getVideoDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>Video</h3>
        <br />
        <div>
          <Card style={{ padding: "20px", maxWidth: "400px" }}>
            <h2>Add Video</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="videoTitle">Video Title:</label>
                <input
                  type="text"
                  id="videoTitle"
                  ref={videoTitleRef}
                  required
                />
              </div>
              <div>
                <label htmlFor="videoDescription">Video Description:</label>
                <input
                  type="text"
                  id="videoDescription"
                  ref={videoDescriptionRef}
                  required
                />
              </div>
              <div>
                <label htmlFor="videoLink">Video Link:</label>
                <input type="text" id="videoLink" ref={videoLinkRef} required />
              </div>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Adding Video..." : "Add Video"}
              </Button>
            </form>
          </Card>
        </div>
        <ul style={{ padding: "0", margin: "20px auto", width: "80%" }}>
          {video.length > 0 ? (
            video.map((item) => (
              <li
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
                key={item._id}
              >
                {item.title}
                {item.description}
                <Button
                  variant="danger"
                  onClick={() => deleteHandler(item._id)}
                >
                  Delete
                </Button>
              </li>
            ))
          ) : (
            <li>No Video Data Found</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Video;
