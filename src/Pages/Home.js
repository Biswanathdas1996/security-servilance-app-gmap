import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import MapIcon from "../assets/235861.png";
import { get } from "../helper/apiHelper";

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
    if (response) {
      setRoutes(response?.data);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Assigned Routes</h2>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {routes &&
          routes?.map((route, index) => {
            return (
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
            );
          })}
      </List>
    </>
  );
}
