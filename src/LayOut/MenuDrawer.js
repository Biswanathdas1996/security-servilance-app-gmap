import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import PeopleIcon from "@mui/icons-material/People";
import MapIcon from "@mui/icons-material/Map";
import LogoutIcon from "@mui/icons-material/Logout";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

      <List style={{ marginTop: "2rem" }}>
        <ListItem
          key={`users_1`}
          onClick={() => (window.location.href = "#/admin/users")}
          style={{ color: "#ad0004" }}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon style={{ color: "#ad0004" }} />
            </ListItemIcon>
            <ListItemText primary={`Users`} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          key={`routes_2`}
          onClick={() => (window.location.href = "#/admin/list-of_routs")}
          style={{ color: "#ad0004" }}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <MapIcon style={{ color: "#ad0004" }} />
            </ListItemIcon>
            <ListItemText primary={`Routes`} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={`pdfReport_3`}
          style={{ color: "#ad0004" }}
          onClick={() => (window.location.href = "#/admin/status-reports")}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon style={{ color: "#ad0004" }} />
            </ListItemIcon>
            <ListItemText primary={`PDF Report`} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={`onlineReport_4`}
          style={{ color: "#ad0004" }}
          onClick={() => (window.location.href = "#/admin/route-report")}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <FormatListBulletedIcon style={{ color: "#ad0004" }} />
            </ListItemIcon>
            <ListItemText primary={`Online Report`} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          key={`logout_5`}
          onClick={() => {
            localStorage.clear();
            window.location.replace("#/");
          }}
          style={{ color: "#ad0004" }}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon style={{ color: "#ad0004" }} />
            </ListItemIcon>
            <ListItemText primary={`Log out`} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <MenuIcon
            onClick={toggleDrawer(anchor, true)}
            style={{
              fontSize: "2rem",
              marginTop: "1.5rem",
              float: "right",
              color: "white",
            }}
          /> */}
          <img
            src="../images/icon_more.svg"
            alt="More"
            onClick={toggleDrawer(anchor, true)}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
