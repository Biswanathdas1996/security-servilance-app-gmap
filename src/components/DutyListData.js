import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import MapIcon from "@mui/icons-material/Map";
import Button from "@mui/material/Button";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function FolderList({ routes }) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 400,
        bgcolor: "background.paper",
        padding: 0,
      }}
    >
      {routes ? (
        routes?.map((route, index) => {
          return (
            <>
              <ListItem
                onClick={() =>
                  (window.location.href = `#/map/${route?.route?.id}`)
                }
                key={`cers-${index}`}
                style={{ padding: 0 }}
              >
                <ListItemAvatar>
                  <Avatar style={{ background: "#fd8027" }}>
                    <MapIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={route?.route?.name}
                  secondary={dayjs(new Date(route?.startTime * 1000)).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                />
                <Button
                  size="medium"
                  variant="outlined"
                  color="warning"
                  style={{ marginRight: 5, fontSize: 10 }}
                >
                  {/* View */}
                  <KeyboardArrowRightIcon />
                </Button>
              </ListItem>
            </>
          );
        })
      ) : (
        <center>
          <div className="loader"></div>
        </center>
      )}
    </List>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ routes }) {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", padding: 0 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", padding: 0 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ padding: 0 }}
        >
          <Tab label="Completed" {...a11yProps(0)} />
          <Tab label="Pending" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Complited
      </TabPanel>
      <TabPanel value={value} index={1} style={{ padding: 0 }}>
        <FolderList routes={routes} />
      </TabPanel>
    </Box>
  );
}
