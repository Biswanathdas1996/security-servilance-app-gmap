import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { get, post } from "../../helper/apiHelper";
import { validateResponseAdmin } from "../../helper/validateResponse";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import RouteReportAccordian from "../../components/RouteReportAccordian";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminImg from "../../images/img_profile.png";
import FilterDrawer from "../../components/FilterDrawer";

const MyForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [routsData, setRoutsData] = React.useState(null);
  const [value, setValue] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [searchRoutsData, setSearchRoutsData] = React.useState(null);
  const [loadding, setLoadding] = React.useState(false);

  const fetchUserList = async () => {
    const response = await get("/admin/user?search=&page&limit=1000");
    if (validateResponseAdmin(response)) {
      setUsers(response?.data?.rows);
    }
  };

  React.useEffect(() => {
    fetchUserList();
  }, []);

  const fetchAllRouts = async () => {
    const response = await get("/admin/route?search=&page&limit");
    if (validateResponseAdmin(response)) {
      setRoutsData(response?.data?.rows);
    }
  };

  React.useEffect(() => {
    fetchAllRouts();
    search();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const search = async () => {
    setLoadding(true);
    const response = await get(
      `/admin/route/getRoutesStatus?${
        selectedOption && `routeId=${selectedOption}`
      }&${value?.id && `userId=${value?.id}`}&${
        selectedDate && `date=${selectedDate}`
      }`
    );

    if (validateResponseAdmin(response)) {
      setSearchRoutsData(response?.data);
      setLoadding(false);
    } else {
      setLoadding(false);
    }
  };
  const filter = createFilterOptions();
  return (
    <>
      <body className="d-flex flex-column h-100">
        <div
          className="bg-default"
          style={{ zIndex: 0, height: "10.5rem" }}
        ></div>

        <main className="flex-shrink-0 main-foot-adjust" style={{ zIndex: 1 }}>
          <div className="container pt-5">
            <div className="row profile-dtl">
              <div className="col-2">
                <div className="img-hldr">
                  <img
                    src={AdminImg}
                    alt=""
                    height={50}
                    width={50}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </div>
              <div className="col-8">
                <div className="desc-hldr">
                  <h2>
                    <strong>Admin Portal</strong>
                  </h2>
                  <p>Superintendent of police</p>
                </div>
              </div>
              <div className="col-2">
                <LogoutIcon
                  style={{ fontSize: "1.6rem", color: "white" }}
                  onClick={() => window.location.replace("#/admin/login")}
                />
                {/* <img src="../images/icon_more.svg" alt="More" /> */}
              </div>
            </div>

            <div
              className="container mb-2 p-0"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <b style={{ marginTop: "1.5rem", fontSize: "1.2rem" }}>
                Route Report
              </b>
              <FilterDrawer
                selectedOption={selectedOption}
                handleOptionChange={handleOptionChange}
                routsData={routsData}
                users={users}
                value={value}
                setValue={setValue}
                filter={filter}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                search={search}
              />
            </div>

            {!loadding ? (
              <Grid container spacing={1}>
                <Grid item xs={12} style={{ padding: 10 }}>
                  {searchRoutsData &&
                    searchRoutsData?.map((data, index) => {
                      return (
                        <RouteReportAccordian
                          data={data?.data}
                          index={index}
                          routsData={data?.route}
                        />
                      );
                    })}
                </Grid>
              </Grid>
            ) : (
              <center>
                <div className="loader" style={{ marginTop: "4rem" }}></div>
              </center>
            )}
            {searchRoutsData?.length === 0 && (
              <div className="desc-hldr">
                <p>No data found</p>
              </div>
            )}
          </div>
        </main>
      </body>
    </>
  );
};

export default MyForm;
