import { Box } from "@mui/material";
import React from "react";

export const RouteDivider = () => (
  <Box sx={{ height: "18px", width: "3px", backgroundColor: "#D0D5DD" }} />
);

export const StatusDot = ({ color, mt, ml }) => (
  <Box
    sx={{
      height: "8px",
      width: "8px",
      borderRadius: "50%",
      mr: 0.7,
      backgroundColor: color,
      mt: `${mt !== undefined ? mt + "px" : ""}`,
      ml: `${ml !== undefined ? ml + "px" : ""}`,
    }}
  />
);
