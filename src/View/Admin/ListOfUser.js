import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import OfflinePinIcon from "@mui/icons-material/OfflinePin";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import dayjs from "dayjs";

const ListOfUserView = ({ users, approveUser, updateUserStatus }) => {
  return (
    <>
      {users ? (
        <div class="container">
          {users?.map((user, index) => (
            <div
              class="list-hldr n-route mt-3"
              style={{ justifyContent: "space-between" }}
            >
              <div class="desc-hldr">
                <div>
                  <div class="img-hldr">
                    {/* <img src="../images/icon-profile-circled.svg" alt="" /> */}
                    <img
                      alt="Remy Sharp"
                      src={user?.profileImage}
                      style={{ width: 33, height: 33, borderRadius: "50%" }}
                    />
                  </div>
                  <div class="text-hldr">
                    <p>
                      <strong>{user?.name}</strong>
                    </p>
                    <p> {user?.designation}</p>
                  </div>
                </div>

                <div>
                  <div class="img-hldr">
                    <img src="../images/icon-bookmark-circled.svg" alt="" />
                  </div>
                  <div class="text-hldr">
                    <p>
                      <strong>Created On</strong>
                    </p>
                    <p>
                      {dayjs(new Date(user?.createdAt)).format("YYYY-MM-DD")}
                    </p>
                  </div>
                </div>
              </div>
              <div class="lst-btn-hldr">
                <button
                  type="button"
                  onClick={() => updateUserStatus(user?.id)}
                >
                  {/* {user?.status ? "Deactive" : "Activate"} */}
                  <img src="../images/icon-trash.png" alt="" />
                </button>
                {!user?.isApproved && (
                  <button type="button" onClick={() => approveUser(user?.id)}>
                    <img src="../images/icon-add.png" alt="" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {users?.length === 0 && (
            <b style={{ margin: "2rem", textAlign: "center" }}>No user found</b>
          )}
        </div>
      ) : (
        <center>
          <div className="loader" style={{ margin: "5rem" }}></div>
        </center>
      )}
    </>
  );
};

export default ListOfUserView;
