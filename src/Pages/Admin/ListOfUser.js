import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import swal from "sweetalert";
import { get, post, put, del } from "../../helper/apiHelper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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

export default function CustomizedTables() {
  const [users, setUsers] = React.useState(null);

  const fetchUserList = async () => {
    const response = await get("/admin/user?search=&page&limit");
    if (response?.data?.rows) {
      setUsers(response?.data?.rows);
    }
  };

  const approveUser = async (userId) => {
    const response = await put("/admin/user/approve", { userId });
    if (response?.success) {
      swal("Success!", "user approved successfully!", "success").then(
        (value) => {
          fetchUserList();
        }
      );
    }
  };

  React.useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <>
      <TableContainer>
        <center>
          <Card>
            <Table
              sx={{ maxWidth: 900, margin: 3 }}
              aria-label="customized table"
            >
              <TableHead>
                <br />
                <br />
                <TableRow>
                  <StyledTableCell> Name</StyledTableCell>
                  <StyledTableCell align="left">ID No</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user, index) => (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {user?.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {user?.empID}
                    </StyledTableCell>

                    <StyledTableCell align="right" component="th" scope="row">
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          href={`/#/user/1`}
                          style={{ float: "right" }}
                          // className="yellow-button"
                          disabled={!user?.isApproved}
                        >
                          Assign Routs
                        </Button>

                        <Button variant="contained" disabled>
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          className="rufous-button"
                        >
                          Delete
                        </Button>
                        {!user?.isApproved && (
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => approveUser(user?.id)}
                          >
                            Approve
                          </Button>
                        )}
                      </Stack>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </center>
      </TableContainer>
    </>
  );
}
