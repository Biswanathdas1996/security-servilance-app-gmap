import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";

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
            <div class="list-hldr n-route mt-3" style={{}}>
              <div class="desc-hldr">
                <div>
                  <div class="img-hldr">
                    <img src="../images/icon-profile-circled.svg" alt="" />
                  </div>
                  <div class="text-hldr">
                    <p>
                      <strong>Spot</strong>
                    </p>
                    <p>{props?.clickedPlace?.name}</p>
                  </div>
                </div>

                <div>
                  <div class="img-hldr">
                    <img src="../images/icon-bookmark-circled.svg" alt="" />
                  </div>
                  {props?.clickedPlace?.isVisited && (
                    <div class="text-hldr" style={{ width: 150 }}>
                      <p>
                        <strong>Captured at</strong>
                      </p>
                      <p>
                        {dayjs(
                          props?.clickedPlace?.visitData?.createdAt
                        ).format("YYYY-MM-DD hh:mm A")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ margin: 10 }}
            >
              <b></b>
              <p>
                
              </p>
            </Typography> */}

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

            <button
              type="button"
              onClick={(e) => onClose()}
              className="admin-close-button"
              style={{ float: "right", margin: 0 }}
            >
              <div className="text">
                <h6>Close</h6>
              </div>
            </button>
          </Box>
        </Modal>
      </div>
    </>
  );
}
