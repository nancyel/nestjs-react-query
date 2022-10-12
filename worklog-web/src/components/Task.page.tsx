import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useHistory, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useWorklogQuery } from "../features/tasks/queries";
import { parseDate } from "../utils/transform";
import EditTask from "./EditTask";
import { Item } from "./Item";

export const TaskPage = () => {
  const history = useHistory();
  const { worklogId } = useParams<{ worklogId: string }>();

  const onSuccess = () => {
    console.log("success");
  };

  const onError = () => {
    toast.error("Couldn't find your task!");
    history.push("/archive");
  };

  const { isLoading, data, isError, error } = useWorklogQuery(
    worklogId,
    onSuccess,
    onError
  );

  const renderTimeline = () => {
    return (
      <>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "50vh" }}
        >
          <Typography variant="h5">
            {data && parseDate(data.createdAt)}
          </Typography>
          <Grid item xs={8}>
            <Item>{data && <EditTask data={data} />}</Item>
          </Grid>
        </Grid>
      </>
    );
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error?.message}</h2>;
  }
  return renderTimeline();
};
