import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { get, post } from "../helper/apiHelper";
import { validateResponseAdmin } from "../helper/validateResponse";

export default function Filter({ routeId }) {
  const [users, setUsers] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);

  const fetchUserList = async () => {
    const response = await get("/admin/user?search=&page&limit");
    if (validateResponseAdmin(response)) {
      setUsers(response?.data?.rows);
    }
  };

  React.useEffect(() => {
    fetchUserList();
  }, []);

  const handleSubmit = async () => {
    const data = {
      userId: value?.id,
      routeId: routeId,
      startDate: startDate,
      startTime: startTime,
      endDate: endDate,
      endTime: endTime,
    };
    const response = await post(`/admin/user/assignRoute`, data);
    if (validateResponseAdmin(response)) {
      window.location.reload();
    }
  };

  const filter = createFilterOptions();

  return (
    <>
      <label>Employee ID</label>
      {users && (
        <Autocomplete
          style={{ width: "auto" }}
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
          renderOption={(props, option) => <li {...props}>{option.empID}</li>}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Employee ID" />
          )}
        />
      )}
      <label>Start date</label>
      <br />
      <TextField
        type="date"
        id="outlined-basic"
        variant="outlined"
        style={{ width: "100%" }}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <br />
      <label>End date</label>
      <br />
      <TextField
        type="date"
        id="outlined-basic"
        variant="outlined"
        style={{ width: "100%" }}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <br />
      <label>Start time</label>
      <br />
      <TextField
        type="time"
        variant="outlined"
        style={{ width: "100%" }}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <br />
      <label>End time</label>
      <br />
      <TextField
        type="time"
        variant="outlined"
        style={{ width: "100%" }}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <br />
      <Button
        variant="contained"
        style={{ margin: 10 }}
        className="rufous-button"
        onClick={() => handleSubmit()}
      >
        Assign
      </Button>
    </>
  );
}
