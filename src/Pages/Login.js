import React, { useRef, useEffect, useState } from "react";
import "../App.css";
import * as tf from "@tensorflow/tfjs";
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";
import _ from "lodash";
// import Auth from "../Auth.json";
// NEW MODEL
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "../utilities";
import swal from "sweetalert";
import { _transction_signed, _fetch_signed } from "../web3/connect";
import { createAnduploadFileToIpfs } from "../ipfs";
import { get, post, put, del } from "../helper/apiHelper";

function App({ validate, display }) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [user, setUser] = useState(null);
  const [contactNo, setContactNo] = useState("");
  const [faceData, setFaceData] = useState("");
  const [authFaceData, setAuthFaceData] = useState(null);
  const [unauthenticated, setUnauthenticated] = useState(false);

  let interval;

  function handleEmailChange(event) {
    setContactNo(event.target.value);
  }

  async function handleSubmit() {
    // const data = await _fetch_signed("getUser", contactNo);
    // console.log("--->data", data);
    // setUser(data);
    // const url = JSON.parse(data?.faceData);
    // var requestOptions = {
    //   method: "GET",
    //   redirect: "follow",
    // };

    // const faceData = await fetch(
    //   // `https://ipfs.io/ipfs/${data?.faceData}/ipfs.json`,
    //   `https://endpoints.in/endpoints/ipfs/fetch-ipfs.php?id=${url?.path}`,
    //   requestOptions
    // )
    //   .then((response) => response.json())
    //   .then((result) => result)
    //   .catch((error) => console.log("error", error));

    const faceData = await post("/auth/getFaceDataByEmpID", {
      empID: contactNo,
    });

    const faceIDData = JSON.parse(faceData?.data?.faceID);
    console.log("--->faceData", faceIDData);
    // setAuthFaceData(faceData?.data?.faceID);
    setAuthFaceData(JSON.parse(faceIDData));
  }

  //  Load posenet

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const runFacemesh = async (authFaceDataVal) => {
    const net = await facemesh.load(
      facemesh.SupportedPackages.mediapipeFacemesh
    );

    interval = setInterval(() => {
      detect(net, authFaceDataVal);
    }, 1000);
  };

  const detect = async (net, authFaceDataVal) => {
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
      // OLD MODEL
      //       const face = await net.estimateFaces(video);
      // NEW MODEL
      const face = await net.estimateFaces({
        input: video,
        predictIrises: false,
        flipHorizontal: false,
        predictBoundingBox: true,
      });
      // console.log(face[0]?.scaledMesh);
      setFaceData(JSON.stringify(face[0]?.scaledMesh));
      // console.log("Auth", Auth[0]?.annotations);

      const detectedLandmarks = face[0]?.scaledMesh;

      function distance(a, b) {
        const [ax, ay, az] = a;
        const [bx, by, bz] = b;
        return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2);
      }

      const tolerance = 50; // adjust this value to set the tolerance for matching faces

      const distances =
        detectedLandmarks &&
        detectedLandmarks.map((landmark, i) => {
          if (authFaceDataVal) {
            return distance(landmark, authFaceDataVal[i]);
          }
        });
      // console.log("-----distances--->", distances);
      const isMatch =
        distances &&
        distances.every((distance) => {
          console.log("-----distance--->", distance);
          return distance < tolerance;
        });

      if (isMatch) {
        // authenticated user
        console.log("User authenticated");
        clearInterval(interval);
        validate();
        setAuthFaceData(null);
        swal(
          "Authenticated !",
          `${user?.name}, Welcome to our portal`,
          "success"
        ).then((value) => {
          return;
          // window.location.replace("/");
        });
      } else {
        // unauthenticated user
        console.log("User Unauthenticated");
        setUnauthenticated(true);
      }

      // Get canvas context

      const ctx = canvasRef && canvasRef?.current?.getContext("2d");
      if (face && ctx) {
        requestAnimationFrame(() => {
          drawMesh(face, ctx);
        });
      }
    }
  };

  useEffect(() => {
    runFacemesh(authFaceData);
    return clearInterval(interval);
  }, [authFaceData, interval, runFacemesh]);

  return (
    <div
      className="App"
      style={display ? { display: "block" } : { display: "none" }}
    >
      <header className="App-header">
        {authFaceData ? (
          <>
            <Webcam
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

            <canvas
              ref={canvasRef}
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
          </>
        ) : (
          <center>
            <form
              className="registration-form"
              style={{
                width: "20rem",
                textAlign: "left",
                border: "1px solid #b5b2b2",
                borderRadius: 10,
              }}
            >
              <div style={{ margin: 10 }}>
                <div className="form-group">
                  <label htmlFor="email">PIN</label>
                  <input
                    type="text"
                    id="contact"
                    className="form-control"
                    placeholder="Enter PIN"
                    value={contactNo}
                    onChange={handleEmailChange}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => handleSubmit(e)}
                >
                  Authenticate
                </button>
              </div>
            </form>
          </center>
        )}
      </header>
      {unauthenticated && (
        <h5 style={{ textAlign: "center", fontSize: 20, color: "red" }}>
          Unauthenticated
        </h5>
      )}
    </div>
  );
}

export default App;
