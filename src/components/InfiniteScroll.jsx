import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
const api_key =
  "live_4eFOmeD7ZHwk0tR2vXrIBUvEO2h3CDwgWRnuOrWq5AHED8BsGon0CCYxwNtEIVcl";
const InfiniteScroll = () => {
  const [images, setImages] = useState([]);
  let pageNr = 0;
  const getData = async () => {
    const api = `https://api.thedogapi.com/v1/images/search/?limit=9&page=${pageNr}`;

    const response = await axios.get(api, {
      headers: {
        "x-api-key": api_key,
      },
    });
    setImages((images) => [...images, ...response.data]);
  };

  const listInnerRef = useRef();

  let debounce = _.debounce(function () {
    console.log("debounce");
    getData();
  }, 200);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;

      if (scrollTop + clientHeight > scrollHeight * 0.9) {
        debounce();
      }
    }
    console.log(images);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="d-flex flex-wrap justify-content-around"
      style={{ height: "850px", overflowY: "auto" }}
      ref={listInnerRef}
      onScroll={onScroll}
    >
      {images.map((image, index) => {
        return (
          <div
            key={image.id + index}
            className="d-flex justify-content-center "
          >
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
  );
};

export default InfiniteScroll;
