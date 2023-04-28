import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Polyline,
  Circle,
} from "react-google-maps";
import coordinates from "../Data/coordinates.json";
import CircleViewDetailsModal from "../components/CircleViewDetailsModal";

const API_KEY = "AIzaSyAet8Mk1nPvOn_AebLE5ZxXoGejOD8tPzA&amp";

const options = {
  fillColor: "lightblue",
  fillOpacity: 1,
  strokeColor: "red",
  strokeOpacity: 1,
  strokeWeight: 10,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

const Map = withScriptjs(
  withGoogleMap(({ data, routsData }) => {
    const [open, setOpen] = React.useState(false);
    const [clickedPlace, setClickedPlace] = React.useState(false);

    const handleOpen = (text) => {
      setOpen(true);
      setClickedPlace(text);
    };
    const handleClose = () => setOpen(false);

    console.log("--data--->", data);

    return (
      <>
        <CircleViewDetailsModal
          open={open}
          onClose={handleClose}
          clickedPlace={clickedPlace}
        />

        <GoogleMap
          defaultCenter={{
            lat: routsData?.centerLat,
            lng: routsData?.centerLong,
          }}
          defaultZoom={13}
        >
          {data?.locations &&
            data?.locations?.map((val) => {
              let color;
              if (val?.visitData) {
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
          {/* <Polyline path={coordinates?.coordinates} options={options} /> */}
        </GoogleMap>
      </>
    );
  })
);

export default function App({ data, routsData }) {
  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <Map
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "70vh" }} />}
        data={data}
        routsData={routsData}
      />
    </div>
  );
}
