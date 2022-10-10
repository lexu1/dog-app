import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const api_key =
  "live_4eFOmeD7ZHwk0tR2vXrIBUvEO2h3CDwgWRnuOrWq5AHED8BsGon0CCYxwNtEIVcl";
const MyImages = () => {
  const [images, setImages] = useState([]);
  const [pageNr, setPageNr] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const loadMore = () => {
    console.log("load more");
    setPageNr(pageNr + 1);
  };

  const getData = async () => {
    const api = `https://api.thedogapi.com/v1/images/?limit=3&page=${pageNr}&order=DESC`;

    const response = await axios.get(api, {
      headers: {
        "x-api-key": api_key,
      },
    });
    if (images.length) {
      setImages((images) => [...images, ...response.data]);
    } else {
      setImages(response.data);
    }
    if (response.data.length < 3) {
      setIsDisabled(true);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNr]);

  const deleteImage = async (id) => {
    const api = `https://api.thedogapi.com/v1/images/${id}`;
    const response = await axios.delete(api, {
      headers: {
        "x-api-key": api_key,
      },
    });
    console.log(response);
    setImages(images.filter((image) => image.id !== id));
  };

  const [newPageNr, setNewPageNr] = useState(0);

  const getNewData = async (nr) => {
    const api = `https://api.thedogapi.com/v1/images/?limit=3&page=${nr}&order=DESC`;
    const response = await axios.get(api, {
      headers: {
        "x-api-key": api_key,
      },
    });
    setImages(response.data);
    if (response.data.length < 3) {
      setIsDisabled(true);
    }
  };

  const pageButtons = (e) => {
    if (e === "next" && !isDisabled) {
      getNewData(newPageNr + 1);
      setNewPageNr(newPageNr + 1);
    } else if (e === "prev" && newPageNr >= 1) {
      getNewData(newPageNr - 1);
      setNewPageNr(newPageNr - 1);
    } else if (e !== "next" && e !== "prev") {
      getNewData(e);
      setNewPageNr(e);
    }
    console.log(e);
  };

  return (
    <div>
      <div className="container">
        <div className="d-flex flex-wrap ">
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

                  {/* delete button */}
                  <div className="d-flex justify-content-center ">
                    <button
                      style={{
                        marginLeft: "10px",
                        marginTop: "10px",
                        marginBottom: "10px",
                        width: "100px",
                      }}
                      className="btn btn-danger"
                      onClick={() => {
                        deleteImage(image.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* load more button */}
      {isDisabled ? (
        <div className="d-flex justify-content-center">
          <h2>Rip buton †(anu curent - tot anu curent )†</h2>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary align-self-center"
            style={{ width: "400px", marginLeft: "10px", marginTop: "10px" }}
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      )}
      <button
        className="btn btn-primary"
        style={{ width: "100px", marginLeft: "10px", marginTop: "10px" }}
        onClick={() => {
          pageButtons("prev");
        }}
      >
        Previous
      </button>
      <button
        className="btn btn-primary"
        style={{ width: "50px", marginLeft: "10px", marginTop: "10px" }}
        onClick={() => {
          pageButtons(newPageNr);
        }}
      >
        {newPageNr}
      </button>
      <button
        isDisabled={isDisabled}
        className="btn btn-primary"
        style={{ width: "50px", marginLeft: "10px", marginTop: "10px" }}
        onClick={() => {
          pageButtons(newPageNr + 1);
        }}
      >
        {newPageNr + 1}
      </button>
      <button
        isDisabled={isDisabled}
        className="btn btn-primary"
        style={{ width: "50px", marginLeft: "10px", marginTop: "10px" }}
        onClick={() => {
          pageButtons(newPageNr + 2);
        }}
      >
        {newPageNr + 2}
      </button>
      <button
        isDisabled={isDisabled}
        className="btn btn-primary"
        style={{ width: "80px", marginLeft: "10px", marginTop: "10px" }}
        onClick={() => {
          pageButtons("next");
        }}
      >
        Next
      </button>
    </div>
  );
};

export default MyImages;
