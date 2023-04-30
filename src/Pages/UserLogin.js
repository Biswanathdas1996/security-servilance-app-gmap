import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { post } from "../helper/apiHelper";
import MapIcon from "../assets/map.jpg";
import { useLocation } from "react-router-dom";
import icon_activity from "../images/icon_activity.svg";

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
    <body className="d-flex flex-column h-100 overflow-hidden">
      <div className="bg-purple"></div>
      <main className="flex-shrink-0 main-foot-adjust  pt-2">
        <div className="container">
          <div
            style={{
              backgroundColor: "#5d63d1",
              padding: "14rem",
              margin: "-13px",
              paddingTop: "3rem",
              background: `url(${MapIcon})`,
            }}
          >
            <div className="row profile-dtl">
              <div className="col-2"></div>
            </div>
          </div>

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
              <div
                style={{ margin: 31, border: "1px solid #5d63d1", padding: 20 }}
              >
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
                    <div
                      className="d-flex justify-content-center mb-1 total-btn  mt-1"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      style={{ padding: 8 }}
                    >
                      <div>
                        <img src={icon_activity} alt="" className="mr-2" />
                      </div>
                      <div className="total-title">
                        {window.site_text("pages.landing.sign_in")}
                      </div>
                      {/* <div>Total: 04 Routes</div> */}
                    </div>
                  </Form>
                </center>
              </div>
            )}
          </Formik>
        </div>
      </main>
    </body>
  );
};

export default Login;
