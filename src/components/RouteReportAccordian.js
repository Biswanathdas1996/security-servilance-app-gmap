import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import MapReport from "./MapReport";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function calculatePercentage(total, currentCount) {
  return (currentCount / total) * 100;
}

export default function CustomizedAccordions({ data, index, routsData }) {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  console.log("--routsData--->", routsData);

  return (
    <div style={{ marginTop: 20 }}>
      <Typography>
        <b style={{ fontSize: 14, color: "#ad0004", fontWeight: 600 }}>
          {routsData?.name}
        </b>
      </Typography>
      <br />
      {data?.map((user, index) => {
        const complitionPercentage = calculatePercentage(
          user?.totalLocationsCount,
          user?.locationsVisited
        );

        return (
          <>
            <div className="list-hldr" style={{ display: "block", padding: 0 }}>
              <div className="mb-2 p-2" style={{ display: "flex" }}>
                <div>
                  {/* <img src="../images/transport.png" alt="" /> */}
                  <AccountCircleIcon
                    style={{ marginRight: 10, fontSize: "2rem" }}
                  />
                </div>
                <div className="desc-hldr">
                  <p>
                    <strong>{user?.name}</strong>
                  </p>
                  <Typography style={{ fontSize: 12, marginTop: 2 }}>
                    <b
                      style={{
                        color:
                          complitionPercentage === 0
                            ? "red"
                            : complitionPercentage < 100
                            ? "orange"
                            : "green",
                      }}
                    >
                      Progress : {parseFloat(complitionPercentage).toFixed(0)}%
                    </b>
                  </Typography>
                </div>
              </div>
              <Accordion
                expanded={expanded === index}
                onChange={handleChange(index)}
                style={{ Zindex: "-1" }}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p>
                    <strong> View more</strong>
                  </p>
                </AccordionSummary>
                <AccordionDetails style={{ padding: 0 }}>
                  <MapReport data={user} routsData={routsData} />
                </AccordionDetails>
              </Accordion>
            </div>
          </>
        );
      })}
    </div>
  );
}
