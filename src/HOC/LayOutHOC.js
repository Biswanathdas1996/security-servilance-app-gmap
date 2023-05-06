import React from "react";
import Header from "../LayOut/Header";
import Footer from "../LayOut/Footer";
import UserBAckScreenHeader from "../LayOut/UserBackHeader";

export function AdminLayout(Body) {
  return (
    <>
      <body className="d-flex flex-column h-100">
        <div
          className="bg-default"
          style={{ zIndex: 0, height: "10.5rem" }}
        ></div>
        <main className="flex-shrink-0 main-foot-adjust" style={{ zIndex: 1 }}>
          <div className="container pt-5">
            <Header />
            <Body />
          </div>
        </main>
      </body>
    </>
  );
}

export function UserLayout(Body) {
  return (
    <>
      <UserBAckScreenHeader />
      <Body />
      {/* <Footer /> */}
    </>
  );
}

export function UserHeaderlessLayout(Body) {
  return (
    <>
      <Body />
      {/* <Footer /> */}
    </>
  );
}
