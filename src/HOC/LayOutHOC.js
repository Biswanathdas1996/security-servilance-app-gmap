import React from "react";
import Header from "../LayOut/Header";
import Footer from "../LayOut/Footer";
import UserBAckScreenHeader from "../LayOut/UserBackHeader";

export function AdminLayout(Body) {
  return (
    <>
      <Header />
      <Body />
    </>
  );
}

export function UserLayout(Body) {
  return (
    <>
      <UserBAckScreenHeader />
      <Body />
      <Footer />
    </>
  );
}

export function UserHeaderlessLayout(Body) {
  return (
    <>
      <Body />
      <Footer />
    </>
  );
}
