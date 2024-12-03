import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function AllUploadedVideo() {
  const [videos, setVideos] = useState([]);

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
        setVideos(videoDetailsResponse.data.data);
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
      {videos && videos.length > 0
        ? videos.map((item) => (
            <div key={item._id}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <video width="20%" height="20%" controls>
                <source src={`${item.videoLink}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))
        : !loading && <p>No videos found.</p>}
    </>
  );
}

export default AllUploadedVideo;
