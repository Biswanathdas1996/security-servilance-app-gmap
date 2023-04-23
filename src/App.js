import React, { useRef, useEffect } from "react";
import "./App.css";
import Router from "./Routes";
import Header from "./LayOut/Header";

function App() {
  return (
    <>
      <Header />
      <Router />
    </>
  );
}

export default App;
