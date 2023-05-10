import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import { get, del } from "../../helper/apiHelper";
import { validateResponseAdmin } from "../../helper/validateResponse";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

import jsPDF from "jspdf";
import "jspdf-autotable";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const headers = [
  "Route",
  "User",
  "Start Time",
  "End Time",
  "Visited/Assigned",
  "Percentage",
  "Remark",
];

const CustomizedTables = () => {
  const [loading, setLoadng] = React.useState(false);
  const [reportData, setReportData] = React.useState(null);
  const [tableData, setTableData] = React.useState(null);
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );

  function formatDataForPDF(data) {
    const result = [];

    data.forEach((item) => {
      const row = [
        item.route,
        item.user,
        item.start_timeime || "",
        item.end_time || "",
        item.visited_vs_assigned,
        `${item.percentage}%`,
        "NA",
      ];
      result.push(row);
    });

    return result;
  }

  const exportToPDF = () => {
    const doc = new jsPDF();
    const data = formatDataForPDF(tableData);
    doc.autoTable({
      head: [headers],
      body: data,
    });
    doc.save(`Report-${selectedDate}.pdf`);
  };

  const fetchAllRouts = async () => {
    setLoadng(true);
    const response = await get(
      `/admin/user/getCompletedReport/${selectedDate}`
    );
    if (validateResponseAdmin(response)) {
      setReportData(response?.data);
    }
    setLoadng(false);
  };

  function calculatePercentage(total, currentCount) {
    const value = (currentCount / total) * 100;
    if (value) {
      return parseFloat(value)?.toFixed(2);
    } else {
      return 0;
    }
  }

  React.useEffect(() => {
    fetchAllRouts();
  }, [selectedDate]);

  const totalCalculatuin = (data) => {
    let totalCompletedLocations = 0;
    let totalLocations = 0;
    for (let i = 0; i < data?.length; i++) {
      totalCompletedLocations += data[i].completedLocations || 0;
      totalLocations += data[i].totalLocations || 0;
    }
    return (
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          marginTop: "2rem",
          float: "right",
          padding: "1rem",
          boxShadow:
            "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
      >
        <ListItem
          key={1}
          disableGutters
          secondaryAction={
            <IconButton
              aria-label="comment"
              style={{ fontSize: 15, color: "#ad0004" }}
            >
              {totalCompletedLocations}
            </IconButton>
          }
        >
          <ListItemText primary={`Total completed locations`} />
        </ListItem>
        <ListItem
          key={1}
          disableGutters
          secondaryAction={
            <IconButton
              aria-label="comment"
              style={{ fontSize: 15, color: "#ad0004" }}
            >
              {totalLocations}
            </IconButton>
          }
        >
          <ListItemText primary={`Total  locations`} />
        </ListItem>
        <ListItem
          key={1}
          disableGutters
          secondaryAction={
            <IconButton
              aria-label="comment"
              style={{ fontSize: 15, color: "#ad0004" }}
            >
              {calculatePercentage(totalLocations, totalCompletedLocations)}%
            </IconButton>
          }
        >
          <ListItemText primary={`Progress`} />
        </ListItem>
      </List>
    );
  };

  React.useEffect(() => {
    const tableData = reportData?.map((val) => {
      return {
        route: val?.route?.name,
        user: val.user?.name,
        start_timeime:
          val?.startTime &&
          dayjs(new Date(val?.startTime * 1000)).format("YYYY-MM-DD hh:mm A"),
        end_time:
          val?.endTime &&
          dayjs(new Date(val?.endTime * 1000)).format("YYYY-MM-DD hh:mm A"),
        visited_vs_assigned: `${val?.completedLocations}/${val?.totalLocations}`,
        percentage: calculatePercentage(
          val?.totalLocations,
          val?.completedLocations
        ),
        remarks: val?.remarks,
      };
    });
    setTableData(tableData);
  }, [reportData]);

  console.log("tableData", tableData);
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        style={{ marginTop: "2rem" }}
        noValidate
        autoComplete="off"
      >
        {/* <CSVLink
          data={tableData}
          headers={headers}
          style={{ float: "right", width: "auto" }}
        >
          <Button
            variant="outlined"
            style={{ padding: 17 }}
            endIcon={<InsertDriveFileIcon />}
          >
            {" "}
            Export to CSV
          </Button>
        </CSVLink> */}
        <div style={{ display: "flex", width: "100%" }}>
          <Button
            variant="outlined"
            style={{ padding: 17, float: "right" }}
            endIcon={<PictureAsPdfIcon />}
            onClick={exportToPDF}
          >
            {" "}
            Export to PDF
          </Button>

          <TextField
            id="outlined-basic"
            variant="outlined"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ float: "right", width: "53%" }}
          />
        </div>
      </Box>
      <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
        {reportData && totalCalculatuin(reportData)}
      </TableContainer>
      <br />

      <TableContainer component={Paper}>
        {loading ? (
          <center>
            <div className="loader" style={{ margin: "2rem" }}></div>
          </center>
        ) : (
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Route</StyledTableCell>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell align="right">Start Time</StyledTableCell>
                <StyledTableCell align="right">End Time</StyledTableCell>
                <StyledTableCell align="center">
                  Location Status (Visited/ Assigned )
                </StyledTableCell>
                <StyledTableCell align="right">Percentage</StyledTableCell>

                <StyledTableCell align="right">Remarks</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData?.map((row, index) => (
                <StyledTableRow key={row.user?.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.route}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.user}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.start_timeime}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.end_time}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row?.visited_vs_assigned}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row?.percentage}%
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {row?.remarks}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {tableData?.length === 0 && (
          <center style={{ padding: "2rem" }}>No data found</center>
        )}
      </TableContainer>
    </div>
  );
};

export default CustomizedTables;
