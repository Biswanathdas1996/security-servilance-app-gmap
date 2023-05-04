import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageCard from "./ImageCard";

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
            <center>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {props?.clickedPlace?.name}
              </Typography>
            </center>
            {props?.clickedPlace?.isVisited ? (
              <>
                <ImageCard
                  img={props?.clickedPlace?.visitData?.profileImage}
                  text="Selfie"
                />
                <ImageCard
                  img={props?.clickedPlace?.visitData?.image}
                  text="Site image"
                />

                <div className="contentTT">
                  Captured at :
                  <b>{props?.clickedPlace?.visitData?.createdAt}</b>
                </div>
              </>
            ) : (
              <small>Not visited yet</small>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
}
