import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Map from "./Pages/Map";
import VisitedPath from "./Pages/VisitedPath";
import AddCircleToRoute from "./Pages/Admin/AddCircleToRoute";
import ListOfRouts from "./Pages/Admin/ListOfRouts";
import ListOfUser from "./Pages/Admin/ListOfUser";
import AdminLogin from "./Pages/Admin/AdminLogin";
import UserLogin from "./Pages/UserLogin";
import LandingPage from "./Pages/LandingPage";
import RouteReport from "./Pages/Admin/RouteReport";

class Routing extends React.Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/register" element={<Register />} />

        <Route exact path="/map/:id" element={<Map />} />
        <Route exact path="/path" element={<VisitedPath />} />
        <Route exact path="/users" element={<ListOfUser />} />
        <Route exact path="/list-of_routs" element={<ListOfRouts />} />
        <Route exact path="/add-routs/:id" element={<AddCircleToRoute />} />
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/login" element={<UserLogin />} />
        <Route exact path="/route-report" element={<RouteReport />} />

        <Route
          render={function () {
            return <h1>Not Found</h1>;
          }}
        />
      </Routes>
    );
  }
}

export default Routing;
