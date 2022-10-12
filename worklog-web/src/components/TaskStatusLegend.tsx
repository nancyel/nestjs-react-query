import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Item } from "./Item";

const taskStatusColor = {
  INIT: "#bdbdbd",
  WORKING: "#1976d2",
  DONE: "#2e7d32",
  PAUSE: "#ed6c02",
  STUCK: "#d32f2f",
};

export default function TaskStatusLegend() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Item style={{ backgroundColor: taskStatusColor.INIT }}>INIT</Item>
        </Grid>
        <Grid item xs={2}>
          <Item style={{ backgroundColor: taskStatusColor.WORKING }}>
            WORKING
          </Item>
        </Grid>
        <Grid item xs={2}>
          <Item style={{ backgroundColor: taskStatusColor.DONE }}>DONE</Item>
        </Grid>
        <Grid item xs={2}>
          <Item style={{ backgroundColor: taskStatusColor.STUCK }}>STUCK</Item>
        </Grid>
        <Grid item xs={2}>
          <Item style={{ backgroundColor: taskStatusColor.PAUSE }}>PAUSE</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
