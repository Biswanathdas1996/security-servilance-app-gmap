import * as React from "react";
import swal from "sweetalert";
import { get, put } from "../../helper/apiHelper";
import { validateResponseAdmin } from "../../helper/validateResponse";
import ListOfUserView from "../../View/Admin/ListOfUser";

export default function ListOfUser() {
  const [users, setUsers] = React.useState(null);

  const fetchUserList = async () => {
    const response = await get("/admin/user?search=&page&limit");
    if (validateResponseAdmin(response)) {
      setUsers(response?.data?.rows);
    }
  };

  const approveUser = async (userId) => {
    const response = await put("/admin/user/approve", { userId });
    if (validateResponseAdmin(response)) {
      swal("Success!", "user approved successfully!", "success").then(
        (value) => {
          fetchUserList();
        }
      );
    }
  };

  const updateUserStatus = async (userId) => {
    const response = await put("/admin/user/toggleUserStatus", { userId });
    if (validateResponseAdmin(response)) {
      console.log(response);
      swal("Success!", "User status successfully changed!", "success").then(
        (value) => {
          fetchUserList();
        }
      );
    }
  };

  React.useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <>
      <ListOfUserView
        users={users}
        approveUser={approveUser}
        updateUserStatus={updateUserStatus}
      />
    </>
  );
}
