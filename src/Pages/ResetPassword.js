import React from 'react';
import { Formik, Form, ErrorMessage } from "formik";
import { put } from "../helper/apiHelper";
import * as Yup from "yup";
import swal from "sweetalert";
//import "../css/registration.css";

const initialValues = {
    oldPassword: '',
    newPassword: ''
}

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .matches(/^\d{6}$/, "Enter only 6 digits number")
        .required("Password is required"),
    newPassword: Yup.string()
    .matches(/^\d{6}$/, "Enter only 6 digits number")
    .required("Password is required")     
});

export default function ResetPassword() {
    return (
        <div className="container main">
            <div className="bg-default" style={{ zIndex: 0, height: "10rem" }}></div>
            <div className="container" style={{ zIndex: 1 }}>
                <div className="welcome">
                    <h6 style={{ color: "white" }}>Welcome To</h6>
                </div>
                <div className="Security">
                    <h3 style={{ color: "white" }}>Security Surveillance System</h3>
                </div>
                <div className="Register">
                    <h1>Reset PIN</h1>
                </div>
            </div>
            <div className="container bg-white">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {


                        const body = {
                            ...values,
                            oldPassword: '',
                            newPassword: ''
                        };
                        //delete body.confirmPassword;

                        // const response = await put("/profile/updatePassword", body);
                        // if (response?.success) {
                        //     window.location = "#/login";
                        // } else {
                        //     swal("Sorry!", "Some error occured!", "error");
                        // }
                        setSubmitting(false);
                    }}
                    style={{ marginTop: 20 }}
                >
                    {(formik) => (
                        <Form>
                            <div style={{ marginBottom: "25px" }}>
                                <input
                                    type="password"
                                    className="form-control icon-input input-password"
                                    id="exampleInputPasswordOld"
                                    placeholder={window.site_text("pages.register.oldPassword")}
                                    name="oldPassword"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.oldPassword}
                                    error={formik.touched.oldPassword && formik.errors.oldPassword}
                                    // helperText={
                                    //   formik.touched.password && formik.errors.password
                                    // }
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                />
                                <ErrorMessage name="oldPassword" />
                            </div>
                            <div style={{ marginBottom: "30px" }}>
                                <input
                                    type="password"
                                    className="form-control icon-input input-password"
                                    id="exampleInputPasswordNew"
                                    placeholder={window.site_text("pages.register.newPassword")}
                                    name="newPassword"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.newPassword}
                                    error={formik.touched.newPassword && formik.errors.newPassword}
                                    // helperText={
                                    //   formik.touched.password && formik.errors.password
                                    // }
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                />
                                <ErrorMessage name="newPassword" />
                            </div>
                            <center>
                                {!formik?.isSubmitting ? (
                                    <div className="button" type="submit" style={{ margin: 0 }}>
                                        <button type="submit" className="btn">
                                            {window.site_text("pages.register.reset")}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="loader"></div>
                                )}
                            </center>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>)
}