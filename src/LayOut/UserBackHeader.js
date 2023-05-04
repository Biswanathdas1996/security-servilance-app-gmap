import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function DenseAppBar() {
  return (
    <>
      <div className="bg-default" style={{ zIndex: 0 }}></div>

      <div className="container profile-dtl" style={{ zIndex: 1 }}>
        <div className="row">
          <div className="col-2">
            <div className="img-hldr">
              <img src="../images/img_profile.png" alt="" />
            </div>
          </div>
          <div className="col-8">
            <div className="desc-hldr">
              <h2>
                Hello, <strong>Aronna Chowdhury</strong>
              </h2>
              <p>Sub Inspector</p>
            </div>
          </div>
          <div className="col-2">
            <img src="../images/icon_more.svg" alt="More" />
          </div>
        </div>
      </div>
    </>
  );
}
