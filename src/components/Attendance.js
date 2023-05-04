import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";
import Login from "../Pages/Login";
import { post } from "../helper/apiHelper";
import { validateResponseUser } from "../helper/validateResponse";

function App({ liveCenter }) {
  const [image, setImage] = useState(null);
  const [faceAuth, setFaceauth] = useState(true); ///   skip the face auth

  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Submit the form data, including the captured image
  };

  const validate = () => {
    setFaceauth(true);
  };

  const handleImageUpload = async (event) => {
    const body = {
      routeId: liveCenter?.routeId,
      locationId: liveCenter?.id,
      refId: liveCenter?.refId,
      image: image,
      lat: 22.8796787,
      long: 88.875785,
    };
    const response = await post("/user/visitLocation", body);
    if (validateResponseUser(response)) {
      window.location.reload();
    }
  };

  return (
    <center>
      <Login validate={validate} display={!faceAuth} />
      {faceAuth && (
        <>
          <h5 style={{ color: "green" }}>User Authenticated!</h5>
          <h3>Please Capture Image</h3>
          {image && (
            <img src={image} alt="rrr" style={{ height: 200, width: 250 }} />
          )}

          <form onSubmit={handleSubmit}>
            {!image ? (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  facingMode="environment"
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 300,
                    height: 300,
                  }}
                />
                <center>
                  <button
                    className="button"
                    style={{ marginTop: "1rem", color: "white" }}
                    onClick={capture}
                  >
                    Capture Photo
                  </button>
                </center>
              </>
            ) : (
              <center>
                <button
                  className="button"
                  style={{ marginTop: "1rem", color: "white" }}
                  onClick={() => handleImageUpload()}
                >
                  Submit
                </button>
              </center>
            )}
          </form>
        </>
      )}
    </center>
  );
}

export default App;
