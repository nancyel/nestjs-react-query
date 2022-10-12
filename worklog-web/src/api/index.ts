import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export interface SuccessResponse<T = any> {
  data: T;
}

export type SuccessResponseWithoutData = Omit<SuccessResponse, "data">;

export interface FailureResponse {
  error: string;
  path: string;
  statusCode: number;
  timestamp: string;
}

const Axios: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

Axios.interceptors.request.use(
  (request) => {
    if (request.headers) {
      request.headers.Authorization = "Bearer token";
    }
    return request;
  },
  (error: AxiosError) => {
    console.log(`[axios request error] ${JSON.stringify(error)}`);
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response: AxiosResponse<SuccessResponse | SuccessResponseWithoutData>) => {
    return response.data;
  },
  (error: AxiosError<FailureResponse>) => {
    return Promise.reject(error.response?.data);
  }
);

export default Axios;
