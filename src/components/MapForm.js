import React, { useState, useMemo } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import { MAP_KEY } from "../config";


export default function App({markers, updatedPointer}) {
  const [selectLocation, setSelectLocation] = React.useState(null);
  const iconBase = "https://maps.google.com/mapfiles/kml/paddle/";
  const [iconUrl,setIconUrl] = useState(iconBase + "purple-stars.png");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_KEY,
  });
  
  function handleMapClick(event) {
    setIconUrl(iconBase + "red-stars.png")
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    const place = {
      lat: lat,
      lng: lng,
    };
    setSelectLocation(place);
    updatedPointer(place);
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
    {console.log(iconUrl)}
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
          icon= {{
            url: iconUrl,
            scaledSize: { width: 50, height: 50 },
          }}
        />
      </GoogleMap>}</>
    )}
  </div>);
}
