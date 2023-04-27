import React from "react";
import Map from "../components/Map";
import MapWrappedComponent from "../HOC/Map";

function Home() {
  return MapWrappedComponent(Map);
}

export default Home;
