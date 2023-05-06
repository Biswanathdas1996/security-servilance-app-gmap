import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import MapForm from "./MapForm";
import { post } from "../helper/apiHelper";
import { validateResponseAdmin } from "../helper/validateResponse";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  //   center: Yup.string().required("Required"),
  centerLat: Yup.number().required("Required"),
  centerLong: Yup.number().required("Required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddNewRouter = ({ onClose }) => {
  const [selectLocation, setSelectLocation] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      //   center: "",
      centerLat: "",
      centerLong: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const body = { ...values, center: "Barasat" };
      const response = await post("/admin/route", body);
      if (validateResponseAdmin(response)) {
        window.location = `#/add-routs/${response?.data?.routeId}`;
      } else {
        alert("error");
      }
    },
  });

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  getLocation();

  function showPosition(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    setSelectLocation({ lat: lat, lng: long });
  }

  const updatedPointer = (coordinate) => {
    setSelectLocation(coordinate);
  };

  formik.values.centerLat = selectLocation?.lat;
  formik.values.centerLong = selectLocation?.lng;

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add new routs
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        {selectLocation && (
          <MapForm markers={selectLocation} updatedPointer={updatedPointer} />
        )}
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          style={{ marginTop: 20 }}
        />
        {/* <TextField
          fullWidth
          id="center"
          name="center"
          label="Center"
          value={formik.values.center}
          onChange={formik.handleChange}
          error={formik.touched.center && Boolean(formik.errors.center)}
          helperText={formik.touched.center && formik.errors.center}
          style={{ marginTop: 20 }}
        /> */}
        <TextField
          fullWidth
          id="centerLat"
          name="centerLat"
          // label="Center Latitude"
          value={formik.values.centerLat}
          onChange={formik.handleChange}
          error={formik.touched.centerLat && Boolean(formik.errors.centerLat)}
          helperText={formik.touched.centerLat && formik.errors.centerLat}
          style={{ marginTop: 20 }}
        />
        <TextField
          fullWidth
          id="centerLong"
          name="centerLong"
          // label="Center Longitude"
          value={formik.values.centerLong}
          onChange={formik.handleChange}
          error={formik.touched.centerLong && Boolean(formik.errors.centerLong)}
          helperText={formik.touched.centerLong && formik.errors.centerLong}
          style={{ marginTop: 20 }}
        />
        <div style={{ display: "flex" }}>
          <button
            type="submit"
            style={{ marginTop: 20, width: 150 }}
            className="admin-button"
          >
            Add
          </button>
          <button
            type="button"
            style={{ marginTop: 20, width: 150 }}
            className="admin-close-button"
            onClick={() => onClose()}
          >
            Close
          </button>
        </div>
      </form>
    </Box>
  );
};

export default AddNewRouter;
