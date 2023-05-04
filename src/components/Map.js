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
import icon_activity from "../images/icon_activity.svg";
import "../css/dutylist.css";

export default function Map({ defaultZoom }) {
  const { id, date } = useParams();
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [isInsideCircle, setIsInsideCircle] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [clickedPlace, setClickedPlace] = React.useState(false);
  const [openCamera, setOpenCamera] = React.useState(false);
  const [locations, setLocations] = React.useState(null);
  const [route, setRoute] = React.useState(null);

  const [liveCenter, setLiveCenter] = useState(null);

  const fetchData = async () => {
    const response = await post(`/user/getRouteLocations`, {
      routeId: Number(id),
      date: date,
    });
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

  const finishDuty = async () => {
    if (locations[0]["refId"]) {
      const response = await post(`/user/finishDuty`, {
        refId: locations[0]["refId"],
      });
      console.log("--response->", response);
      if (validateResponseUser(response)) {
        window.location.replace("#/home");
      }
    }
  };

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

          <div className="container grey-location">
            <div className="row routecard">
              <div className="col-9">
                <p className="text-black">Route Name : Odisha</p>
                <p className="text-black-sm">20.06.23 - 10:00 PM</p>
              </div>
              <div className="col-2">
                <span className="red-circle">
                  <img src="../images/Vector.png" alt="" />
                </span>
              </div>
            </div>
          </div>
          <div className="container pb-5">
            {isInsideCircle && (
              <center>
                <button
                  className="button"
                  style={{ marginTop: "1rem", color: "white" }}
                  onClick={handleOpenCameraOpen}
                >
                  Capture and Submit
                </button>
              </center>
            )}
          </div>
          <div className="container pb-5">
            <table className="table caption-top red-header">
              <thead>
                <tr>
                  <th scope="col">Location</th>
                  <th scope="col">Time</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {locations &&
                  locations?.map((val) => {
                    return (
                      <tr
                        className={val?.isVisited ? "active" : ""}
                        key={val?.name + val?.id}
                      >
                        <td>{val?.name}</td>
                        <td>
                          {val?.isVisited
                            ? `${val?.visitData?.createdAt}`
                            : "Not Visited"}
                        </td>
                        <td>
                          <img
                            src="../images/placeholder.png"
                            alt=""
                            onClick={() => handleOpen(val)}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <center>
              <button
                type="button"
                className="button"
                style={{ marginTop: "3rem", color: "white" }}
                onClick={() => finishDuty()}
              >
                {window.site_text("pages.map.finish_now")}
              </button>
            </center>
          </div>
        </>
      )}
    </>
  );
}
