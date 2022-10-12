import Axios from "../../api/index";
import { QueryKey, useQuery, useQueryClient, useMutation } from "react-query";

export type QueueItem = {
  description: string;
  priority: number;
  taskType: string;
  status: "INIT" | "WORKING" | "DONE" | "STUCK" | "PAUSE";
};

export type Worklog = {
  _id: string;
  queues: QueueItem[];
  createdAt: string;
};

export type Worklogs = ReadonlyArray<Worklog>;

const fetchWorklogsWithOptions = async (query: {
  createdAt: string;
  dir: number;
}): Promise<Worklogs> => {
  const response = await Axios.get(
    `/worklogs?limit=2&createdAt=${query.createdAt}&dir=${query.dir}`
  );
  return response.data;
};

const fetchWorklogs = async (): Promise<Worklogs> => {
  return await Axios.get("/worklogs");
};

const fetchWorklog = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}): Promise<Worklog> => {
  const id = queryKey[1];
  return await Axios.get(`/worklogs/${id}`);
};

export const usePaginatedWorklogsQuery = (
  query: { createdAt: string; dir: number },
  onSuccess: () => void,
  onError: () => void
) => {
  return useQuery<Worklogs, Error>(
    ["worklogs-paginate", query],
    () => fetchWorklogsWithOptions(query),
    {
      onSuccess,
      onError,
      keepPreviousData: true,
    }
  );
};

export const useWorklogsQuery = (onSuccess: () => void, onError: () => void) =>
  useQuery<Worklogs, Error>("worklogs", fetchWorklogs, {
    onSuccess,
    onError,
  });

export const useWorklogQuery = (
  worklogId: string,
  onSuccess: () => void,
  onError: () => void
) => {
  const queryClient = useQueryClient();
  return useQuery<Worklog, Error>(["worklog", worklogId], fetchWorklog, {
    retry: 2,
    onSuccess,
    onError,
    initialData: () =>
      queryClient
        .getQueryData<Worklogs>("worklogs")
        ?.find((worklog: Worklog) => worklog._id === worklogId),
  });
};

const addWorklog = async (worklog: Record<string, any>): Promise<any> => {
  try {
    return await Axios.post("/worklogs", worklog);
  } catch (error) {
    console.log(error);
  }
};

const updateWorklog = async ({
  queryKey: id,
  worklog,
}: {
  queryKey: QueryKey;
  worklog: Record<string, any>;
}): Promise<Worklog | null> => {
  try {
    return await Axios.put(`/worklogs/${id}`, worklog);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const useUpdateWorklogQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(updateWorklog, {
    onSuccess: () => {
      // invalidate task query
      queryClient.invalidateQueries("worklog");
    },
  });
};

export const useAddWorklogQuery = () => {
  const queryClient = useQueryClient();
  return useMutation(addWorklog, {
    onSuccess: () => {
      // invalidate task query
      queryClient.invalidateQueries("worklogs");
    },
  });
};
