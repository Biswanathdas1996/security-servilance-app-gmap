import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { get, post } from "../../helper/apiHelper";
import { validateResponseAdmin } from "../../helper/validateResponse";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import RouteReportAccordian from "../../components/RouteReportAccordian";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

const MyForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [routsData, setRoutsData] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [searchRoutsData, setSearchRoutsData] = React.useState(null);

  const fetchUserList = async () => {
    const response = await get("/admin/user?search=&page&limit=1000");
    if (validateResponseAdmin(response)) {
      setUsers(response?.data?.rows);
    }
  };

  React.useEffect(() => {
    fetchUserList();
  }, []);

  const fetchAllRouts = async () => {
    const response = await get("/admin/route?search=&page&limit");
    if (validateResponseAdmin(response)) {
      setRoutsData(response?.data?.rows);
    }
  };

  React.useEffect(() => {
    fetchAllRouts();
    search();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const search = async () => {
    const response = await get(
      `/admin/route/getRoutesStatus?${
        selectedOption && `routeId=${selectedOption}`
      }&${value?.id && `userId=${value?.id}`}&${
        selectedDate && `date=${selectedDate}`
      }`
    );

    if (validateResponseAdmin(response)) {
      setSearchRoutsData(response?.data);
    }
  };
  const filter = createFilterOptions();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {" "}
        <Card style={{ padding: 20, margin: 20 }}>
          <TextField
            id="select-option"
            select
            label="Select Route"
            value={selectedOption}
            onChange={handleOptionChange}
            variant="outlined"
            style={{ width: "100%" }}
          >
            {routsData?.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          {users && (
            <Autocomplete
              style={{ width: "100%", marginTop: 10 }}
              value={value}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setValue({
                    empID: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
                  setValue({
                    empID: newValue.inputValue,
                  });
                } else {
                  setValue(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                  (option) => inputValue === option.empID
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    inputValue,
                    title: `Add "${inputValue}"`,
                  });
                }

                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={users}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === "string") {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.empID;
              }}
              renderOption={(props, option) => (
                <li {...props}>{option.empID}</li>
              )}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Employee ID"
                  style={{ width: "100%", marginTop: 10 }}
                />
              )}
            />
          )}

          <input
            type="date"
            id="date"
            name="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ padding: 17, width: "100%", marginTop: 10 }}
          />

          <button
            type="button"
            onClick={() => search()}
            className="admin-button"
            style={{ width: "100%", marginTop: 10 }}
          >
            Search{" "}
          </button>
        </Card>
      </Grid>

      <Grid item xs={12} style={{ padding: 20 }}>
        {searchRoutsData &&
          searchRoutsData?.map((data, index) => {
            return (
              <RouteReportAccordian
                data={data?.data}
                index={index}
                routsData={data?.route}
              />
            );
          })}
      </Grid>
    </Grid>
  );
};

export default MyForm;
