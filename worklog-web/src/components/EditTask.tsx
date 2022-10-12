import React, { useCallback } from "react";
import toast from "react-hot-toast";

import { useUpdateWorklogQuery, Worklog } from "../features/tasks/queries";
import WorklogForm from "./Worklog.form";

const EditTask: React.FC<{ data: Worklog }> = ({ data }) => {
  const { mutate } = useUpdateWorklogQuery();

  const notifySuccess = useCallback(() => {
    toast.success("Task is updated!");
  }, []);

  const notifyError = useCallback(() => {
    toast.error("Please fill in the form!");
  }, []);

  return (
    <WorklogForm
      initialValues={data}
      mutate={mutate}
      notifySuccess={notifySuccess}
      notifyError={notifyError}
    />
  );
};

export default EditTask;
