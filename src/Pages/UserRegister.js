import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { get, post, put, del } from "../helper/apiHelper";
import swal from "sweetalert";

import "../css/registration.css";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  empID: Yup.string().required("empID is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.number()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.number()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const initialValues = {
  empID: "",
  faceID: "",
  name: "",
  email: "",
  password: null,
  confirmPassword: "",
  contactNumber: "",
};

export default function UserRegister({ faceData }) {
  return (
    <body className="d-flex flex-column h-100">
      <div className="container main">
        <div className="bg-default" style={{ zIndex: 0 }}></div>
        <div className="container" style={{ zIndex: 1 }}>
          <div className="welcome">
            <h6 style={{ color: "white" }}>Welcome To</h6>
          </div>
          <div className="Security">
            <h1 style={{ color: "white" }}>Security Surveillance System</h1>
          </div>
          <div className="Register">
            <h1>Register Your Details</h1>
          </div>
        </div>
        <div className="container bg-white">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);

              const body = {
                ...values,
                password: parseInt(values?.password),
                faceID: JSON.stringify(faceData),
              };
              delete body.confirmPassword;
              const response = await post("/auth/register", body);
              if (response?.success) {
                window.location = "#/login";
              } else {
                swal("Sorry!", "Some error occured!", "error");
              }
              setSubmitting(false);
            }}
            style={{ marginTop: 20 }}
          >
            {(formik) => (
              <Form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control icon-input input-eid"
                    id="exampleInputEmpId"
                    placeholder={window.site_text("pages.register.emp_ID")}
                    name="empID"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.empID}
                    error={formik.touched.empID && formik.errors.empID}
                    helperText={formik.touched.empID && formik.errors.empID}
                  />
                  <ErrorMessage name="empID" />
                </div>

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
                    type="email"
                    className="form-control icon-input input-ctno"
                    id="InputEmail1"
                    aria-describedby="emailHelp"
                    placeholder={window.site_text("pages.register.email")}
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && formik.errors.email}
                    helperText={formik.touched.email && formik.errors.email}
                    style={{ marginTop: 20 }}
                  />
                  <ErrorMessage name="email" />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control icon-input input-email"
                    id="exampleInputEmail1"
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
                    className="form-control icon-input input-password"
                    id="exampleInputPassword1"
                    placeholder={window.site_text("pages.register.password")}
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    error={formik.touched.password && formik.errors.password}
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <ErrorMessage name="password" />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control icon-input input-password"
                    id="exampleInputPassword2"
                    placeholder={window.site_text(
                      "pages.register.confirm_passowrd"
                    )}
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    error={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />
                  <ErrorMessage name="confirmPassword" />
                </div>
                {/* <div className="textinput">
                  <p>Take Your Picture</p>
                  <div className="camera-icon">
                    <img src="../images/camera.png" alt="camera" />
                  </div>
                </div> */}

                <center>
                  {!formik?.isSubmitting ? (
                    <div className="button" type="submit">
                      <button type="submit" className="btn">
                        {window.site_text("pages.register.button")}
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
        <div
          className="register mt-4"
          onClick={() => (window.location.href = "#/login")}
        >
          <p>Already registered? </p>
          <p>
            <strong>CLICK HERE</strong> to sign in
          </p>
        </div>
      </div>
    </body>
  );
}
