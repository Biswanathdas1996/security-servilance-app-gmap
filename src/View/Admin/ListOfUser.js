import * as React from "react";
import Badge from "@mui/material/Badge";

const ListOfUserView = ({ users, approveUser, updateUserStatus }) => {
  console.log("---->users", users);
  return (
    <>
      {users ? (
        <div className="container">
          {users?.map((user, index) => (
            <div
              className="list-hldr n-route mt-3"
              style={{ justifyContent: "space-between" }}
              key={index + user?.id}
            >
              <div className="desc-hldr">
                <div>
                  <div className="img-hldr">
                    {/* <img src="../images/icon-profile-circled.svg" alt="" /> */}
                    <img
                      alt="Remy Sharp"
                      src={user?.profileImage}
                      style={{ width: 33, height: 33, borderRadius: "50%" }}
                    />
                  </div>
                  <div className="text-hldr">
                    <p>
                      <strong style={{ color: "#ad0004" }}>{user?.name}</strong>
                    </p>

                    <p>
                      {" "}
                      {user?.roles[0]?.name === "Admin"
                        ? "Administrator"
                        : user?.designation?.name}
                    </p>
                  </div>
                </div>

                {user?.policeStation && (
                  <div>
                    <div className="img-hldr">
                      <img src="../images/icon-bookmark-circled.svg" alt="" />
                    </div>
                    <div className="text-hldr">
                      <p>
                        <strong style={{ color: "#ad0004" }}>
                          Police Station
                        </strong>
                      </p>
                      <p>{user?.policeStation?.name}</p>
                    </div>
                  </div>
                )}
                <div>
                  <div className="img-hldr">
                    <img src="../images/icon-profile-circled.svg" alt="" />
                  </div>
                  <div className="text-hldr">
                    <p>
                      <strong style={{ color: "#ad0004" }}>
                        Contact Number
                      </strong>
                    </p>
                    <p>{user?.contactNumber}</p>
                  </div>
                </div>
              </div>
              <div className="lst-btn-hldr">
                {!user?.isApproved ? (
                  <button type="button" onClick={() => approveUser(user?.id)}>
                    <img src="../images/icon-add.png" alt="" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => updateUserStatus(user?.id)}
                  >
                    {/* {user?.status ? "Deactive" : "Activate"} */}
                    <img
                      src={
                        !user?.status
                          ? "../images/lock.png"
                          : "../images/unlock.png"
                      }
                      alt=""
                      height="28"
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
          <br />
          {users?.length === 0 && (
            <b style={{ textAlign: "center" }}>No user found</b>
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
