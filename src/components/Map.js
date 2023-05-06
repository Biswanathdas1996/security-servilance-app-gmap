/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { GoogleMap, Circle, Marker } from "react-google-maps";
import mapStyles from "../css/mapStyles";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CircleViewDetailsModal from "../components/CircleViewDetailsModal";
import CaptureData from "../components/CaptureData";
import { get, post } from "../helper/apiHelper";
import { validateResponseUser } from "../helper/validateResponse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Card from "@mui/material/Card";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import "../css/dutylist.css";
import PersonIcon from "../assets/person.jpg";

import VisitTable from "./VisitTable";

let watchId;
export default function Map({ defaultZoom }) {
  const { id, date } = useParams();
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [isInsideCircle, setIsInsideCircle] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [clickedPlace, setClickedPlace] = React.useState(false);
  const [openCamera, setOpenCamera] = React.useState(false);
  const [locations, setLocations] = React.useState(null);
  const [route, setRoute] = React.useState(null);
  const [completedAt, setCompletedAt] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [liveCenter, setLiveCenter] = useState(null);

  React.useEffect(() => {
    const user = localStorage.getItem("x-user-data");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const fetchData = async () => {
    const response = await post(`/user/getRouteLocations`, {
      routeId: Number(id),
      date: date,
    });
    console.log("--response->", response);
    if (validateResponseUser(response)) {
      setLocations(response?.data?.locations);
      setRoute(response?.data?.route);
      setCompletedAt(response?.data?.completedAt);
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

  const checkIfUserInCircle = (locations, latitude, longitude) => {
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
  };

  function handleClick(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
  }

  const finishDuty = async () => {
    swal({
      title: "Are you sure?",
      text: "You want to finish your duty",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        if (locations[0]["refId"]) {
          const response = await post(`/user/finishDuty`, {
            refId: locations[0]["refId"],
          });
          console.log("--response->", response);
          if (validateResponseUser(response)) {
            window.location.replace("#/home");
          }
        }
      }
    });
  };
  // --------------------------------------------------Live tracking ------------

  const trackFetchLocation = () => {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const positionData = { lat: latitude, lng: longitude };
        checkIfUserInCircle(locations, latitude, longitude);
        setCurrentLocation(positionData);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, maximumAge: 20000, timeout: 10000 }
    );
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      trackFetchLocation();
    }, 6000);
    return () => {
      navigator.geolocation.clearWatch(watchId);
      clearInterval(intervalId);
    };
  }, [trackFetchLocation]);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      checkIfUserInCircle(locations, latitude, longitude);
    });
  }, []);

  React.useEffect(() => {
    let animationId;
    function keepScreenOn() {
      animationId = window.requestAnimationFrame(keepScreenOn);
    }
    keepScreenOn();
    const handleScreenChange = () => {
      if (window.screen && window.screen.keepAwake) {
        window.screen.keepAwake = true;
      }
    };
    handleScreenChange();
    document.addEventListener("visibilitychange", handleScreenChange);
    return () => {
      window.cancelAnimationFrame(animationId);
      document.removeEventListener("visibilitychange", handleScreenChange);
    };
  }, []);

  const findTotalVisitedCount = locations?.filter(
    (location) => location?.isVisited
  );
  console.log("-locations", locations?.length);
  console.log("-findTotalVisitedCount", findTotalVisitedCount?.length);

  return (
    <body class="d-flex flex-column h-100">
      <>
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
      </>

      {route && (
        <>
          <GoogleMap
            defaultZoom={defaultZoom}
            defaultCenter={{ lat: route?.centerLat, lng: route?.centerLong }}
            defaultOptions={{ styles: mapStyles }}
            onClick={(e) => handleClick(e)}
          >
            {currentLocation && (
              <Marker
                position={currentLocation}
                icon={{
                  url: `https://developers.google.com/maps/documentation/javascript/examples/full/images/parking_lot_maps.png`,
                  // url: user?.image,
                  scaledSize: { width: 50, height: 50 },
                }}
              />
            )}

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

          <div className="container grey-location">
            <div className="row routecard">
              <div className="col-9">
                <p className="text-black">
                  Route Name : <b>{route?.name}</b>
                </p>
                <p className="text-black-sm">{route?.center}</p>
              </div>
              <div className="col-2" style={{ marginTop: "-4rem" }}>
                <span
                  className="red-circle"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  {findTotalVisitedCount?.length}/{locations?.length}
                  {/* <img src="../images/Vector.png" alt="" /> */}
                </span>
              </div>
            </div>
          </div>

          <div className="container pb-5">
            {isInsideCircle && completedAt === null && (
              <center>
                <button
                  className="button"
                  style={{ color: "white", padding: 12 }}
                  onClick={handleOpenCameraOpen}
                >
                  Capture and Submit
                  <img src="../images/Vector.png" alt="" />
                </button>
              </center>
            )}
          </div>

          <div className="container pb-5">
            <VisitTable locations={locations} handleOpen={handleOpen} />
            {completedAt === null && (
              <center>
                <button
                  type="button"
                  className="button"
                  style={{ marginTop: "3rem", color: "white" }}
                  onClick={() => finishDuty()}
                >
                  {window.site_text("pages.map.finish_now")}
                  <img src="../images/Vector.png" alt="" />
                </button>
              </center>
            )}
          </div>
        </>
      )}
    </body>
  );
}
