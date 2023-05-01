import React, { useState } from "react";
import { GoogleMap, Circle, Marker } from "react-google-maps";
import mapStyles from "../css/mapStyles";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CircleViewDetailsModal from "../components/CircleViewDetailsModal";
import CaptureData from "../components/CaptureData";
import { get } from "../helper/apiHelper";
import { validateResponseUser } from "../helper/validateResponse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import { useParams } from "react-router-dom";
import icon_activity from "../images/icon_activity.svg";

export default function Map({ defaultZoom }) {
  const { id } = useParams();
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [isInsideCircle, setIsInsideCircle] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [clickedPlace, setClickedPlace] = React.useState(false);
  const [openCamera, setOpenCamera] = React.useState(false);
  const [locations, setLocations] = React.useState(null);
  const [route, setRoute] = React.useState(null);

  const [liveCenter, setLiveCenter] = useState(null);

  const fetchData = async () => {
    const response = await get(`/user/getRouteLocations/${id}`);
    console.log("--response->", response);
    if (validateResponseUser(response)) {
      setLocations(response?.data?.locations);
      setRoute(response?.data?.route);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (text) => {
    setOpen(true);
    setClickedPlace(text);
  };

  const handleClose = () => setOpen(false);

  const handleOpenCameraOpen = () => {
    setOpenCamera(true);
  };

  const handleOpenCameraClose = () => setOpenCamera(false);

  React.useEffect(() => {
    // Get the current location using the Geolocation API
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      // Check if the current location is inside any of the circles
      const circles = locations;
      if (circles) {
        circles.forEach((circle) => {
          const center = { lat: circle?.lat, lng: circle?.long };
          const radius = circle.radius;
          const distanceInMeters =
            window.google.maps.geometry.spherical.computeDistanceBetween(
              new window.google.maps.LatLng(latitude, longitude),
              center
            );
          if (distanceInMeters <= radius) {
            setIsInsideCircle(true);
            setLiveCenter(circle);
          }
        });
      }
    });
  }, [locations]);

  function handleClick(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    console.log("------>lat", lat);
    console.log("------>lng", lng);
  }

  console.log("---isInsideCircle->", isInsideCircle);
  console.log("---liveCenter->", liveCenter);

  return (
    <>
      <div>
        <CircleViewDetailsModal
          open={open}
          onClose={handleClose}
          clickedPlace={clickedPlace}
        />

        {liveCenter && (
          <CaptureData
            open={openCamera}
            onCloseModal={handleOpenCameraClose}
            liveCenter={liveCenter}
          />
        )}
      </div>

      <center>
        {isInsideCircle && (
          <>
            <br />
            <br />
            <Button
              variant="contained"
              onClick={handleOpenCameraOpen}
              styly={{ marginTop: 40 }}
              endIcon={<PhotoCamera />}
            >
              Capture and Submit
            </Button>
          </>
        )}
      </center>

      {route && (
        <>
          <GoogleMap
            defaultZoom={defaultZoom}
            defaultCenter={{ lat: route?.centerLat, lng: route?.centerLong }}
            defaultOptions={{ styles: mapStyles }}
            onClick={(e) => handleClick(e)}
          >
            {currentLocation && <Marker position={currentLocation} />}

            {/* {VisitData &&
          VisitData.map((marker, index) => (
            <Marker
              key={`marker_${index}`}
              position={{ lat: marker.center.lat, lng: marker.center.lng }}
            />
          ))} */}

            {locations &&
              locations?.map((val, index) => {
                let color;

                if (val?.isVisited) {
                  color = "green";
                } else {
                  color = "#FF0000";
                }

                return (
                  <Circle
                    center={{ lat: val?.lat, lng: val?.long }}
                    radius={val?.radius}
                    onClick={() => handleOpen(val)}
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: color,
                      fillOpacity: 0.35,
                    }}
                  />
                );
              })}
          </GoogleMap>
          <Card
            style={{
              marginTop: 20,
              marginBottom: "2rem",
              padding: 15,
              width: "90%",
              paddingBottom: "1rem",
            }}
          >
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {locations &&
                locations?.map((val) => {
                  console.log("val=========>", val);
                  return (
                    <ListItem
                      key={val?.name + val?.id}
                      disableGutters
                      secondaryAction={
                        <IconButton aria-label="comment">
                          <CheckCircleIcon
                            color={val?.isVisited ? "success" : "disabled"}
                          />
                        </IconButton>
                      }
                      onClick={() => handleOpen(val)}
                    >
                      <ListItemText
                        primary={`${val?.name}`}
                        secondary={
                          val?.isVisited
                            ? `Time: ${val?.visitData?.createdAt}`
                            : "Not Visited"
                        }
                      />
                    </ListItem>
                  );
                })}
            </List>
          </Card>
          <div
            className="d-flex justify-content-center total-btn "
            style={{ marginBottom: "4rem" }}
          >
            <div>
              <img src={icon_activity} alt="" className="mr-2" />
            </div>
            <div className="total-title">
              {window.site_text("pages.map.finish_now")}
            </div>
            {/* <div>Total: 04 Routes</div> */}
          </div>
          <br />
        </>
      )}
    </>
  );
}
