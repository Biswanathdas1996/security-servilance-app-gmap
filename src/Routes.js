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
import Dashboard from "./Pages/Admin/Dashboard";
import TebleReport from "./Pages/Admin/TebleReport";
import RealTimePCRTracking from "./Pages/Admin/RealTimePCRTracking";
import { AdminLayout, UserLayout, UserHeaderlessLayout } from "./HOC/LayOutHOC";

class Routing extends React.Component {
  render() {
    return (
      <Routes>
        <Route exact path="/" element={UserHeaderlessLayout(LandingPage)} />
        <Route exact path="/home" element={UserHeaderlessLayout(Home)} />
        <Route
          exact
          path="/register"
          element={UserHeaderlessLayout(Register)}
        />

        <Route exact path="/map/:id/:date" element={UserLayout(Map)} />
        <Route exact path="/path" element={UserLayout(VisitedPath)} />
        <Route exact path="/users" element={AdminLayout(ListOfUser)} />
        <Route exact path="/list-of_routs" element={AdminLayout(ListOfRouts)} />
        <Route
          exact
          path="/add-routs/:id"
          element={AdminLayout(AddCircleToRoute)}
        />
        <Route
          exact
          path="/admin/login"
          element={UserHeaderlessLayout(AdminLogin)}
        />
        <Route exact path="/login" element={UserHeaderlessLayout(UserLogin)} />
        <Route exact path="/route-report" element={AdminLayout(RouteReport)} />
        <Route exact path="/dashboard" element={AdminLayout(Dashboard)} />
        <Route
          exact
          path="/status-reports"
          element={AdminLayout(TebleReport)}
        />
        <Route
          exact
          path="/track-pcr-vans"
          element={AdminLayout(RealTimePCRTracking)}
        />

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
