import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Map({ open, onClose, ...props }) {
  console.log("---", props?.clickedPlace?.visited);
  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={(e) => onClose()}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h2>Visited task details</h2>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props?.clickedPlace?.name}
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>

            {props?.clickedPlace?.visited?.status && (
              <>
                <h2>Visited</h2>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {props?.clickedPlace?.visited?.data?.time}
                </Typography>
                <img
                  src={props?.clickedPlace?.visited?.data?.image}
                  alt="img"
                  style={{ height: 200, width: 250 }}
                />
              </>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}
