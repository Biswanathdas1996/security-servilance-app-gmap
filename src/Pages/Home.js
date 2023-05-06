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
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import DutyListData from "../components/DutyListData";
import DatePicker from "../components/DatePicker";
import img_profile from "../images/img_profile.jpg";
import LogoutIcon from "@mui/icons-material/Logout";
import "../css/dashboard.css";

const timeStampToTime = (timestamp) => {
  const date = new Date(timestamp * 1000); // convert seconds to milliseconds
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // months are zero-indexed, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;
  // console.log(formattedDate);
  return formattedDate;
};

export default function FolderList() {
  const [routes, setRoutes] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [loadding, setLoadding] = React.useState(false);
  const [date, setDate] = React.useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );

  React.useEffect(() => {
    fetchRoutes(date);
    const user = localStorage.getItem("x-user-data");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const fetchRoutes = async (date) => {
    setRoutes(null);
    setLoadding(true);
    const response = await post("/user/getRoutes", {
      date: date,
    });
    if (validateResponseUser(response)) {
      setRoutes(response?.data);
    }
    setLoadding(false);
  };

  const findRoute = () => {
    fetchRoutes(date);
  };

  const updateDateOnButtonClick = (date) => {
    setDate(date);
    fetchRoutes(date);
  };

  console.log("--user-->", user);
  return (
    <body className="d-flex flex-column h-100">
      <div className="bg-default" style={{ zIndex: 0 }}></div>

      <main className="flex-shrink-0 main-foot-adjust" style={{ zIndex: 1 }}>
        <div className="container pt-5">
          <div className="row profile-dtl">
            <div className="col-2">
              <div className="img-hldr">
                <img
                  src={user?.image && user?.image}
                  alt=""
                  height={50}
                  width={50}
                  style={{ borderRadius: "50%" }}
                />
              </div>
            </div>
            <div className="col-8">
              <div className="desc-hldr">
                <h2>
                  Hello, <strong>{user?.name}</strong>
                </h2>
                <p>{user?.designation}</p>
              </div>
            </div>
            <div className="col-2">
              <LogoutIcon
                style={{ fontSize: "1.6rem", color: "white" }}
                onClick={() => window.location.replace("#/login")}
              />
              {/* <img src="../images/icon_more.svg" alt="More" /> */}
            </div>
          </div>

          <div className="container find-duty-hldr mb-4">
            <div className="datepicker">
              <div className="mb-3 mt-3">
                <input
                  type="date"
                  className="form-control"
                  id=""
                  placeholder=""
                  name=""
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
              </div>
            </div>
            <div className="time-picker-hldr">
              <div
                className="time-hldr"
                onClick={() =>
                  updateDateOnButtonClick(
                    dayjs().subtract(1, "day").format("YYYY-MM-DD")
                  )
                }
              >
                <div className="time">
                  {dayjs().subtract(1, "day").format("MMM DD YYYY")}
                </div>
                <div className="time-icon">
                  <img src="../images/icon-time.png" alt="" />
                </div>
              </div>
              <div
                className="time-hldr"
                onClick={() =>
                  updateDateOnButtonClick(
                    dayjs(new Date()).format("YYYY-MM-DD")
                  )
                }
              >
                <div className="time">
                  {dayjs(new Date()).format("MMM DD YYYY")}
                </div>
                <div className="time-icon">
                  <img src="../images/icon-time.png" alt="" />
                </div>
              </div>
              <div
                className="time-hldr"
                onClick={() =>
                  updateDateOnButtonClick(
                    dayjs().add(1, "day").format("YYYY-MM-DD")
                  )
                }
              >
                <div className="time">
                  {dayjs().add(1, "day").format("MMM DD YYYY")}
                </div>
                <div className="time-icon">
                  <img src="../images/icon-time.png" alt="" />
                </div>
              </div>
            </div>
            <div className="container">
              <p className="routes-txt">
                You Have <span>{routes?.length} Routes</span> Today
              </p>
              <button className="find-btn" onClick={() => findRoute()}>
                <span>
                  <img src="../images/loupe.png" alt="" />
                </span>
                <div className="txt-hldr pl-3" style={{ color: "white" }}>
                  Find Duty
                </div>
              </button>
            </div>
          </div>

          <div className="container route-info-hdr">
            <span>
              <img src="../images/route.png" alt="" />
            </span>
            <h3>
              <strong>Route Information</strong> List
            </h3>
          </div>

          <div className="container">
            {!loadding ? (
              <DutyListData routes={routes} />
            ) : (
              <center>
                <div className="loader" style={{ marginTop: 10 }}></div>
              </center>
            )}
          </div>
        </div>
      </main>
    </body>
  );
}
