import * as React from "react";
import MapIcon from "../assets/map.jpg";
import "../css/style.css";
import icon_activity from "../images/icon_activity.svg";

export default function FolderList() {
  return (
    <body className="d-flex flex-column h-100 overflow-hidden">
      <div className="bg-purple"></div>
      <main className="flex-shrink-0 main-foot-adjust  pt-2">
        <div className="container">
          <div
            style={{
              backgroundColor: "#5d63d1",
              padding: "16rem",
              margin: "-13px",
              paddingTop: "3rem",
              background: `url(${MapIcon})`,
            }}
          >
            <div className="row profile-dtl">
              <div className="col-2"></div>
            </div>
          </div>
          <div
            className="d-flex justify-content-center mb-4 total-btn  mt-5"
            onClick={() => (window.location.href = "/#/login")}
          >
            <div>
              <img src={icon_activity} alt="" className="mr-2" />
            </div>
            <div className="total-title">
              {window.site_text("pages.landing.sign_in")}
            </div>
            {/* <div>Total: 04 Routes</div> */}
          </div>
          <div
            className="d-flex justify-content-center mb-4 total-btn  mt-1"
            onClick={() => (window.location.href = "/#/register")}
          >
            <div>
              <img src={icon_activity} alt="" className="mr-2" />
            </div>
            <div className="total-title">
              {window.site_text("pages.landing.register")}
            </div>
            {/* <div>Total: 04 Routes</div> */}
          </div>
        </div>
      </main>
    </body>
  );
}
