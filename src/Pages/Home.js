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

const timeStampToTime = (timestamp) => {
  const date = new Date(timestamp * 1000); // convert seconds to milliseconds
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // months are zero-indexed, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
    <>
      <h2
        style={{
          marginLeft: 15,
          marginBottom: 0,
          color: "#636262",
          textAlign: "center",
        }}
      >
        Today's Duty
      </h2>
      <h3 style={{ marginLeft: 15, marginBottom: 0, color: "#d85604" }}>
        Routes
      </h3>
      <small style={{ marginLeft: 16, color: "grey" }}>
        View all Upcomming routs
      </small>
      <center>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {routes &&
            routes?.map((route, index) => {
              return (
                <Card style={{ marginTop: 15 }}>
                  <ListItem
                    onClick={() =>
                      (window.location.href = `#/map/${route?.route?.id}`)
                    }
                  >
                    <ListItemAvatar>
                      <img src={MapIcon} alt="map" height="50px" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={route?.route?.name}
                      secondary={`Start time: ${timeStampToTime(
                        Number(route?.startTime)
                      )}`}
                    />
                  </ListItem>
                </Card>
              );
            })}
        </List>
      </center>
      {/* <h3 style={{ marginLeft: 15, marginBottom: 0, color: "#d85604" }}>
        Previous Routes
      </h3>
      <small style={{ marginLeft: 16, color: "grey" }}>
        View all Previous routs
      </small>
      <center>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {getAllPrevRoutes &&
            getAllPrevRoutes?.map((route, index) => {
              return (
                <Card style={{ marginTop: 15 }}>
                  <ListItem
                    onClick={() =>
                      (window.location.href = `#/map/${route?.route?.id}`)
                    }
                  >
                    <ListItemAvatar>
                      <img src={MapIcon} alt="map" height="50px" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={route?.route?.name}
                      secondary={`Start time: ${timeStampToTime(
                        Number(route?.startTime)
                      )}`}
                    />
                  </ListItem>
                </Card>
              );
            })}
        </List>
      </center> */}
    </>
  );
}
