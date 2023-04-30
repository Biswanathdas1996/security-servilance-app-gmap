import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import MapIcon from "../assets/235861.png";
import { get, post } from "../helper/apiHelper";
import { validateResponseUser } from "../helper/validateResponse";
import Card from "@mui/material/Card";
import "../css/style.css";

import img_profile from "../images/img_profile.jpg";
import icon_more from "../images/icon_more.svg";
import icon_activity from "../images/icon_activity.svg";
import img_map_1 from "../images/img_map_1.jpg";

const timeStampToTime = (timestamp) => {
  const date = new Date(timestamp * 1000); // convert seconds to milliseconds
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // months are zero-indexed, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;
  console.log(formattedDate);
  return formattedDate;
};

export default function FolderList() {
  const [routes, setRoutes] = React.useState(null);

  React.useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    const response = await get("/user/getRoutes");
    console.log("response", response);
    if (validateResponseUser(response)) {
      setRoutes(response?.data);
    }
  };

  const checkIfFutureDate = (date) => {
    console.log("---->date", date);
    const inputDate = new Date(date);
    const currentDate = new Date();

    if (inputDate > currentDate) {
      console.log("The input date is in the future.");
      return true;
    } else {
      console.log("The input date is not in the future.");
      return false;
    }
  };

  const getAllUpcommingRoutes = routes?.filter((route) =>
    checkIfFutureDate(timeStampToTime(route?.startTime))
  );
  const getAllPrevRoutes = routes?.filter((route) =>
    checkIfFutureDate(timeStampToTime(route?.startTime))
  );

  console.log("---->getAllPrevRoutes", getAllUpcommingRoutes);

  return (
    <body className="d-flex flex-column h-100">
      <div className="bg-purple"></div>
      <main className="flex-shrink-0 main-foot-adjust  pt-2">
        <div className="container">
          <div
            style={{
              background: "#5d63d1",
              padding: 22,
              margin: "-13px",
              paddingTop: "3rem",
            }}
          >
            <div className="row profile-dtl">
              <div className="col-2">
                <div className="img-hldr">
                  <img src={img_profile} alt="" />
                </div>
              </div>
              <div className="col-8">
                <div className="desc-hldr">
                  <h2>
                    Hello, <strong>Aronna Chowdhury</strong>
                  </h2>
                  <p>Sub Inspector</p>
                </div>
              </div>
              <div className="col-2">
                <img src={icon_more} alt="More" />
              </div>
            </div>

            <div className="container prog-holder mb-4">
              <div className="d-flex justify-content-between mb-4">
                <div className="goal-title">
                  Week goal <strong>50 km</strong>
                </div>
                <div>
                  <i className="bi bi-chevron-right"></i>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between progress-title">
                  <div>2 Route Done</div>
                  <div>1 Route left</div>
                </div>

                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "75%" }}
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center mb-4 total-btn  mt-5">
            <div>
              <img src={icon_activity} alt="" className="mr-2" />
            </div>
            <div className="total-title">
              {window.site_text("pages.home.join_duty")}
            </div>
            {/* <div>Total: 04 Routes</div> */}
          </div>

          <div className="d-flex justify-content-between mb-4">
            <div>
              <strong>
                {" "}
                {window.site_text("pages.home.todats_route_text")}
              </strong>
            </div>
            <div>
              <a href="#url">{window.site_text("pages.home.view_all")}</a>
            </div>
          </div>

          <div className="container activity-hldr">
            {routes ? (
              routes?.map((route, index) => {
                return (
                  <div
                    className="row activity-card"
                    onClick={() =>
                      (window.location.href = `#/map/${route?.route?.id}`)
                    }
                    key={`cers-${index}`}
                  >
                    <div className="col">
                      <div className="img-hldr">
                        <img src={MapIcon} alt="map" height="65px" />
                      </div>
                    </div>
                    <div className="col">
                      <div className="desc-hldr">
                        <p>{route?.date}</p>
                        <p>
                          <strong>{route?.route?.name}</strong>
                        </p>
                        <p>{`${timeStampToTime(Number(route?.startTime))}`}</p>
                      </div>
                    </div>
                    <div className="col my-auto activity-btn">
                      <button>
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <center>
                <div className="loader"></div>
              </center>
            )}
          </div>
        </div>
      </main>
    </body>
  );
}
