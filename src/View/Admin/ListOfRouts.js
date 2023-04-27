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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import AssignUserToRouts from "../../components/AssignUserToRouts";
import AddNewRoutes from "../../components/AddNewRoutes";
import { get } from "../../helper/apiHelper";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
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

const ListOfRoutsView = ({
  open,
  handleClose,
  openUserModal,
  setOpenUserModal,
  selectedRouteForAssign,
  handleOpen,
  routsData,
  assignUser,
}) => {
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddNewRoutes />
        </Modal>
        <Modal
          open={openUserModal}
          onClose={() => setOpenUserModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Assign user to routs
            </Typography>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <AssignUserToRouts routeId={selectedRouteForAssign} />
            </Box>
          </Box>
        </Modal>
      </div>

      <TableContainer>
        <center>
          <Card>
            <Table
              sx={{ maxWidth: 900, margin: 3 }}
              aria-label="customized table"
            >
              <TableHead>
                <Button
                  variant="contained"
                  onClick={handleOpen}
                  styel={{ margin: 10 }}
                  className="tawny-button"
                >
                  Add Routs
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
                {routsData?.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row.assign ? (
                        <b>User Assigned</b>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            color="warning"
                            onClick={() => assignUser(row?.id)}
                            className="black-button"
                          >
                            Assign user
                          </Button>
                        </>
                      )}
                    </StyledTableCell>

                    <StyledTableCell align="right" component="th" scope="row">
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          href={`/#/add-routs/${row.id}`}
                          style={{ float: "right" }}
                          className="yellow-button"
                        >
                          Add Circle
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
                ))}
              </TableBody>
            </Table>
          </Card>
        </center>
      </TableContainer>
    </>
  );
};

export default ListOfRoutsView;
