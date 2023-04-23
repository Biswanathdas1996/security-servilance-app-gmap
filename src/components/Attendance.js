import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";
import Login from "../Pages/Login";

function App() {
  const [image, setImage] = useState(null);
  const [faceAuth, setFaceauth] = useState(false);
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

  return (
    <center>
      <Login validate={validate} display={!faceAuth} />
      {faceAuth && (
        <>
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
                <Button variant="contained" onClick={capture}>
                  Capture Photo
                </Button>
              </>
            ) : (
              <Button
                variant="outlined"
                type="outlined"
                style={{ marginTop: 10 }}
                onClick={() => window.location.reload()}
              >
                Submit
              </Button>
            )}
          </form>
        </>
      )}
    </center>
  );
}

export default App;
