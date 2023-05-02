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
import "../css/style.css";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import DutyListData from "../components/DutyListData";
import DatePicker from "../components/DatePicker";
import img_profile from "../images/img_profile.jpg";
import icon_more from "../images/icon_more.svg";

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
  const [date, setDate] = React.useState(dayjs(new Date()));

  React.useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    const response = await post("/user/getRoutes", {
      date: date,
    });
    if (validateResponseUser(response)) {
      setRoutes(response?.data);
    }
  };

  const checkIfFutureDate = (date) => {
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

  const updateDateOnButtonClick = (date) => {
    setDate(date);
  };

  return (
    <body className="d-flex flex-column h-100">
      <div className="bg-purple"></div>
      <main className="flex-shrink-0 main-foot-adjust  pt-2">
        <div className="container">
          <div
            style={{
              padding: "1rem 6px 0px",
              margin: 0,
            }}
          >
            <div className="row profile-dtl">
              <div className="col-2">
                <div className="img-hldr">
                  <img src={img_profile} alt="" />
                </div>
              </div>
              <div className="col-8">
                <div className="desc-hldr" style={{ color: "black" }}>
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
              <center>
                <DatePicker defaultValue={date} getDate={setDate} />
                <div className="d-flex justify-right mb-1 mt-3">
                  <Button
                    size="small"
                    variant="outlined"
                    color="warning"
                    style={{ marginRight: 5, fontSize: 10 }}
                    onClick={() =>
                      updateDateOnButtonClick(dayjs().subtract(1, "day"))
                    }
                  >
                    Yesterday
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="warning"
                    style={{ marginRight: 5, fontSize: 10 }}
                    onClick={() => updateDateOnButtonClick(dayjs(new Date()))}
                  >
                    Today
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="warning"
                    style={{ fontSize: 10 }}
                    onClick={() =>
                      updateDateOnButtonClick(dayjs().add(1, "day"))
                    }
                  >
                    Tommrrow
                  </Button>
                </div>
                <Button
                  variant="contained"
                  style={{
                    background: "#fe8027",
                    padding: "10px 20px",
                    borderRadius: 12,
                    marginTop: "1rem",
                    height: 48,
                    width: "100%",
                    fontSize: "1.125rem",
                  }}
                  startIcon={<SearchIcon />}
                >
                  Find Duty
                </Button>
              </center>
            </div>
          </div>
          <div className="d-flex justify-content-between mb-1 mt-1">
            <div>
              <strong>
                {" "}
                {window.site_text("pages.home.todats_route_text")}
              </strong>
            </div>
          </div>

          <DutyListData routes={routes} />
        </div>
      </main>
    </body>
  );
}
