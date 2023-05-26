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
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import swal from "sweetalert";
import jsPDF from "jspdf";
import "jspdf-autotable";

let isDeleteAllow = false;
const user = localStorage.getItem("x-user-data");
if (user) {
  const userData = JSON.parse(user);
  const array = ["8001691299", "9700328328"];
  if (array.includes(userData?.contactNumber)) {
    isDeleteAllow = true;
  }
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#AD0004",
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
  "Progress",
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
        item.completeComment,
      ];
      result.push(row);
    });

    return result;
  }

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);

    const data = formatDataForPDF(tableData);
    const user = localStorage.getItem("x-user-data");
    if (user) {
      const userData = JSON.parse(user);
      // Add text at the top of the page
      const text = `Duty report for ${dayjs(new Date(selectedDate)).format(
        "DD-MMM-YYYY"
      )} generated by ${userData?.name} on ${dayjs(new Date()).format(
        "DD-MM-YYYY hh:mm A"
      )}`;
      const textX = doc.internal.pageSize.getWidth() / 2;
      const textY = 10;
      doc.text(textX, textY, text, { align: "center" });

      // doc.text(
      //   `Report generated by ${userData?.name} on ${dayjs(new Date()).format(
      //     "DD-MM-YYYY hh:mm A"
      //   )}`,
      //   20,
      //   doc.autoTableEndPosY() + 100
      // );

      doc.autoTable({
        startY: textY + 10,
        head: [headers],
        body: data,
      });
      doc.setFillColor("#AD0004");
      doc.save(`Report-${selectedDate}.pdf`);
    }
  };

  const fetchAllRouts = async (date = selectedDate) => {
    setLoadng(true);
    const response = await get(`/admin/user/getAllReport/${date}`);
    // const response = await get(`/admin/user/getAllReport`);
    console.log("---response-->", response);
    if (validateResponseAdmin(response)) {
      setReportData(response?.data);
    }
    setLoadng(false);
  };

  function calculatePercentage(total, currentCount) {
    const value = (currentCount / total) * 100;
    if (value) {
      return parseFloat(value)?.toFixed(0);
    } else {
      return 0;
    }
  }

  const deleteREportDtata = (refId) => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        console.log("refId================>", refId);
        const response = await del(`/admin/route/deleteDuty/${refId}`);
        if (validateResponseAdmin(response)) {
          fetchAllRouts();
        }
      }
    });
  };

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
      <div className="container">
        <div className="list-hldr report-hldr">
          <div className="img-hldr">
            <img src="../images/country-icon.png" alt="" />
          </div>
          <div className="desc-hldr">
            <p>
              <strong>Visited / Assigned</strong>
            </p>
          </div>
          <div className="lst-btn-hldr">
            <div className="brown">
              {" "}
              {totalCompletedLocations}/{totalLocations}
            </div>
          </div>
        </div>

        {/* <div className="list-hldr report-hldr active">
          <div className="img-hldr">
            <img src="../images/location-icon.png" alt="" />
          </div>
          <div className="desc-hldr">
            <p>
              <strong>Total Location</strong>
            </p>
          </div>
          <div className="lst-btn-hldr">
            <div className="brown"> {totalLocations}</div>
          </div>
        </div> */}

        <div className="list-hldr report-hldr">
          <div className="img-hldr">
            <img src="../images/country-icon.png" alt="" />
          </div>
          <div className="desc-hldr">
            <p>
              <strong>Progress</strong>
            </p>
          </div>
          <div className="lst-btn-hldr">
            <div className="green">
              {" "}
              {calculatePercentage(totalLocations, totalCompletedLocations)}%
            </div>
          </div>
        </div>
      </div>
    );
  };

  const updateDateOnButtonClick = (date) => {
    setSelectedDate(date);
    fetchAllRouts(date);
  };

  React.useEffect(() => {
    const tableData = reportData?.map((val) => {
      return {
        route: val?.route?.name,
        user: val.user?.name,
        start_timeime:
          val?.startTime &&
          dayjs(new Date(val?.startTime * 1000)).format("DD-MM-YYYY hh:mm A"),
        end_time:
          val?.endTime &&
          dayjs(new Date(val?.endTime * 1000)).format("DD-MM-YYYY hh:mm A"),
        visited_vs_assigned: `${val?.completedLocations}/${val?.totalLocations}`,
        percentage: calculatePercentage(
          val?.totalLocations,
          val?.completedLocations
        ),
        completeComment: val?.completeComment,
        refId: val?.refId,
      };
    });
    setTableData(tableData);
  }, [reportData]);

  console.log("tableData", tableData);
  return (
    <div>
      {loading ? (
        <center>
          <div className="loader" style={{ margin: "2rem" }}></div>
        </center>
      ) : (
        <>
          {" "}
          <div className="container find-duty-hldr mb-4">
            <div className="datepicker">
              <div className="mb-3 mt-3">
                <TextField
                  id="outlined-basic"
                  className="form-control"
                  variant="outlined"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="time-picker-hldr">
              <div
                className="time-hldr"
                onClick={() =>
                  updateDateOnButtonClick(
                    dayjs().subtract(2, "day").format("YYYY-MM-DD")
                  )
                }
              >
                <div className="time">
                  {dayjs().subtract(2, "day").format("MMM DD YYYY")}
                </div>
                <div className="time-icon">
                  <img src="../images/icon-time.png" alt="" />
                </div>
              </div>
              <div
                className="time-hldr"
                onClick={() =>
                  updateDateOnButtonClick(
                    dayjs().subtract(1, "day").format("YYYY-MM-DD")
                  )
                }
              >
                <div className="time">
                  {dayjs().subtract(1, "day").format("MMM DD YYYY")}
                </div>
                <div className="time-icon">
                  <img src="../images/icon-time.png" alt="" />
                </div>
              </div>
              <div
                className="time-hldr"
                onClick={() =>
                  updateDateOnButtonClick(
                    dayjs(new Date()).format("YYYY-MM-DD")
                  )
                }
              >
                <div className="time">
                  {dayjs(new Date()).format("MMM DD YYYY")}
                </div>
                <div className="time-icon">
                  <img src="../images/icon-time.png" alt="" />
                </div>
              </div>
            </div>
            <div className="container">
              <button className="find-btn" onClick={exportToPDF}>
                <span>
                  <img src="../images/shield-download.png" alt="" />
                </span>
                <div className="txt-hldr pl-3" style={{ color: "white" }}>
                  Export PDF
                </div>
              </button>
            </div>
          </div>
          {reportData && totalCalculatuin(reportData)}
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead style={{ borderRadius: "50px" }}>
                <TableRow style={{ borderRadius: "50px" }}>
                  <StyledTableCell>Route</StyledTableCell>
                  <StyledTableCell>User</StyledTableCell>
                  <StyledTableCell align="right">Start </StyledTableCell>
                  <StyledTableCell align="right">End </StyledTableCell>
                  <StyledTableCell align="center">
                    Visited/ Assigned
                  </StyledTableCell>
                  <StyledTableCell align="right">Progress</StyledTableCell>
                  <StyledTableCell align="right">Remarks</StyledTableCell>
                  {isDeleteAllow && (
                    <StyledTableCell align="right">Action</StyledTableCell>
                  )}
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
                      {row?.completeComment}
                    </StyledTableCell>
                    {isDeleteAllow && (
                      <StyledTableCell align="center">
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteREportDtata(row?.refId)}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {tableData?.length === 0 && (
        <center style={{ padding: "2rem" }}>No data found</center>
      )}

      <br />
      <br />
      <br />
    </div>
  );
};

export default CustomizedTables;
