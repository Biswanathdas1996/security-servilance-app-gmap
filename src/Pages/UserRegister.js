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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function UserRegister({ faceData }) {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 5 }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Item>
            {" "}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
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
              }}
              style={{ marginTop: 20 }}
            >
              {(formik) => (
                <Form>
                  <div>
                    <Field
                      name="empID"
                      as={TextField}
                      label="emp ID"
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
                      label="Name"
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
                      label="Email"
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
                      label="Contact Number"
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
                      label="Password"
                      variant="outlined"
                      fullWidth
                      error={formik.touched.password && formik.errors.password}
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
                      label="Confirm Password"
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
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ marginTop: 20, padding: 10 }}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
