import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
const api_key =
  "live_4eFOmeD7ZHwk0tR2vXrIBUvEO2h3CDwgWRnuOrWq5AHED8BsGon0CCYxwNtEIVcl";
const InfScrollMyImg = () => {
  const [images, setImages] = useState([]);
  const [pageNr, setPageNr] = useState(0);
  const [fetchMore, setFetchMore] = useState(true);

  const getData = async () => {
    const api = `https://api.thedogapi.com/v1/images/?limit=3&page=${pageNr}`;

    const response = await axios.get(api, {
      headers: {
        "x-api-key": api_key,
      },
    });
    setImages((images) => [...images, ...response.data]);
    if (response.status === 200) {
      if (response.data.length < 3) {
        setFetchMore(false);
      }
    }
    console.log(response);
  };
  const listInnerRef = useRef();

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;

      if (scrollTop + clientHeight === scrollHeight && fetchMore) {
        setPageNr(pageNr + 1);
      }
    }
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNr]);

  return (
    <div
      className="d-flex flex-wrap justify-content-around"
      style={{ height: "850px", overflowY: "auto" }}
      ref={listInnerRef}
      onScroll={onScroll}
    >
      {images.map((image) => {
        return (
          <div key={image.id} className="d-flex justify-content-center ">
            <div className="flex-column">
              <img
                style={{
                  width: "800px",
                  marginLeft: "10px",
                  marginTop: "10px",
                  height: "auto",
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

export default InfScrollMyImg;
