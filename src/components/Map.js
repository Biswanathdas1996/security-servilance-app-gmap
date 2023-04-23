import React from "react";
import { GoogleMap, Circle, Marker } from "react-google-maps";
import mapStyles from "../style/mapStyles";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CircleViewDetailsModal from "../components/CircleViewDetailsModal";
import CaptureData from "../components/CaptureData";

import VisitData from "../Data/visit_location.json";

export default function Map({ defaultCenter, defaultZoom }) {
  const [currentLocation, setCurrentLocation] = React.useState(null);

  const [isInsideCircle, setIsInsideCircle] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [clickedPlace, setClickedPlace] = React.useState(false);
  const [openCamera, setOpenCamera] = React.useState(false);

  const handleOpen = (text) => {
    setOpen(true);
    setClickedPlace(text);
  };
  const handleClose = () => setOpen(false);

  const handleOpenCameraOpen = (text) => {
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
      const circles = VisitData;
      circles.forEach((circle) => {
        const center = circle.center;
        const radius = circle.radius;
        const distanceInMeters =
          window.google.maps.geometry.spherical.computeDistanceBetween(
            new window.google.maps.LatLng(latitude, longitude),
            center
          );
        if (distanceInMeters <= radius) {
          setIsInsideCircle(true);
        }
      });
    });
  }, []);

  function handleClick(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    console.log("------>lat", lat);
    console.log("------>lng", lng);
  }

  console.log("---isInsideCircle->", isInsideCircle);

  return (
    <>
      <div>
        <CircleViewDetailsModal
          open={open}
          onClose={handleClose}
          clickedPlace={clickedPlace}
        />
        <CaptureData open={openCamera} onClose={handleOpenCameraClose} />
      </div>

      <center>
        <br />
        <br />
        {isInsideCircle && (
          <Button
            variant="contained"
            onClick={handleOpenCameraOpen}
            styly={{ marginTop: 40 }}
            endIcon={<PhotoCamera />}
          >
            Capture and Submit
          </Button>
        )}
      </center>

      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={defaultCenter}
        defaultOptions={{ styles: mapStyles }}
        onClick={(e) => handleClick(e)}
      >
        {currentLocation && (
          <Marker
            // icon={
            //   "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            // }
            position={currentLocation}
          />
        )}

        {/* {VisitData &&
          VisitData.map((marker, index) => (
            <Marker
              key={`marker_${index}`}
              position={{ lat: marker.center.lat, lng: marker.center.lng }}
            />
          ))} */}

        {VisitData &&
          VisitData?.map((val, index) => {
            let color;
            if (val?.visited?.status) {
              color = "green";
            } else {
              color = "#FF0000";
            }

            return (
              <Circle
                center={val?.center}
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
    </>
  );
}
