import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Item } from "./Item";
import CreateTask from "./CreateTask";

export const HomePage = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "50vh" }}
    >
      <Typography variant="h3">Get Things Done</Typography>
      <Grid item xs={8}>
        <Item>
          <CreateTask />
        </Item>
      </Grid>
    </Grid>
  );
};
