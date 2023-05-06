import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import MapIcon from "@mui/icons-material/Map";
import LogoutIcon from "@mui/icons-material/Logout";

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
      <div className="row profile-dtl">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="desc-hldr">
            <h2>
              <strong style={{ color: "black" }}>Admin Portal</strong>
            </h2>
            <p style={{ color: "black" }}>Superintendent of police</p>
          </div>
        </div>
        <div className="col-2"></div>
      </div>

      <List style={{ marginTop: "2rem" }}>
        <ListItem
          key={1}
          onClick={() => (window.location.href = "#/users")}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={`Users`} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          key={2}
          onClick={() => (window.location.href = "#/list-of_routs")}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary={`Routes`} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={2}
          onClick={() => (window.location.href = "#/route-report")}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={`Reports`} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          key={1}
          onClick={() => {
            localStorage.clear();
            window.location.replace("#/admin/login");
          }}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
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
          <MenuIcon
            onClick={toggleDrawer(anchor, true)}
            style={{
              fontSize: "2rem",
              marginTop: "1.5rem",
              float: "right",
              color: "white",
            }}
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
