import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { get, post, put, del } from "../helper/apiHelper";
import swal from "sweetalert";
import MapIcon from "../assets/map.jpg";
import icon_activity from "../images/icon_activity.svg";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
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
    <body className="d-flex flex-column h-100 overflow-hidden">
      <div className="bg-purple"></div>
      <main className="flex-shrink-0 main-foot-adjust  pt-2">
        <div className="container">
          <div
            style={{
              backgroundColor: "#ff8126",
              padding: "12rem",
              margin: "-13px",
              paddingTop: "3rem",
              background: `url(${MapIcon})`,
            }}
          >
            <div className="row profile-dtl">
              <div className="col-2"></div>
            </div>
          </div>

          <div
            style={{
              marginTop: 31,
              border: "1px solid #ff8126",
              padding: 10,
            }}
          >
            <center>
              <h1>Register</h1>
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
                    <div>
                      <Field
                        name="empID"
                        as={TextField}
                        label={window.site_text("pages.register.emp_ID")}
                        variant="outlined"
                        fullWidth
                        error={formik.touched.empID && formik.errors.empID}
                        helperText={formik.touched.empID && formik.errors.empID}
                        style={{ marginTop: 20, width: "100%" }}
                      />
                    </div>
                    <div>
                      <Field
                        name="name"
                        as={TextField}
                        label={window.site_text("pages.register.name")}
                        variant="outlined"
                        fullWidth
                        error={formik.touched.name && formik.errors.name}
                        helperText={formik.touched.name && formik.errors.name}
                        style={{ marginTop: 20 }}
                      />
                    </div>
                    <div>
                      <Field
                        name="email"
                        as={TextField}
                        label={window.site_text("pages.register.email")}
                        variant="outlined"
                        fullWidth
                        error={formik.touched.email && formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email}
                        style={{ marginTop: 20 }}
                      />
                    </div>
                    <div>
                      <Field
                        name="contactNumber"
                        as={TextField}
                        label={window.site_text("pages.register.contact")}
                        variant="outlined"
                        fullWidth
                        error={
                          formik.touched.contactNumber &&
                          formik.errors.contactNumber
                        }
                        helperText={
                          formik.touched.contactNumber &&
                          formik.errors.contactNumber
                        }
                        style={{ marginTop: 20 }}
                      />
                    </div>
                    <div>
                      <Field
                        name="password"
                        type="password"
                        as={TextField}
                        label={window.site_text("pages.register.password")}
                        variant="outlined"
                        fullWidth
                        error={
                          formik.touched.password && formik.errors.password
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        style={{ marginTop: 20 }}
                      />
                    </div>
                    <div>
                      <Field
                        name="confirmPassword"
                        type="password"
                        as={TextField}
                        label={window.site_text(
                          "pages.register.confirm_passowrd"
                        )}
                        variant="outlined"
                        fullWidth
                        error={
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                        }
                        helperText={
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                        }
                        style={{ marginTop: 20 }}
                      />
                    </div>
                    <center>
                      {!formik?.isSubmitting ? (
                        <button
                          className="d-flex justify-content-center mb-4 total-btn  mt-3"
                          type="submit"
                          style={{ padding: 14, width: 230 }}
                        >
                          <div>
                            <img src={icon_activity} alt="" className="mr-2" />
                          </div>
                          <div className="total-title">
                            {window.site_text("pages.register.button")}
                          </div>
                        </button>
                      ) : (
                        <div className="loader"></div>
                      )}
                    </center>
                  </Form>
                )}
              </Formik>
            </center>
          </div>
        </div>
      </main>
    </body>
  );
}
