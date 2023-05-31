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
  p: 2,
};

const AddNewRouter = ({ onClose }) => {
  const [selectLocation, setSelectLocation] = React.useState("");
  let initialVal= {
    name: "",
    //   center: "",
    centerLat: "",
    centerLong: "",
  }

  const formik = useFormik({
    initialValues: {initialVal},
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      const body = { ...values, center: "Barasat" };
      const response = await post("/admin/route", body);
      if (validateResponseAdmin(response)) {
        window.location.replace(`#/admin/add-routs/${response?.data?.routeId}`);
      } else {
        alert("error");
      }
    },
  });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      console.log("lat", latitude);
      console.log("long",longitude);
      setSelectLocation({ lat: latitude, lng: longitude });
    });
  }, []);

  const updatedPointer = (coordinate) => {
    setSelectLocation(coordinate);
  };

  formik.values.centerLat = selectLocation?.lat ?? "";
  formik.values.centerLong = selectLocation?.lng ?? "";

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Pick a center of the route
      </Typography>
      <br />
      <form onSubmit={formik.handleSubmit}>
        {selectLocation && (
          <MapForm markers={selectLocation} updatedPointer={updatedPointer} />
        )}
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Enter route name"
          value={formik.values?.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          style={{ marginTop: 20 }}
        />

        <div>
          <div className="text-hldr mt-3">
            <p>
              <strong>Location: </strong>
              {formik?.values?.centerLat && formik?.values?.centerLong && (
                <span>
                  {parseFloat(formik.values.centerLat).toFixed(3)},{" "}
                  {parseFloat(formik.values.centerLong).toFixed(3)}
                </span>
              )}
            </p>
          </div>
        </div>

        <TextField
          fullWidth
          id="centerLat"
          name="centerLat"
          // label="Center Latitude"
          value={formik.values.centerLat}
          onChange={formik.handleChange}
          error={formik.touched.centerLat && Boolean(formik.errors.centerLat)}
          helperText={formik.touched.centerLat && formik.errors.centerLat}
          style={{ marginTop: 20, display: "none" }}
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
          style={{ marginTop: 20, display: "none" }}
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
