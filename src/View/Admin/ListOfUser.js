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
import DeleteIcon from "@mui/icons-material/Delete";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

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

const ListOfUserView = ({ users, approveUser, updateUserStatus }) => {
  return (
    <>
      {users ? (
        <Card>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {users?.map((user, index) => (
              <ListItem alignItems="flex-start">
                <img
                  alt="Remy Sharp"
                  src={user?.profileImage}
                  style={{ width: 80, height: 80, margin: 15 }}
                />

                <ListItemText
                  primary={user?.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {user?.designation}
                      </Typography>
                      {`- ${user?.empID}`}
                      <p>
                        Created At: <b>{user?.createdAt}</b>
                      </p>
                      <StyledTableCell align="right" component="th" scope="row">
                        <Stack direction="row" spacing={1}>
                          <button
                            type="button"
                            onClick={() => updateUserStatus(user?.id)}
                            className="admin-button"
                          >
                            {user?.status ? "Deactive" : "Activate"}
                          </button>

                          {!user?.isApproved && (
                            <button
                              type="button"
                              onClick={() => approveUser(user?.id)}
                              className="admin-green-button"
                            >
                              Approve
                            </button>
                          )}
                        </Stack>
                      </StyledTableCell>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </List>
          {users?.length === 0 && (
            <b style={{ margin: "2rem", textAlign: "center" }}>No user found</b>
          )}
          {/* <TableContainer>
            <center>
              <Table sx={{ margin: 0 }} aria-label="customized table">
                <TableHead>
                  <br />
                  <br />
                  <TableRow>
                    <StyledTableCell> Name</StyledTableCell>
                    <StyledTableCell> Image</StyledTableCell>
                    <StyledTableCell align="left">ID No</StyledTableCell>
                    <StyledTableCell align="left">Created On</StyledTableCell>
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
                        <img
                          src={user?.profileImage}
                          alt=""
                          height={50}
                          width={50}
                        />
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {user?.empID}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {user?.createdAt}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
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

export default ListOfUserView;
