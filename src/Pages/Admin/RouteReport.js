import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { get, post } from "../../helper/apiHelper";
import { validateResponseAdmin } from "../../helper/validateResponse";
import Button from "@mui/material/Button";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import RouteReportAccordian from "../../components/RouteReportAccordian";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: 20,
}));

const MyForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [routsData, setRoutsData] = React.useState(null);

  const [searchRoutsData, setSearchRoutsData] = React.useState(null);

  const fetchAllRouts = async () => {
    const response = await get("/admin/route?search=&page&limit");
    if (validateResponseAdmin(response)) {
      setRoutsData(response?.data?.rows);
    }
  };

  React.useEffect(() => {
    fetchAllRouts();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const search = async () => {
    const response = await post("/admin/route/getRouteStatusByDate", {
      routeId: selectedOption,
      date: selectedDate,
    });

    if (validateResponseAdmin(response)) {
      setSearchRoutsData(response?.data);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Item>
            {" "}
            <form noValidate>
              <TextField
                id="select-option"
                select
                label="Select Option"
                value={selectedOption}
                onChange={handleOptionChange}
                variant="outlined"
                style={{ width: 300 }}
              >
                {routsData?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <input
                type="date"
                id="date"
                name="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ padding: 17 }}
              />

              <Button
                onClick={() => search()}
                variant="contained"
                style={{ marginLeft: 10 }}
              >
                Search{" "}
              </Button>
            </form>
          </Item>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          {searchRoutsData && <h3>Users</h3>}
          {searchRoutsData &&
            searchRoutsData?.users?.map((data, index) => {
              return (
                <RouteReportAccordian
                  data={data}
                  index={index}
                  routsData={searchRoutsData?.route}
                />
              );
            })}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  );
};

export default MyForm;
