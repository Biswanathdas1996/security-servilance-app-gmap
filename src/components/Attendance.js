import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";
import Login from "../Pages/Login";
import { post } from "../helper/apiHelper";
import { validateResponseUser } from "../helper/validateResponse";

function App({ liveCenter }) {
  const [image, setImage] = useState(null);
  const [selfImage, setSelfImage] = useState(null);
  const [faceAuth, setFaceauth] = useState(true); ///   skip the face auth

  const webcamRef = useRef(null);
  const webcam2Ref = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const captureSelfie = () => {
    const imageSrc = webcam2Ref.current.getScreenshot();
    setSelfImage(imageSrc);
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
      profileImage: selfImage,
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
          {/* <h5 style={{ color: "green" }}>User Authenticated!</h5> */}

          {!image ? (
            <>
              <h3>Please Capture Site Image</h3>
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
            <>
              {!selfImage ? (
                <>
                  <h3>Please Capture Selfie</h3>
                  <Webcam
                    audio={false}
                    ref={webcam2Ref}
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
                      onClick={captureSelfie}
                    >
                      Capture Selfie
                    </button>
                  </center>
                </>
              ) : (
                <center>
                  <b>Site Image</b>
                  <br />
                  <img
                    src={image}
                    alt="rrr"
                    style={{ height: 200, width: 250 }}
                  />
                  <br />
                  <b>Site Selfie</b>
                  <br />
                  <img
                    src={selfImage}
                    alt="rrr"
                    style={{ height: 200, width: 250 }}
                  />
                  <br />
                  <button
                    className="button"
                    style={{ marginTop: "1rem", color: "white" }}
                    onClick={() => handleImageUpload()}
                  >
                    Submit
                  </button>
                </center>
              )}
            </>
          )}
        </>
      )}
    </center>
  );
}

export default App;
