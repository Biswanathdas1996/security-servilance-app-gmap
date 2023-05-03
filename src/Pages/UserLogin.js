import React from "react";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { post } from "../helper/apiHelper";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import "../css/start.css";

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
      if (response?.status === 200) {
        localStorage.setItem("x-service-token", response?.data?.token);
        // swal("Authenticated!", "Successfully logged in", "success");
        swal("Authenticated!", "Successfully logged in", "success").then(
          (value) => {
            if (returnLink) {
              window.location.href = returnLink;
            } else {
              window.location.href = "#/home";
            }
          }
        );
      } else if (response?.status === 403 || response?.status === 404) {
        swal("Sorry!", response?.message, "warning");
      } else {
        swal("Error!", response?.message, "error");
      }
    }
    console.log("response------->", response);
    setSubmitting(false);
  };

  return (
    <body className="d-flex flex-column h-100">
      <div className="main container">
        <div className="welcome">
          <h6>Welcome To</h6>
        </div>
        <div className="Security">
          <h1>Security Surveillance System</h1>
        </div>
        <div className="lorem">
          <h6>Lorem ipsum doller sit amet, orem ipsum doller sit amet</h6>
        </div>

        <div className="form container px-0" style={{ boxShadow: "none" }}>
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
              <Form>
                <div className="form-group mb-4">
                  <input
                    type="email"
                    name="email"
                    className="form-control icon-input input-email"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    as={TextField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                  />
                  <ErrorMessage name="email" />
                </div>
                <div className="form-group mb-4">
                  <input
                    type="password"
                    className="form-control icon-input input-password"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    as={TextField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    name="password"
                  />
                  <ErrorMessage name="password" />
                </div>

                {!isSubmitting ? (
                  <div
                    className="login-button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    <button type="button" className="btn">
                      <div className="text">
                        <h6>{window.site_text("pages.landing.sign_in")}</h6>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="loader"></div>
                )}
              </Form>
            )}
          </Formik>

          <div className="_container">
            <div className="row form_toggle">
              <div className="col">
                <div className="form-chec form-switch switch">
                  <input className="form-check-input " type="checkbox" />
                  <p className="ml-4">&nbsp;&nbsp;&nbsp; Remember Me</p>
                </div>
              </div>
              <div className="col">
                <p>Forgot Password?</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="register mt-4"
          onClick={() => (window.location.href = "#/register")}
        >
          <p>Not a registered user? </p>
          <p>
            <strong>CLICK HERE</strong> to register
          </p>
        </div>
      </div>
    </body>
  );
};

export default Login;
