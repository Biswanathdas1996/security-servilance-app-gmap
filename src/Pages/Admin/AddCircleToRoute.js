import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import MapForm from "../../components/MapForm";
import TextField from "@mui/material/TextField";
import { GoogleMap, Circle, Marker } from "react-google-maps";
import ListOfRoutes from "../../components/ListOfRoutes";
import MapWrappedComponent from "../../HOC/Map";
import { useParams } from "react-router-dom";
import { get, post, del } from "../../helper/apiHelper";
import { validateResponseAdmin } from "../../function/validateResponse";

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
  const [name, setName] = React.useState("");
  const [radius, setRadius] = React.useState("");
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const [routeData, setRouteData] = React.useState(null);
  const [selectLocation, setSelectLocation] = React.useState(null);
  const [choosedLocation, setChoosedLocation] = React.useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchRoutsData = React.useCallback(async () => {
    const response = await get(`/admin/route/${id}`);
    if (validateResponseAdmin(response)) {
      setChoosedLocation(response?.data?.locations);
      setRouteData(response?.data);
    }
  });

  React.useEffect(() => {
    fetchRoutsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleClick(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    setSelectLocation({ lat: lat, lng: lng });
    setOpen(true);
  }

  const updatedPointer = (coordinate) => {
    setSelectLocation(coordinate);
  };

  const addPlace = async () => {
    setRouteData(null);
    const data = {
      routeId: Number(id),
      locations: [
        {
          name: name,
          lat: selectLocation?.lat,
          long: selectLocation?.lng,
          radius: Number(radius),
        },
      ],
    };

    await post("/admin/route/location", data);
    handleClose(false);
    window.location.reload();
  };

  const deletLocation = async (id) => {
    const response = await del(`/admin/route/location/${id}`);
    if (validateResponseAdmin(response)) {
      window.location.reload();
    }
  };

  return (
    <>
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
            onChange={(e) => setName(e.target.value)}
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
            label="Circle Radius (Mitter)"
            variant="outlined"
            style={{ marginTop: 10, width: "100%" }}
            onChange={(e) => setRadius(e.target.value)}
          />
          <br />
          <br />
          <Button variant="contained" onClick={() => addPlace()}>
            Add Place
          </Button>
        </Box>
      </Modal>

      {routeData && (
        <>
          <GoogleMap
            defaultCenter={{
              lat: routeData?.centerLat,
              lng: routeData?.centerLong,
            }}
            defaultZoom={13}
            onClick={(e) => handleClick(e)}
          >
            {choosedLocation?.map((marker, index) => (
              <>
                <Marker
                  key={index}
                  position={{ lat: marker?.lat, lng: marker?.long }}
                  title={marker?.name}
                  label={marker?.name}
                />
                <Circle
                  center={{ lat: marker?.lat, lng: marker?.long }}
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
            <ListOfRoutes
              routeData={choosedLocation}
              deletLocation={deletLocation}
            />

            <br />
            <br />
            <br />
          </div>
        </>
      )}
    </>
  );
}

export default function AddCircleToRoute() {
  return MapWrappedComponent(BasicModal);
}
