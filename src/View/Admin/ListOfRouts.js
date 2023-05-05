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
import DeleteIcon from "@mui/icons-material/Delete";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SignpostIcon from "@mui/icons-material/Signpost";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
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
  deleteRoute,
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
              Assign user to routes
            </Typography>
            <br />
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
      {routsData ? (
        <Card style={{ margin: "10px" }}>
          <div
            style={{
              margin: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h4>Route List</h4>
            <button
              type="button"
              onClick={handleOpen}
              className="admin-green-button"
              style={{ margin: 0 }}
            >
              <SignpostIcon /> Add New Routs
            </button>
          </div>

          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {routsData?.map((row) => (
              <ListItem
                key={row?.name + row?.id}
                disableGutters
                secondaryAction={
                  <IconButton aria-label="comment">
                    <PersonAddAlt1Icon
                      onClick={() => assignUser(row?.id)}
                      style={{ fontSize: 30, marginRight: 10 }}
                    />
                    <a href={`/#/add-routs/${row?.id}`}>
                      <AddLocationAltIcon
                        style={{ fontSize: 30, marginRight: 10 }}
                      />
                    </a>
                    <DeleteIcon
                      onClick={() => deleteRoute(row?.id)}
                      style={{ fontSize: 30, color: "#ad0004" }}
                    />
                  </IconButton>
                }
                style={{ padding: 12 }}
              >
                <ListItemText
                  primary={row?.name}
                  secondary={`Created At: ${dayjs(
                    new Date(row?.createdAt)
                  ).format("YYYY-MM-DD")}`}
                />
              </ListItem>
            ))}
          </List>

          {/* <TableContainer>
            <center>
              <Card>
                <Table sx={{ margin: 0 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Rout Name</StyledTableCell>
                      <StyledTableCell align="left">Created at</StyledTableCell>
                      <StyledTableCell align="left">Add</StyledTableCell>
                      <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {routsData?.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row?.name}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row?.createdAt}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {row?.assign ? (
                            <b>User Assigned</b>
                          ) : (
                            <>
                              <Button
                                variant="contained"
                                color="warning"
                                onClick={() => assignUser(row?.id)}
                                className="black-button"
                                startIcon={<PersonAddAlt1Icon />}
                              >
                                Assign user
                              </Button>
                            </>
                          )}
                        </StyledTableCell>

                        <StyledTableCell
                          align="right"
                          component="th"
                          scope="row"
                        >
                          <Stack direction="row" spacing={1}>
                            <Button
                              variant="contained"
                              href={`/#/add-routs/${row?.id}`}
                              style={{ float: "right" }}
                              className="yellow-button"
                              startIcon={<AddLocationAltIcon />}
                            >
                              Add Circle
                            </Button>

                            <Button
                              variant="contained"
                              className="rufous-button"
                              onClick={() => deleteRoute(row?.id)}
                              startIcon={<DeleteIcon />}
                            >
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
          </TableContainer> */}
        </Card>
      ) : (
        <center>
          <div className="loader" style={{ margin: "5rem" }}></div>
        </center>
      )}
    </>
  );
};

export default ListOfRoutsView;
