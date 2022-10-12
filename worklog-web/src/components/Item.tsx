import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));