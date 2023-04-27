import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { post } from "../helper/apiHelper";
import { setCookie } from "../helper/cookies";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.number().required("Required"),
});

const Login = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    const body = {
      email: values?.email,
      password: Number(values?.password),
    };
    const response = post("/auth/loginWithPassword", body);
    if (response) {
      setCookie("session", response?.data?.token);
      document.cookie = `session=${response?.token}; path=/`;
      window.location.replace("#/home");
    }
    console.log("response------->", response);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <div style={{ margin: 20 }}>
          <center>
            <Form>
              <Field
                name="email"
                label="Email"
                variant="outlined"
                as={TextField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                as={TextField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={<ErrorMessage name="password" />}
              />
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Form>
          </center>
        </div>
      )}
    </Formik>
  );
};

export default Login;
