import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Video() {
  const [video, setVideo] = useState([]);

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
  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h3>Video</h3>
        <br />
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
