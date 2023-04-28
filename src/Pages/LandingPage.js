import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function App() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
    >
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: 10, padding: 15 }}
        onClick={() => (window.location.href = "/#/login")}
      >
        Sign in
      </Button>
      <Button
        variant="contained"
        color="warning"
        style={{ padding: 15 }}
        onClick={() => (window.location.href = "/#/register")}
      >
        Register
      </Button>
    </Box>
  );
}

export default App;
