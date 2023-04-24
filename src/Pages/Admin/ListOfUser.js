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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new user
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Enter name"
                variant="outlined"
                styel={{ width: "100%" }}
              />
              <Button
                variant="contained"
                styel={{ margin: 10 }}
                className="rufous-button"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>

      <TableContainer>
        <center>
          <Card>
            <Table
              sx={{ maxWidth: 700, margin: 3 }}
              aria-label="customized table"
            >
              <TableHead>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  styel={{ margin: 10 }}
                  className="tawny-button"
                >
                  Add New User
                </Button>
                <br />
                <br />
                <TableRow>
                  <StyledTableCell>Rout Name</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    User 1
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    Gread 1
                  </StyledTableCell>

                  <StyledTableCell align="right" component="th" scope="row">
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        href={`/#/user/1`}
                        style={{ float: "right" }}
                        className="yellow-button"
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
                      <Button variant="contained" color="warning">
                        Approve
                      </Button>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    User 2
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    Gread 2
                  </StyledTableCell>

                  <StyledTableCell align="right" component="th" scope="row">
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        href={`/#/user/1`}
                        style={{ float: "right" }}
                        className="yellow-button"
                      >
                        Assign Routs
                      </Button>

                      <Button variant="contained" disabled>
                        Edit
                      </Button>
                      <Button variant="contained" className="rufous-button">
                        Delete
                      </Button>
                    </Stack>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </Card>
        </center>
      </TableContainer>
    </>
  );
}
