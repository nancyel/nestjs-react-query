import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useWorklogsQuery, Worklog } from "../features/tasks/queries";
import { renderTimeline } from "./Timeline";
import TaskStatusLegend from "./TaskStatusLegend";
import { parseDate } from "../utils/transform";

export const ArchivePage = () => {
  const onSuccess = () => {
    console.log("success");
  };
  const onError = () => {
    console.log("error");
  };
  const { isLoading, data, isError, error } = useWorklogsQuery(
    onSuccess,
    onError
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }

  const renderWorklog = (worklog: Worklog) => {
    return (
      <div key={worklog._id}>
        <Link to={`/tasks/${worklog._id}`}>
          <h3>{parseDate(worklog.createdAt)}</h3>
        </Link>
        {renderTimeline(worklog.queues)}
      </div>
    );
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      style={{ minHeight: "50vh" }}
    >
      <Grid>
        <Box sx={{ pt: 4, m: 5 }}>
          <Typography variant="h5">Tasks By Priority</Typography>
        </Box>
        <Box sx={{ pt: 1, m: 5 }}>
          <TaskStatusLegend />
        </Box>
        <Box sx={{ pt: 1, m: 5 }}>
          {data &&
            [...data]
              .reverse()
              .map((worklog: Worklog) => renderWorklog(worklog))}
        </Box>
      </Grid>
    </Grid>
  );
};
