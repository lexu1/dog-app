import axios from "axios";
import React, { useState, useEffect } from "react";
const api_key =
  "live_4eFOmeD7ZHwk0tR2vXrIBUvEO2h3CDwgWRnuOrWq5AHED8BsGon0CCYxwNtEIVcl";
const Home = () => {
  const [images, setImages] = useState([]);
  const getData = async () => {
    const api = `https://api.thedogapi.com/v1/images/search/?limit=9&page=0`;

    const response = await axios.get(api, {
      headers: {
        "x-api-key": api_key,
      },
    });
    setImages((images) => [...images, ...response.data]);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <h1 className="text-center">Welcome to dogeland</h1>
      <div className="d-flex flex-wrap justify-content-around ">
        {images.map((image) => {
          return (
            <div key={image.id} className="d-flex justify-content-center ">
              <div className="flex-column">
                <img
                  style={{
                    width: "400px",
                    marginLeft: "10px",
                    marginTop: "10px",
                    height: "270px",
                    marginBottom: "10px",
                  }}
                  src={image.url}
                  alt="cat"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
