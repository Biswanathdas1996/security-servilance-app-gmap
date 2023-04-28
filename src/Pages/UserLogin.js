import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { post } from "../helper/apiHelper";
import { setCookie } from "../helper/cookies";
import { useLocation } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.number().required("Required"),
});

const Login = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const returnLink = searchParams?.get("return");

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    const body = {
      email: values?.email,
      password: Number(values?.password),
    };
    const response = await post("/auth/loginWithPassword", body);
    if (response) {
      console.log("--->response", response);
      localStorage.setItem("x-service-token", response?.data?.token);
      setTimeout(() => {
        if (returnLink) {
          window.location.href = returnLink;
        } else {
          window.location.href = "#/home";
        }
      }, 2000);
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
        <div style={{ margin: 31, border: "1px solid orange", padding: 20 }}>
          <center>
            <h1>Sign in</h1>
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
              <br />
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
                style={{ padding: 10 }}
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
