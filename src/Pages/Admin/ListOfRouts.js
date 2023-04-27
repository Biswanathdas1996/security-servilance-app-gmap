import * as React from "react";
import { get } from "../../helper/apiHelper";
import ListOfRoutsView from "../../View/Admin/ListOfRouts";
import { validateResponseAdmin } from "../../function/validateResponse";

export default function ListOfRouts() {
  const [open, setOpen] = React.useState(false);
  const [selectedRouteForAssign, setSelectedRouteForAssign] =
    React.useState(null);
  const [openUserModal, setOpenUserModal] = React.useState(false);
  const [routsData, setRoutsData] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchAllRouts = async () => {
    const response = await get("/admin/route?search=&page&limit");
    if (validateResponseAdmin(response)) {
      setRoutsData(response?.data?.rows);
    }
  };

  React.useEffect(() => {
    fetchAllRouts();
  }, []);

  const assignUser = (id) => {
    setOpenUserModal(true);
    setSelectedRouteForAssign(id);
  };
  return (
    <ListOfRoutsView
      open={open}
      handleClose={handleClose}
      openUserModal={openUserModal}
      setOpenUserModal={setOpenUserModal}
      selectedRouteForAssign={selectedRouteForAssign}
      handleOpen={handleOpen}
      routsData={routsData}
      assignUser={assignUser}
    />
  );
}
