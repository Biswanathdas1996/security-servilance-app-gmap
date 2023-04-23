import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import * as tf from "@tensorflow/tfjs";
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";
import _ from "lodash";
import Auth from "../Auth.json";
// NEW MODEL
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "../utilities";
import { _transction_signed } from "../web3/connect";
import { createAnduploadFileToIpfs } from "../ipfs";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [faceData, setFaceData] = useState("");
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);
  const [findFace, setFindFace] = useState(null);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  async function handleSubmit(event) {
    setStart(true);
    event.preventDefault();
    const resultsSaveMetaData = await createAnduploadFileToIpfs(faceData);
    console.log("--->ipfs", resultsSaveMetaData);
    const txn = await _transction_signed(
      "create",
      name,
      JSON.stringify(resultsSaveMetaData),
      email
    );
    setResponse(txn);

    window.location.replace("/#/login");
    //
    // Handle form submission
  }

  const modalClose = () => {
    window.location.replace("/#/login");
    setStart(false);
  };
  //  Load posenet
  const runFacemesh = async () => {
    setLoading(true);
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );
    setLoading(false);
    setInterval(() => {
      detect(net);
    }, 2000);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections

      const face = await net.estimateFaces({
        input: video,
        predictIrises: false,
        flipHorizontal: false,
        predictBoundingBox: true,
      });

      const faceStringData = JSON.stringify(face[0]?.scaledMesh);
      if (face?.length > 0) {
        setFindFace(faceStringData);
      }
      // console.log(face[0]?.scaledMesh);
      setFaceData(faceStringData);
      console.log("------>", faceStringData);
      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => {
        drawMesh(face, ctx);
      });
    }
  };

  useEffect(() => {
    runFacemesh();
  }, []);

  return (
    <>
      {start ? (
        <div
          style={{
            marginTop: "10rem",
          }}
        >
          <center>
            <div className="loader"></div>
            <p style={{ fontSize: 20, fontWeight: "bold" }}>
              {" "}
              Validating blockchain transction ...
            </p>
          </center>
        </div>
      ) : (
        <div className="App">
          <header className="App-header">
            <h1>Register</h1>
            {loading ? (
              <h1>Loading Model...</h1>
            ) : (
              <>
                <Webcam
                  ref={webcamRef}
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 480,
                  }}
                />

                <canvas
                  ref={canvasRef}
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 480,
                  }}
                />
              </>
            )}
          </header>
          <center>
            {findFace ? (
              <form
                className="registration-form"
                style={{
                  width: "20rem",
                  textAlign: "left",
                  border: "1px solid #b5b2b2",
                  borderRadius: 10,
                  marginTop: 30,
                }}
              >
                <div style={{ margin: 10 }}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">PIN</label>
                    <input
                      type="text"
                      id="contact"
                      className="form-control"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Register
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="loader"></div>
                <p style={{ fontSize: 20, fontWeight: "bold" }}>
                  Inicieating model, Please wait...
                </p>
              </>
            )}
          </center>
        </div>
      )}
    </>
  );
}

export default App;
