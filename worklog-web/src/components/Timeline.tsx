import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import Chip, { ChipPropsColorOverrides } from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { OverridableStringUnion } from "@mui/types";
import { QueueItem } from "../features/tasks/queries";

const chipColors: {
  [key: string]: OverridableStringUnion<
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning",
    ChipPropsColorOverrides
  >;
} = {
  feature: "primary",
  bugfix: "error",
  refactor: "secondary",
  testing: "info",
  discussion: "warning",
  security: "default",
  docs: "success",
  chore: "default",
  meeting: "warning",
};

const taskStatus: {
  [key: string]: OverridableStringUnion<
    "grey" | "primary" | "secondary" | "error" | "info" | "success" | "warning",
    ChipPropsColorOverrides
  >;
} = {
  INIT: "grey",
  WORKING: "primary",
  DONE: "success",
  PAUSE: "warning",
  STUCK: "error",
};

const renderTimelineItem = (task: QueueItem) => {
  return (
    <TimelineItem key={task.description}>
      <TimelineOppositeContent style={{ flex: 0 }}>
        {task.priority}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color={taskStatus[task.status]} />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle1" component="span">
          {task.description}
        </Typography>
        <Typography>
          <Chip
            label={task.taskType}
            color={chipColors[task.taskType]}
            variant="outlined"
          />
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
};

export const renderTimeline = (queues: QueueItem[]) => {
  return (
    <Timeline>
      {queues.map((task: QueueItem) => renderTimelineItem(task))}
    </Timeline>
  );
};
