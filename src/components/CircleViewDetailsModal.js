import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ImageCard from "./ImageCard";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

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
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ margin: 10 }}
            >
              Spot name: <b>{props?.clickedPlace?.name}</b>
            </Typography>

            {props?.clickedPlace?.isVisited ? (
              <>
                <ImageList sx={{ width: 300, height: 200 }}>
                  <ImageListItem style={{ borderRadius: 12 }}>
                    <img
                      src={props?.clickedPlace?.visitData?.profileImage}
                      srcSet={props?.clickedPlace?.visitData?.profileImage}
                      alt={`item.title`}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={`Selfie`}
                      subtitle={`${props?.clickedPlace?.visitData?.createdAt}`}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about `}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                  <ImageListItem>
                    <img
                      src={props?.clickedPlace?.visitData?.image}
                      srcSet={props?.clickedPlace?.visitData?.image}
                      alt={`item.title`}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={`Site image`}
                      subtitle={`${props?.clickedPlace?.visitData?.createdAt}`}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about `}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
                </ImageList>

                {/* <ImageCard
                  img={props?.clickedPlace?.visitData?.profileImage}
                  text="Selfie"
                />
                <ImageCard
                  img={props?.clickedPlace?.visitData?.image}
                  text="Site image"
                /> */}
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
