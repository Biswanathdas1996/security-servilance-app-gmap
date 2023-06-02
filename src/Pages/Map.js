import React from "react";
import Map from "../components/Map";
import { withGoogleMap, withScriptjs } from "react-google-maps";
import { Google_Map_URL, MAP_KEY } from "../config";
import { get, post } from "../helper/apiHelper";
import TextField from "@mui/material/TextField";

import mapStyles from "../css/mapStyles";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import CircleViewDetailsModal from "../components/CircleViewDetailsModal";
import CaptureData from "../components/CaptureData";
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
import VisitTable from "../components/VisitTable";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// const MapWrapped = withScriptjs(withGoogleMap(Map));
let watchId;

function Home() {
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
  const [liveCenter, setLiveCenter] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [reCenterLoocation, setReCenterLoocation] = React.useState(null);
  const [comment, setComment] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchData = async () => {
    setLoading(true);
    const user = localStorage.getItem("x-user-data");
    if (user) {
      setUser(JSON.parse(user));
    }
    const response = await post(`/user/getRouteLocations`, {
      routeId: Number(id),
      date: date,
    });
    // console.log("--response->", response);
    if (validateResponseUser(response)) {
      setLocations(response?.data?.locations);
      setRoute(response?.data?.route);
      setCompletedAt(response?.data?.completedAt);
    } else {
      setLoading(false);
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

      const distances = circles.map((circle) => {
        const center = { lat: circle?.lat, lng: circle?.long };
        const radius = circle.radius;
        const distanceInMeters =
          window.google.maps.geometry.spherical.computeDistanceBetween(
            new window.google.maps.LatLng(latitude, longitude),
            center
          );
        return { distanceInMeters, radius };
      });

      // check is inside
      const liveCenterData = distances?.filter(
        (data) => data?.distanceInMeters <= data?.radius
      );

      if (liveCenterData?.length === 0) {
        setIsInsideCircle(false);
      }
      console.log("----------------->", liveCenterData);
    }
  };

  const finishDuty = async () => {
    swal({
      title: "Are you sure?",
      text: "You want to finish your duty",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        setLoading(true);
        if (locations[0]["refId"]) {
          const response = await post(`/user/finishDuty`, {
            refId: locations[0]["refId"],
            comment: comment,
          });
          // console.log("--response->", response);
          if (validateResponseUser(response)) {
            window.location.replace("#/home");
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      }
    });
  };
  // --------------------------------------------------Live tracking ------------

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const trackFetchLocation = () => {
    watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const positionData = { lat: latitude, lng: longitude };
        setReCenterLoocation(positionData);
        checkIfUserInCircle(locations, latitude, longitude);
        setCurrentLocation(positionData);
        setLoading(false);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, maximumAge: 20000, timeout: 10000 }
    );
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      trackFetchLocation();
    }, 3000);
    return () => {
      navigator.geolocation.clearWatch(watchId);
      clearInterval(intervalId);
    };
  }, [trackFetchLocation]);

  const getCurrentLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({
        lat: latitude,
        lng: longitude,
      });
      setReCenterLoocation({
        lat: latitude,
        lng: longitude,
      });
      setLoading(false);
      // checkIfUserInCircle(locations, latitude, longitude);
    });
  };

  // React.useEffect(() => {
  //   getCurrentLocation();
  // }, []);

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
  // console.log("-locations", locations?.length);
  // console.log("-findTotalVisitedCount", findTotalVisitedCount?.length);
  return (
    <>
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
      </>{" "}
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Map view" {...a11yProps(0)} />
            <Tab label="List view" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div style={{ width: "auto", height: "60vh" }}>
            {!loading && locations ? (
              <Map
                defaultCenter={reCenterLoocation}
                defaultZoom={17}
                route={route}
                currentLocation={currentLocation}
                user={user}
                isInsideCircle={isInsideCircle}
                locations={locations}
                handleOpen={handleOpen}
                reCenterLoocation={reCenterLoocation}
              />
            ) : (
              <center
                style={{ width: "auto", height: "60vh", paddingTop: "10rem" }}
              >
                <div className="loader"></div>
              </center>
            )}
            <div className="container grey-location">
              <div className="row routecard">
                <div className="col-9">
                  <p className="text-black">
                    <b>{route?.name}</b>
                  </p>
                  <p className="text-black-sm">
                    Current progress {findTotalVisitedCount?.length}/
                    {locations?.length}
                  </p>
                  <p className="text-black-sm text-bold">
                    <b>Date: {date}</b>
                  </p>
                </div>
                <div
                  className="col-2"
                  style={{ marginTop: "-4rem" }}
                  onClick={() => getCurrentLocation()}
                >
                  <span
                    className="red-circle"
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    <FlipCameraAndroidIcon />
                    {/* <img src="../images/Vector.png" alt="" /> */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} style={{ padding: 10 }}>
          <VisitTable locations={locations} handleOpen={handleOpen} />
        </TabPanel>
      </Box>
      <center>
        <div
          className="container pb-4"
          style={{
            display: "block",
            justifyContent: "space-arround",
            marginTop: "5rem",
          }}
        >
          {isInsideCircle && completedAt === null && (
            <button
              className="button"
              style={{ color: "white", padding: 12, minWidth: "40%" }}
              onClick={handleOpenCameraOpen}
            >
              Capture and Submit
              <PhotoCamera style={{ fontSize: "2rem" }} />
              {/* <img src="../images/Vector.png" alt="" /> */}
            </button>
          )}

          {completedAt === null && (
            <>
              {!loading ? (
                <>
                  <TextField
                    id="outlined-basic"
                    label="Enter Comment (if any)"
                    variant="outlined"
                    onChange={(e) => setComment(e.target.value)}
                    style={{ marginBottom: "1.5rem", marginTop: "1.5rem" }}
                    fullWidth
                  />
                  <button
                    type="button"
                    className="button"
                    style={{ color: "white", minWidth: "100%" }}
                    onClick={() => finishDuty()}
                  >
                    {window.site_text("pages.map.finish_now")}
                    {/* <img src="../images/Vector.png" alt="" /> */}
                    <HighlightOffIcon style={{ fontSize: "2rem" }} />
                  </button>
                </>
              ) : (
                <center>
                  <div></div>
                  {/* <div className="loader"></div> */}
                </center>
              )}
            </>
          )}
        </div>
      </center>
    </>
  );
}

export default Home;
