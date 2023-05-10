import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { get, post } from "../helper/apiHelper";
import { validateResponseAdmin } from "../helper/validateResponse";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FilterSelectBox from "./FilterSelectBox";
import AutocompliteInput from "./AutocompliteInput";

const policeStationList = [
  {
    name: "P1",
    id: 1,
  },
  {
    name: "P2",
    id: 2,
  },
];

export default function Filter({ routeId, onClose }) {
  const [users, setUsers] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);

  const [getUserID, setGetUserId] = React.useState(null);

  const [selectedPoliceStation, setSelectedPoliceStation] =
    React.useState(null);
  const [selectedDesignation, setSelectedDesignation] = React.useState(null);

  const fetchUserList = async () => {
    const response = await get("/admin/user?search=&page&limit=1000");
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

  const selectedUser = (data) => {
    console.log("---data", data?.target?.value);
    setGetUserId(data?.target?.value);
  };

  const policeStations = [
    {
      id: 18,
      name: "Arakhakuda Marine Police Station",
    },
    {
      id: 7,
      name: "Astaranga Marine Police Station ",
    },
    {
      id: 1,
      name: "Astaranga Police Station",
    },
    {
      id: 10,
      name: "Balanga Police Station",
    },
  ];

  const selectedPoliceStationCallback = (data) => {
    console.log("---->", data);
    setSelectedPoliceStation(data?.id);
  };

  return (
    <>
      {users ? (
        <>
          <label>Police Station</label>
          <FormControl size="small" fullWidth>
            <AutocompliteInput
              data={policeStations}
              onchangeCallback={selectedPoliceStationCallback}
            />
            {/* <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="policeStation"
              className="form-control icon-input input-eid"
              value={selectedPoliceStation}
              onChange={(e) => setSelectedPoliceStation(e.target.value)}
              onBlur={(e) => setSelectedPoliceStation(e.target.value)}
            >
              {policeStationList &&
                policeStationList?.map((policeStation, index) => (
                  <MenuItem
                    value={policeStation?.id}
                    key={index + policeStation?.id}
                  >
                    {policeStation?.name}
                  </MenuItem>
                ))}
            </Select> */}
          </FormControl>
          <br />
          <br />
          <label>Designation</label>
          <FormControl size="small" fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              style={{ marginLeft: "1.5rem", marginTop: 7 }}
            >
              {window.site_text("pages.register.designation")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="designation"
              size="small"
              className="form-control icon-input input-eid"
              value={selectedDesignation}
              onChange={(e) => setSelectedDesignation(e.target.value)}
              onBlur={(e) => setSelectedDesignation(e.target.value)}
            >
              <MenuItem value={"DSP"}>DSP</MenuItem>
              <MenuItem value={"IIc"}>IIc</MenuItem>
              <MenuItem value={"SI"}>SI</MenuItem>
              <MenuItem value={"ASI"}>ASI</MenuItem>
              <MenuItem value={"Others"}>Others</MenuItem>
            </Select>
          </FormControl>
          <br />
          <br />

          <label>Employee </label>
          {users && (
            <FilterSelectBox data={users} selectedUser={selectedUser} />
          )}

          <br />
          {getUserID && (
            <>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div>
                  <label>Start date</label>
                  <br />
                  <TextField
                    type="date"
                    className="form-control icon-input "
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    size="small"
                    onChange={(e) => setStartDate(e.target.value)}
                    fullWidth
                  />
                </div>
                <br />
                <div>
                  <label>End date</label>
                  <br />
                  <TextField
                    type="date"
                    id="outlined-basic"
                    variant="outlined"
                    style={{ width: "100%" }}
                    size="small"
                    onChange={(e) => setEndDate(e.target.value)}
                    fullWidth
                  />
                </div>
              </div>
              <br />
              <div
                style={{
                  width: "100%",
                }}
              >
                <div>
                  <label>Start time</label>
                  <br />
                  <TextField
                    type="time"
                    variant="outlined"
                    style={{ width: "100%" }}
                    onChange={(e) => setStartTime(e.target.value)}
                    size="small"
                    fullWidth
                  />
                </div>
                <br />
                <div>
                  <label>End time</label>
                  <br />

                  <TextField
                    type="time"
                    variant="outlined"
                    style={{ width: "100%" }}
                    onChange={(e) => setEndTime(e.target.value)}
                    size="small"
                    fullWidth
                  />
                </div>
              </div>
              <br />
              <div style={{ display: "flex" }}>
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="admin-button"
                >
                  Assign User
                </button>

                <button
                  type="button"
                  onClick={() => onClose(false)}
                  className="admin-close-button"
                >
                  Close
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <b>Please wait ...</b>
      )}
    </>
  );
}
