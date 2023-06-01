import * as React from "react";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AssignUserToRouts from "../../components/AssignUserToRouts";
import AddNewRoutes from "../../components/AddNewRoutes";
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
          <Box><AddNewRoutes onClose={handleClose} /></Box>
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
        className="container p-4 mb-4"
        style={{
          background: "white",
          borderRadius: 16,
          boxShadow: "-1px 2px 7px rgba(46, 49, 118, 0.1)",
        }}
      >

        <button className="find-btn" onClick={handleOpen}>
          <span style={{ color: "white", fontSize: "1.2rem" }}>+</span>
          <div className="txt-hldr pl-3" style={{ color: "white" }}>
            Add new route
          </div>
        </button>
      </div>

      {routsData ? (
        <div className="container">
          {routsData?.map((row,index) => (
            <div key={`routes_${index}`}
              className="list-hldr n-route mt-3"
              style={{ justifyContent: "space-between" }}
            >
              <div className="desc-hldr">
                <div>
                  <div className="img-hldr">
                    <img src="../images/placeholder.png" alt="" />
                  </div>
                  <div className="text-hldr">
                    <p>
                      <strong style={{ color: "#ad0004" }}>Route name</strong>
                    </p>
                    <p>{row?.name}</p>
                  </div>
                </div>

                <div>
                  <div className="img-hldr">
                    <img src="../images/icon-bookmark-circled.svg" alt="" />
                  </div>
                  <div className="text-hldr">
                    <p>
                      <strong style={{ color: "#ad0004" }}>Created On</strong>
                    </p>
                    <p>
                      {`${dayjs(new Date(row?.createdAt)).format(
                        "DD-MM-YYYY"
                      )}`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="lst-btn-hldr">
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
