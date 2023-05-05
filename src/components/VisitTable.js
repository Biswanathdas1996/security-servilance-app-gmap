import React from "react";
import dayjs from "dayjs";
import "../css/dutylist.css";

export default function VisitListTable({ locations, handleOpen }) {
  return (
    <div className="container pb-3">
      <table className="table caption-top red-header">
        <thead>
          <tr>
            <th scope="col">Location</th>
            <th scope="col">Time</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {locations &&
            locations?.map((val) => {
              return (
                <tr
                  className={val?.isVisited ? "active" : ""}
                  key={val?.name + val?.id}
                >
                  <td>{val?.name}</td>
                  <td>
                    {val?.isVisited
                      ? `${dayjs(new Date(val?.visitData?.createdAt)).format(
                          "YYYY-MM-DD hh:mm A"
                        )}`
                      : "Not Visited"}
                  </td>
                  <td>
                    <img
                      src="../images/placeholder.png"
                      alt=""
                      onClick={() => handleOpen && handleOpen(val)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
