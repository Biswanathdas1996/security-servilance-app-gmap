import * as React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminImg from "../images/img_profile.png";

import MenuDrawer from "../LayOut/MenuDrawer";

function ResponsiveAppBar() {
  return (
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
        <MenuDrawer style={{ fontSize: "1.6rem", color: "white" }} />
        {/* <LogoutIcon
        style={{ fontSize: "1.6rem", color: "white" }}
        onClick={() => window.location.replace("#/admin/login")}
      /> */}
        {/* <img src="../images/icon_more.svg" alt="More" /> */}
      </div>
    </div>
  );
}
export default ResponsiveAppBar;
