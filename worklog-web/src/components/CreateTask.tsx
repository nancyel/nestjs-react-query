import React, { useCallback } from "react";
import toast from "react-hot-toast";

import { QueueItem, useAddWorklogQuery } from "../features/tasks/queries";
import WorklogForm from "./Worklog.form";

interface Values {
  queues: QueueItem[];
}

const CreateTask: React.FC = () => {
  const initialValues: Values = {
    queues: [],
  };

  const { mutate } = useAddWorklogQuery();

  const notifySuccess = useCallback(() => {
    toast.success("New task is created!");
  }, []);

  const notifyError = useCallback(() => {
    toast.error("Please fill in the form!");
  }, []);

  return (
    <WorklogForm
      initialValues={initialValues}
      mutate={mutate}
      notifySuccess={notifySuccess}
      notifyError={notifyError}
    />
  );
};

export default CreateTask;
