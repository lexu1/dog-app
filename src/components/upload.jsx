import React from "react";
import "./upload.css";
import { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);

  const api_key =
    "live_4eFOmeD7ZHwk0tR2vXrIBUvEO2h3CDwgWRnuOrWq5AHED8BsGon0CCYxwNtEIVcl";
  const api = "https://api.thedogapi.com/v1/images/upload";

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", file);

    if (file !== null) {
      axios
        .post(api, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": api_key,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(file);
    } else {
      console.log("Please select a file");
    }
  };
  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <div className="col-md-6">
      <form method="post" action="#" id="#" onSubmit={onSubmit}>
        <div className="form-group files">
          <label>Upload Your File </label>
          <input
            type="file"
            className="form-control"
            multiple=""
            onChange={onInputChange}
          ></input>
        </div>
        <button type="submit" className="btn btn-success btn-block">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
