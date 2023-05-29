import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import { get, post } from "../helper/apiHelper";
import { validateResponseAdmin } from "../helper/validateResponse";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  //   center: Yup.string().required("Required"),
  assetTypes: Yup.number().required("Required"),
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
  const[assetTypes,setAssetTypes] =useState([]);

  const formik = useFormik({
      initialValues: {
      assetTypeId: "",
      uniqueID: "",
      password: "",
      name: "",
      isTrackingEnabled: true,
      image:""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);

      //const body = { ...values, center: "Barasat" };
      // const response = await post("/admin/route", body);
      // if (validateResponseAdmin(response)) {
      //   window.location.replace(`#/admin/add-routs/${response?.data?.routeId}`);
      // } else {
      //   alert("error");
      // }
    },
  });

  async function getAssetTypes() {
    const {data} = await get("/admin/asset/getAssetTypes");
    setAssetTypes(data);
  }

  React.useEffect(() => {
    getAssetTypes();
  }, []);

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add new Assets
      </Typography>
      <br />
      
    </Box>
  );
};

export default AddNewRouter;
