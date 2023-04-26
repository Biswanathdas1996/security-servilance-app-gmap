import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MapForm from "../../components/MapForm";
import TextField from "@mui/material/TextField";
import { GoogleMap, Circle, Marker } from "react-google-maps";
import ListOfRoutes from "../../components/ListOfRoutes";
import MapWrappedComponent from "../../HOC/Map";
import RouteData from "../../Data/route_id_1.json";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedLocation, setSelectedLocation] = React.useState(RouteData);

  const [selectLocation, setSelectLocation] = React.useState(null);

  async function handleClick(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    console.log("------>lat", lat);
    console.log("------>lng", lng);
    setSelectLocation({ lat: lat, lng: lng });
    setOpen(true);
  }

  const updatedPointer = (coordinate) => {
    setSelectLocation(coordinate);
  };

  // console.log("---selectedLocation--", selectedLocation);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectLocation && (
            <MapForm markers={selectLocation} updatedPointer={updatedPointer} />
          )}
          <br />
          <TextField
            id="outlined-basic"
            label="Enter Name"
            variant="outlined"
            style={{ marginTop: 10, width: "100%" }}
          />
          <TextField
            id="outlined-basic"
            label="Circle center"
            variant="outlined"
            value={JSON.stringify(selectLocation)}
            style={{ marginTop: 10, width: "100%" }}
            disabled
          />
          <br />
          <TextField
            id="outlined-basic"
            label="Circle Radius"
            variant="outlined"
            style={{ marginTop: 10, width: "100%" }}
          />
          <br />
          <br />
          <Button variant="contained">Add Place</Button>
        </Box>
      </Modal>

      <GoogleMap
        defaultCenter={{ lat: 22.571695590417033, lng: 88.50591509173454 }}
        defaultZoom={13}
        onClick={(e) => handleClick(e)}
      >
        {selectedLocation?.map((marker, index) => (
          <>
            <Marker
              key={index}
              position={{ lat: marker?.center?.lat, lng: marker?.center?.lng }}
              title={marker?.name}
              label={marker?.name}
            />
            <Circle
              center={marker?.center}
              radius={marker?.radius}
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
              }}
            />
          </>
        ))}
      </GoogleMap>
      <div style={{ margin: 50 }}>
        <ListOfRoutes routeData={selectedLocation} />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default function App() {
  return MapWrappedComponent(BasicModal);
}
