import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";

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

const ListOfUserView = ({ users, approveUser }) => {
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
};

export default ListOfUserView;
