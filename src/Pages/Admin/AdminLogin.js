import * as React from "react";
import { post } from "../../helper/apiHelper";
import { setCookie } from "../../helper/cookies";
import { useLocation } from "react-router-dom";
import AdminLoginView from "../../View/Admin/AdminLogin";

export default function AdminLogin() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const returnLink = searchParams?.get("return");

  const handleSubmit = async (values, { setSubmitting }) => {
    const body = { ...values, password: parseInt(values?.password) };

    const response = await post("/auth/loginWithPassword", body);
    // console.log("session", response?.data?.token);
    localStorage.setItem("x-service-token", response?.data?.token);
    // return;
    // document.cookie = `session=${response?.token}; path=/`;
    setTimeout(() => {
      if (returnLink) {
        window.location.href = returnLink;
      } else {
        window.location.href = "#/users";
      }
    }, 2000);
  };

  return <AdminLoginView handleSubmit={handleSubmit} />;
}
