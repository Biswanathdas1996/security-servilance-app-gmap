import * as React from "react";
import "../css/start.css";

export default function FolderList() {
  return (
    <body>
      <div className="main container">
        <div className="welcome">
          <h6>Welcome To</h6>
        </div>
        <div className="Security">
          <h1>Security Surveillance System</h1>
        </div>
        <div className="lorem">
          <h6>
            Lorem ipsum doller sit amet, orem ipsum doller sit amet, orem ipsum
            doller sit amet, orem ipsum doller
          </h6>
        </div>
        <div className="img_map">
          <img src="../images/image1.png" alt="" />
        </div>
        <div
          className="button"
          onClick={() => (window.location.href = "#/login")}
          style={{ marginTop: 15 }}
        >
          {/* <button
            type="button"
            className="btn"
           
            style={{ width: "auto" }}
          > */}
          <div className="text">
            <h6>Get Started</h6>
          </div>
          {/* </button> */}
        </div>
        <div className="register" style={{ marginTop: 15 }}>
          <h6 onClick={() => (window.location.href = "#/register")}>
            Not a registered user? <b>CLICK HERE</b> to register
          </h6>
        </div>
      </div>
    </body>
  );
}
