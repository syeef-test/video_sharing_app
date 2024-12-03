import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { useHistory } from "react-router-dom";

function Video() {
  const [video, setVideo] = useState([]);
  const [category, setCategory] = useState([]);

  const videoTitleRef = useRef(null);
  const videoDescriptionRef = useRef(null);
  //const videoLinkRef = useRef(null);
  const videoFileRef = useRef(null);
  const videoCategoryRef = useRef(null);

  const [editVideoId, setEditVideoId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const history = useHistory();

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
    getCategoryDetails();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("title", videoTitleRef.current.value);
      formData.append("description", videoDescriptionRef.current.value);
      formData.append("categoryId", videoCategoryRef.current.value);
      formData.append("video", videoFileRef.current.files[0]);

      const headers = {
        authorization: token,
        "Content-Type": "multipart/form-data",
      };

      let response;
      if (editVideoId === null) {
        const addVideoResponse = await axios.post(
          `http://127.0.0.1:3000/api/video/addVideo`,
          formData,
          { headers }
        );

        if (addVideoResponse.status === 200) {
          console.log(addVideoResponse);
          alert("Video Details Added Succesfully");
          history.push("/alluploadedvideo");
          //getVideoDetails();
          //getCategoryDetails();
        }
      }
      //  } else {
      //   const editVideoResponse = await axios.put(
      //     `http://127.0.0.1:3000/api/video/updateVideo/${editVideoId}`,
      //     formData,
      //     { headers }
      //   );

      //   if (addVideoResponse.status === 200) {
      //     console.log(addVideoResponse);
      //     alert("Video Details Added Succesfully");
      //     getVideoDetails();
      //     getCategoryDetails();
      //   }
      // }

      // if (editVideoId === null) {
      //   const addVideoResponse = await axios.post(
      //     `http://127.0.0.1:3000/api/video/addVideo`,
      //     {
      //       title: videoTitleRef.current.value,
      //       description: videoDescriptionRef.current.value,
      //       video: videoFileRef.current.value,
      //       categoryId: videoCategoryRef.current.value,
      //     },
      //     { headers: { authorization: token } }
      //   );
      //   if (addVideoResponse.status === 200) {
      //     console.log(addVideoResponse);
      //     alert("Video Details Added Succesfully");
      //     //setCategory(categoryDetailsResponse.data.data);
      //     getVideoDetails();
      //     getCategoryDetails();
      //   }
      // } else {
      //   const editVideoResponse = await axios.put(
      //     `http://127.0.0.1:3000/api/video/updateVideo/${editVideoId}`,
      //     {
      //       title: videoTitleRef.current.value,
      //       description: videoDescriptionRef.current.value,
      //       categoryId: videoCategoryRef.current.value,
      //     },
      //     { headers: { authorization: token } }
      //   );
      //   if (editVideoResponse.status === 200) {
      //     console.log(editVideoResponse);
      //     alert("Video Edited Succefully");
      //     //setCategory(categoryDetailsResponse.data.data);
      //     getCategoryDetails();
      //     getVideoDetails();
      //   }
      // }
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

  const getCategoryDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const categoryDetailsResponse = await axios.get(
        `http://127.0.0.1:3000/api/category/getCategory`,
        { headers: { authorization: token } }
      );
      if (categoryDetailsResponse.status === 200) {
        console.log("category:", categoryDetailsResponse);
        setCategory(categoryDetailsResponse.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = async (item) => {
    try {
      setEditVideoId(item._id);
      //console.log("email", item.email);

      videoTitleRef.current.value = item.title;
      videoDescriptionRef.current.value = item.description;
      //videoLinkRef.current.value = item.videoLink;
      videoFileRef.current.value = "";
      videoCategoryRef.current.value = item.category;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>Video</h3>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
              {/* <div>
                <label htmlFor="videoLink">Video Link:</label>
                <input type="text" id="videoLink" ref={videoLinkRef} required />
              </div> */}
              <div>
                <label htmlFor="uploadFile">Upload File</label>
                <input
                  type="file"
                  id="uploadFile"
                  ref={videoFileRef}
                  required
                />
              </div>
              <div>
                <label htmlFor="videoCategory">Video Category:</label>
                <select id="videoCategory" ref={videoCategoryRef}>
                  {category &&
                    category.map((item) => (
                      <option value={item._id} key={item._id}>
                        {item.categoryName}
                      </option>
                    ))}
                </select>
              </div>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Adding Video..." : "Add Video"}
              </Button>
            </form>
          </Card>
        </div>
        <ul style={{ padding: "0", margin: "20px auto", width: "80%" }}>
          {video && video.length > 0 ? (
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

                {/* <Button variant="success" onClick={() => editHandler(item)}>
                  Edit
                </Button> */}

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
