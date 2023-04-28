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
            <h2>Details</h2>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props?.clickedPlace?.name}
            </Typography>

            {props?.clickedPlace?.visitData && (
              <>
                <h2>Visited</h2>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {props?.clickedPlace?.visitData?.createdAt}
                </Typography>
                <img
                  src={props?.clickedPlace?.visitData?.image}
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
