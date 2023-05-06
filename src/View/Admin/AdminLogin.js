import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.number().required("Required"),
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AdminLoginView = ({ handleSubmit, loading }) => {
  return (
    <Box sx={{ flexGrow: 1 }} style={{ marginTop: 20 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ margin: 31, border: "1px solid #ad0004", padding: 20 }}>
            <center>
              <h1>Admin Sign in</h1>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <Field
                      name="email"
                      type="email"
                      as={TextField}
                      label="Email"
                      variant="outlined"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      style={{ marginTop: 20 }}
                    />
                    <br />

                    <Field
                      name="password"
                      type="password"
                      as={TextField}
                      label="Password"
                      variant="outlined"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      style={{ marginTop: 20 }}
                    />
                    <br />

                    <div className="login-button" style={{ marginTop: "2rem" }}>
                      <button className="btn" type="submit">
                        <div className="text">
                          <h6>{loading ? "Authenticating.." : "Login"}</h6>
                        </div>
                      </button>
                    </div>

                    {errors.submit && <div>{errors.submit}</div>}
                  </Form>
                )}
              </Formik>
            </center>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminLoginView;
