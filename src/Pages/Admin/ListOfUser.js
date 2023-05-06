import * as React from "react";
import swal from "sweetalert";
import { get, put } from "../../helper/apiHelper";
import { validateResponseAdmin } from "../../helper/validateResponse";
import ListOfUserView from "../../View/Admin/ListOfUser";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { debounce } from "lodash";

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function ListOfUser() {
  const [users, setUsers] = React.useState(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchUserList = async (filterText = value, searchText = null) => {
    setUsers(null);
    const response = await get(
      `/admin/user?search=${searchText ? searchText : ""}&page&limit=1000`
    );
    if (validateResponseAdmin(response)) {
      if (filterText === 1) {
        const filterDate = response?.data?.rows?.filter((user) => {
          if (user?.isApproved) {
            return user;
          }
        });
        setUsers(filterDate);
      } else if (filterText === 0) {
        const filterDate = response?.data?.rows?.filter((user) => {
          if (!user?.isApproved) {
            return user;
          }
        });
        setUsers(filterDate);
      } else {
        setUsers(response?.data?.rows);
      }
    }
  };

  const approveUser = async (userId) => {
    const response = await put("/admin/user/approve", { userId });
    if (validateResponseAdmin(response)) {
      swal("Success!", "user approved successfully!", "success").then(
        (value) => {
          fetchUserList();
        }
      );
    }
  };

  const updateUserStatus = async (userId) => {
    const response = await put("/admin/user/toggleUserStatus", { userId });
    if (validateResponseAdmin(response)) {
      console.log(response);
      swal("Success!", "User status successfully changed!", "success").then(
        (value) => {
          fetchUserList();
        }
      );
    }
  };

  React.useEffect(() => {
    fetchUserList(0);
  }, []);

  const search = debounce((searchTerm) => {
    console.log(`Searching for: ${searchTerm}`);
    setValue(2);
    fetchUserList(2, searchTerm);
  }, 600);

  return (
    <>
      <h4 style={{ margin: "1rem", marginBottom: 10 }}>User List</h4>
      <center>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "90%",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search name / Employee ID"
            inputProps={{ "aria-label": "search google maps" }}
            onChange={(e) => search(e.target.value)}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </center>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="Pending"
              {...a11yProps(0)}
              onClick={() => fetchUserList(0)}
            />
            <Tab
              label="Active"
              {...a11yProps(1)}
              onClick={() => fetchUserList(1)}
            />

            <Tab
              label="All"
              {...a11yProps(2)}
              onClick={() => fetchUserList(2)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ListOfUserView
            users={users}
            approveUser={approveUser}
            updateUserStatus={updateUserStatus}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ListOfUserView
            users={users}
            approveUser={approveUser}
            updateUserStatus={updateUserStatus}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ListOfUserView
            users={users}
            approveUser={approveUser}
            updateUserStatus={updateUserStatus}
          />
        </TabPanel>
      </Box>
    </>
  );
}
