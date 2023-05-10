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
  width: "90%",
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
          <AddNewRoutes onClose={handleClose} />
        </Modal>
        <Modal
          open={openUserModal}
          onClose={() => setOpenUserModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ padding: 25 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Assign user to routes
            </Typography>

            <br />

            <AssignUserToRouts
              routeId={selectedRouteForAssign}
              onClose={setOpenUserModal}
            />
          </Box>
        </Modal>
      </div>

      <div
        class="container p-4 mb-4"
        style={{
          background: "white",
          borderRadius: 16,
          boxShadow: "-1px 2px 7px rgba(46, 49, 118, 0.1)",
        }}
      >
        {/* <div class="datepicker">
          <div class="mb-3 mt-2">
            <input
              type="text"
              class="form-control"
              id="search"
              placeholder="Search name / Employee ID"
              name=""
              onChange={(e) => search(e.target.value)}
            />
          </div>
        </div> */}

        <button class="find-btn search-btn" onClick={handleOpen}>
          <div class="txt-hldr pl-3">Add new route</div>
          <span>+</span>
        </button>
      </div>

      {routsData ? (
        <div class="container">
          {routsData?.map((row) => (
            <div
              class="list-hldr n-route mt-3"
              style={{ justifyContent: "space-between" }}
            >
              <div class="desc-hldr">
                <div>
                  <div class="img-hldr">
                    <img src="../images/placeholder.png" alt="" />
                  </div>
                  <div class="text-hldr">
                    <p>
                      <strong style={{ color: "#ad0004" }}>Route name</strong>
                    </p>
                    <p>{row?.name}</p>
                  </div>
                </div>

                <div>
                  <div class="img-hldr">
                    <img src="../images/icon-bookmark-circled.svg" alt="" />
                  </div>
                  <div class="text-hldr">
                    <p>
                      <strong style={{ color: "#ad0004" }}>Created On</strong>
                    </p>
                    <p>
                      {`${dayjs(new Date(row?.createdAt)).format(
                        "YYYY-MM-DD"
                      )}`}
                    </p>
                  </div>
                </div>
              </div>
              <div class="lst-btn-hldr">
                <button>
                  <img
                    src="../images/icon-trash.png"
                    alt=""
                    onClick={() => deleteRoute(row?.id)}
                  />
                </button>
                <a href={`/#/admin/add-routs/${row?.id}`}>
                  <button>
                    <img src="../images/icon-add.png" alt="" />
                  </button>
                </a>
                <button>
                  <img
                    src="../images/icon-add-user.png"
                    alt=""
                    onClick={() => assignUser(row?.id)}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <center>
          <div className="loader" style={{ margin: "5rem" }}></div>
        </center>
      )}
    </>
  );
};

export default ListOfRoutsView;
