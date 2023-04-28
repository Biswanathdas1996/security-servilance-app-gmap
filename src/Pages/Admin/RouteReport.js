import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { get } from "../../helper/apiHelper";
import { validateResponseAdmin } from "../../helper/validateResponse";

const options = [
  {
    value: "option1",
    label: "Option 1",
  },
  {
    value: "option2",
    label: "Option 2",
  },
  {
    value: "option3",
    label: "Option 3",
  },
];

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  console.log("--routsData-->", routsData);

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
              <TextField
                id="select-option"
                type="date"
                onChange={handleDateChange}
                variant="outlined"
                style={{ width: 300 }}
              />
            </form>
          </Item>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Box>
  );
};

export default MyForm;
