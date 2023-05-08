/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { GoogleMap, Circle, Marker } from "react-google-maps";
import mapStyles from "../css/mapStyles";
import CircleViewDetailsModal from "../components/CircleViewDetailsModal";
import CaptureData from "../components/CaptureData";

export default function Map({
  defaultZoom,

  route,
  handleClick,
  currentLocation,
  user,
  isInsideCircle,
  locations,
  handleOpen,
  reCenterLoocation,
}) {
  return (
    <body class="d-flex flex-column h-100">
      {route && (
        <>
          <GoogleMap
            defaultZoom={defaultZoom}
            defaultCenter={currentLocation}
            defaultOptions={{ styles: mapStyles }}
            // onClick={(e) => handleClick(e)}
          >
            {currentLocation && (
              <Marker
                position={reCenterLoocation}
                // label={user?.name
                //   .split(" ")
                //   .map((word) => word[0])
                //   .join("")}
                optimized={true}
                draggable={false}
                color="#3498DB"
                icon={{
                  url: `https://maps.google.com/mapfiles/kml/paddle/${
                    isInsideCircle ? `grn-stars.png` : `purple-stars.png`
                  }`,
                  scaledSize: { width: 50, height: 50 },
                }}
              />
            )}
            {/* green-dot.png */}
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
        </>
      )}
    </body>
  );
}
