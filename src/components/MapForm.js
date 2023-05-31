import React, { useState, useMemo } from "react";
// import {
//   withGoogleMap,
//   withScriptjs,
//   GoogleMap,
//   Polyline,
//   Marker,
// } from "react-google-maps";

import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

import { Google_Map_URL, MAP_KEY } from "../config";

// export const MAP = ({ markers, updatedPointer }) => {
//   const [selectLocation, setSelectLocation] = React.useState(null);
//   const [newLocationPicked, setNewLocationPicked] = React.useState(false);

//   function handleClick(event) {
//     var lat = event.latLng.lat();
//     var lng = event.latLng.lng();
//     console.log("------>lat", lat);
//     console.log("------>lng", lng);
//     const place = {
//       lat: lat,
//       lng: lng,
//     };
//     setSelectLocation(place);
//     updatedPointer(place);
//     setNewLocationPicked(true);
//   }

//   const getCurrentLocation = () => {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const { latitude, longitude } = position.coords;
//       setSelectLocation({
//         lat: latitude,
//         lng: longitude,
//       });
//     });
//   };

//   React.useEffect(() => {
//     if (!markers) {
//       getCurrentLocation();
//     } else {
//       setSelectLocation({
//         lat: markers?.lat,
//         lng: markers?.lng,
//       });
//       updatedPointer({
//         lat: markers?.lat,
//         lng: markers?.lng,
//       });
//     }
//   }, []);

//   return (
//     <>
//       {selectLocation && (
//         <GoogleMap
//           defaultCenter={selectLocation}
//           defaultZoom={15}
//           onClick={(e) => handleClick(e)}
//         >
//           <Marker
//             key={12}
//             position={selectLocation}
//             color="#3498DB"
//             icon={{
//               url: `https://maps.google.com/mapfiles/kml/paddle/${
//                 newLocationPicked ? `red-stars.png` : `purple-stars.png`
//               }`,
//               scaledSize: { width: 50, height: 50 },
//             }}
//             title={newLocationPicked ? `` : `You are here`}
//             label={newLocationPicked ? `` : `You are here`}
//           />
//         </GoogleMap>
//       )}
//     </>
//   );
// };

// const MapData = withScriptjs(
//   withGoogleMap(({ markers, updatedPointer }) => (
//     <MAP markers={markers} updatedPointer={updatedPointer} />
//   ))
// );

// export default function App({ markers, updatedPointer }) {
//   console.log("++++++", markers);
//   return (
//     <div style={{ height: "300px", width: "100%" }}>
//       <MapData
//         googleMapURL={`${Google_Map_URL}?key=${MAP_KEY}`}
//         loadingElement={<div style={{ height: "100%" }} />}
//         containerElement={<div style={{ height: "100%" }} />}
//         mapElement={<div style={{ height: "300px" }} />}
//         // coordinates={coordinates.coordinates}

//         markers={markers}
//         updatedPointer={updatedPointer}
//       />
//     </div>
//   );
// }

export default function App({markers, updatedPointer}) {
  const [selectLocation, setSelectLocation] = React.useState(null);
  const [newLocationPicked, setNewLocationPicked] = React.useState(false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_KEY,
  });
  
  function handleMapClick(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    const place = {
      lat: lat,
      lng: lng,
    };
    setSelectLocation(place);
    updatedPointer(place);
    setNewLocationPicked(true);
  }
  
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log("lat", latitude);
      console.log("long",longitude);
      setSelectLocation({
        lat: latitude,
        lng: longitude,
      });
    });
  };
  React.useEffect(() => {
    if (!markers) {
      getCurrentLocation();
    } else {
      setSelectLocation({
        lat: markers?.lat,
        lng: markers?.lng,
      });
      updatedPointer({
        lat: markers?.lat,
        lng: markers?.lng,
      });
    }
  }, []);
  
  return (<div className="App">
    {!isLoaded ? (
      <h1>Loading...</h1>
    ) : (
      <>{selectLocation && <GoogleMap
        mapContainerClassName="map-container"
        center={selectLocation}
        zoom={15}
        onClick={(e) => handleMapClick(e)}
      >
        <MarkerF
          position={selectLocation}
          icon={{
            url: `https://maps.google.com/mapfiles/kml/paddle/${newLocationPicked ?
             `red-stars.png` : `purple-stars.png`}`,
            scaledSize: { width: 50, height: 50 },
          }}
        />
      </GoogleMap>}</>
    )}
  </div>);
}
