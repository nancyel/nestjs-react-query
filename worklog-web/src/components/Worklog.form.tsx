import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import {
  Field,
  FieldArray,
  FieldInputProps,
  Form,
  Formik,
  useField,
} from "formik";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";

import { QueueItem } from "../features/tasks/queries";

const taskTypes = [
  "feature",
  "chore",
  "bugfix",
  "docs",
  "refactor",
  "testing",
  "discussion",
  "security",
  "meeting",
];

const taskStatus = ["INIT", "WORKING", "DONE", "STUCK", "PAUSE"];

const validationSchema = yup.object({
  queues: yup.array().of(
    yup
      .object()
      .shape({
        description: yup.string().required("description is required"),
        priority: yup.number().required("priority is required"),
        taskType: yup
          .string()
          .oneOf(taskTypes)
          .required("taskType is required"),
      })
      .required("queues are required")
  ),
});

interface Values {
  queues: QueueItem[];
}

interface InputProps {
  label: string;
  name: string;
  style?: any;
  type?: string;
}

const MyTextInput: React.FC<InputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box sx={{ pt: 2 }}>
      <TextField fullWidth {...field} {...props} label={label} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </Box>
  );
};

interface SelectProps {
  children: React.ReactNode;
  form: any;
  field: FieldInputProps<any>;
}

const CustomizedSelectForFormik: React.FC<SelectProps> = ({
  children,
  form,
  field,
}) => {
  const { name, value } = field;
  const { setFieldValue } = form;
  return (
    <Select
      name={name}
      value={value}
      onChange={(e) => {
        setFieldValue(name, e.target.value);
      }}
    >
      {children}
    </Select>
  );
};

const SelectTaskType: React.FC<InputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box sx={{ pt: 2, pb: 2 }}>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="simple-select-label">{label}</InputLabel>
        <Field name={props.name} component={CustomizedSelectForFormik}>
          {taskTypes.map((type: string) => (
            <MenuItem key={type} value={type}>
              {type.toUpperCase()}
            </MenuItem>
          ))}
        </Field>
      </FormControl>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </Box>
  );
};

const SelectTaskStatus: React.FC<InputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box sx={{ pt: 2, pb: 2 }}>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="simple-select-label">{label}</InputLabel>
        <Field name={props.name} component={CustomizedSelectForFormik}>
          {taskStatus.map((status: string) => (
            <MenuItem key={status} value={status}>
              {status.toUpperCase()}
            </MenuItem>
          ))}
        </Field>
      </FormControl>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </Box>
  );
};

type WorklogFormProps = {
  initialValues: Values;
  mutate: any;
  notifySuccess: () => void;
  notifyError: () => void;
};

const WorklogForm: React.FC<WorklogFormProps> = ({
  initialValues,
  mutate,
  notifySuccess,
  notifyError,
}) => {
  const history = useHistory();

  const { worklogId } = useParams<{ worklogId: string }>();

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values: Values, { resetForm }) => {
          if (values.queues.length) {
            if (worklogId) {
              mutate({ queryKey: worklogId, worklog: values });
            } else {
              mutate(values);
            }
            resetForm();
            notifySuccess();
          } else {
            notifyError();
          }
          history.push("/archive");
        }}
      >
        {({ values, isSubmitting }) => (
          <Form style={{ minWidth: "500px" }}>
            <Box sx={{ p: 1 }}>
              <FieldArray
                name="queues"
                render={({ insert, remove, push }) => (
                  <Box sx={{ width: "100%" }}>
                    <Stack>
                      <Button
                        color="inherit"
                        variant="outlined"
                        onClick={() =>
                          push({
                            description: "",
                            priority: "",
                            taskType: "FEATURE",
                            status: "INIT",
                          })
                        }
                      >
                        Add new tasks
                      </Button>
                      <Box sx={{ pt: 1 }}>
                        {values.queues.length > 0 &&
                          values.queues.map((queue, index) => (
                            <div key={index}>
                              <MyTextInput
                                name={`queues.${index}.description`}
                                label="description"
                              />
                              <Box>
                                <Box>
                                  <MyTextInput
                                    name={`queues.${index}.priority`}
                                    label="priority"
                                    type="number"
                                  />
                                </Box>
                                <Box>
                                  <SelectTaskType
                                    name={`queues.${index}.taskType`}
                                    label="task type"
                                  />
                                </Box>
                                <Box>
                                  <SelectTaskStatus
                                    name={`queues.${index}.status`}
                                    label="task status"
                                  />
                                </Box>
                              </Box>

                              <Button
                                color="error"
                                variant="contained"
                                onClick={() => remove(index)}
                                style={{ width: "100%" }}
                              >
                                X
                              </Button>
                            </div>
                          ))}
                      </Box>
                    </Stack>
                  </Box>
                )}
              />
              <Divider style={{ padding: 5 }} />
              <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default WorklogForm;
