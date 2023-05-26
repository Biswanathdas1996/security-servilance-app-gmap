import React, { useEffect, useRef, useState } from 'react';
import { get, put, post } from "../../helper/apiHelper";
import { Formik, Form, ErrorMessage } from "formik";
import swal from "sweetalert";
import * as Yup from "yup";
import { useParams } from 'react-router-dom';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AutocompliteInput from "../../components/AutocompliteInput";
import { Box, Modal } from '@mui/material';
import { validateResponseAdmin } from "../../helper/validateResponse";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: "5px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

const validationSchemaName = Yup.object().shape({
    name: Yup.string().required("Name is required")
});
const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    password: Yup.string()
      .matches(/^\d{6}$/, "Enter only 6 digits number")
      .required("Password is required")
});

export default function UserDetails() {
    let { id } = useParams();
    const [loading, setLoading] = React.useState(true);
    const [initialVal, setInitialVal] = useState({});
    const [selectedPoliceStation, setSelectedPoliceStation] =
        React.useState(null);
    const [designation, setDesignation] = React.useState(null);
    const [policeStations, setPoliceStations] = React.useState(null);
    const[openModal,setOpenModal] = useState(false);
    const [readOnly,setReadOnly] = useState(true);
    const passwordField = useRef(null);


    const getPoliceStations = async () => {
        const response = await get("/policeStation");
        if (response?.success) {
            setPoliceStations(response?.data);
        }
    };

    const getDesignation = async () => {
        const response = await get("/designation");
        if (response?.success) {
            setDesignation(response?.data);
        }
    };
    const selectedPoliceStationCallback = (data) => {
        setSelectedPoliceStation(data?.id);
    };

    const handleClose = () => {
        setOpenModal(false);
    }
    const getUsrDetails = async () => {
        const { data } = await get(`/admin/user/${id}`);
        setInitialVal(data);
        setLoading(false);
    }
    useEffect(() => {
        getUsrDetails();
        getPoliceStations();
        getDesignation();
    }, []);

    useEffect(()=> {
        if(!readOnly) passwordField.current.focus();
    },[readOnly]);

    return (<div>
        {loading ? <center><div className="loader"></div></center>
            : <div className="container p-4 mb-4 user-details">
                <Formik
                    initialValues={initialVal}
                    validationSchema={readOnly ? validationSchemaName : validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        let data = {};

                        if(readOnly) {
                            data = {
                                name: values.name,
                                designationId: values.designation.id,
                                policeStationId: values.policeStation.id,
                                contactNumber: values.contactNumber
                            }
                        } else {
                            data = {
                                name: values.name,
                                designationId: values.designation.id,
                                policeStationId: values.policeStation.id,
                                contactNumber: values.contactNumber,
                                password: values.password
                            }
                        }
                        console.log('data',data);

                        // if (!selectedPoliceStation) {
                        //     swal("Error", "Please select proper police station", "warning");
                        //     return;
                        // }
                        // if (body?.designationId === "") {
                        //     swal("Error", "Please select proper designation", "warning");
                        //     return;
                        // }
                        // //delete body.confirmPassword;

                        const response = await put(`/admin/user/${id}`, data);
                        if (validateResponseAdmin(response)) {
                            swal("Success!", "PIN changed successfully!", "success").then(
                              (value) => {
                                window.location = "#/admin/users";
                              }
                            );
                        } else {
                            swal("Sorry!", "Some error occured!", "error");
                        }
                        setSubmitting(false);
                    }}
                    style={{ marginTop: 20 }}
                >
                    {(formik) => (
                        <Form>
                            {policeStations && (
                                <div className="mb-3">
                                    <label>Police Station</label>
                                    <FormControl size="small" fullWidth>
                                        <AutocompliteInput
                                            val={formik.values.policeStation.name}
                                            data={policeStations}
                                            onchangeCallback={selectedPoliceStationCallback}
                                        />
                                    </FormControl>
                                    <ErrorMessage name="policeStation" />
                                </div>
                            )}
                            {designation && (
                                <div className="mb-3">
                                    <label>
                                        {" "}
                                        {window.site_text("pages.register.designation")}
                                    </label>
                                    <FormControl size="small" fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="designationId"
                                            className="form-control icon-input input-eid"
                                            value={formik.values.designation.id}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={
                                                formik.touched.designationId &&
                                                formik.errors.designationId
                                            }
                                            helperText={
                                                formik.touched.designationId &&
                                                formik.errors.designationId
                                            }
                                        >
                                            {designation?.map((data, index) => (
                                                <MenuItem value={data?.id} key={index}>
                                                    {data?.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <ErrorMessage name="designationId" />
                                </div>
                            )}

                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control icon-input input-uid"
                                    id="exampleInputName1"
                                    placeholder={window.site_text("pages.register.name")}
                                    name="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    error={formik.touched.name && formik.errors.name}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                                <ErrorMessage name="name" />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control icon-input input-email"
                                    id="exampleInputcontactNumber"
                                    placeholder={window.site_text("pages.register.contact")}
                                    name="contactNumber"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.contactNumber}
                                    error={
                                        formik.touched.contactNumber &&
                                        formik.errors.contactNumber
                                    }
                                    helperText={
                                        formik.touched.contactNumber &&
                                        formik.errors.contactNumber
                                    }
                                />
                                <ErrorMessage name="contactNumber" />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    ref={passwordField}
                                    className="form-control icon-input input-password"
                                    id="exampleInputPassword1"
                                    placeholder={readOnly ? window.site_text("pages.register.dummy_pin"): ''}
                                    name="password"
                                    disabled={readOnly}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    error={formik.touched.password && formik.errors.password}
                                    helperText={
                                        formik.touched.password && formik.errors.password
                                    }
                                />
                                <ErrorMessage name="password" />
                                <div onClick={() => {
                                        if(readOnly) setOpenModal(true);
                                        else return;
                                    }}
                                style={{color: "#007FFF", float:"right", cursor:"pointer", fontSize:"12px"}}>
                                    Change PIN</div>
                            </div>
                            {formik.values.profileImage && (
                                <center>
                                    <img
                                        src={formik.values.profileImage}
                                        alt="user"
                                        height={100}
                                        width={100}
                                        style={{
                                            margin: 10,
                                            border: "5px solid gray",
                                            borderRadius: "50%",
                                        }}
                                    />
                                </center>
                            )}

                            <center>
                                {!formik?.isSubmitting ? (
                                    <div className="button" type="submit" style={{ margin: 0 }}>
                                        <button type="submit" className="btn">
                                            {window.site_text("pages.register.save_changes")}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="loader"></div>
                                )}
                            </center>
                        </Form>
                    )}
                </Formik>
                <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                >
                    <Box sx={{ ...style, width: 350, textAlign:"center" }}>
                        <p id="child-modal-title">
                            Are you sure, you want to change the PIN?
                        </p>
                        <button className="confirmModal-btn" onClick={() => {
                            handleClose();
                            setReadOnly(false);
                        }}>Yes</button>
                        <button className="confirmModal-btn" onClick={handleClose}>No</button>
                    </Box>
                </Modal>
            </div>}
    </div>)
}