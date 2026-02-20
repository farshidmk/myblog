import {
  MutationFunction,
  QueryFunction,
  QueryKey,
} from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { clearStoredSession, getAccessToken } from "./auth-storage";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearStoredSession();
    }
    return Promise.reject(error);
  },
);

export const serverCall: MutationFunction<unknown, unknown> = async (
  variables,
) => {
  const { url, method, data, ...rest } = variables as AxiosRequestConfig;
  try {
    const requestOptions: AxiosRequestConfig = {
      url: `${API_URL}/${url}`,
      method,
      withCredentials: true,
      data,
      ...rest,
    };
    const response = await apiClient({ ...requestOptions });
    if (response?.status === 200 || response?.status === 201) {
      return response?.data;
    } else {
      throw response;
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      // Narrow the type using AxiosError
      if (e.response?.data) {
        throw e.response.data; // Throw only the response part of the error
      }
    }
    throw e; // If the error isn't an Axios error or doesn't have a response, throw the whole error
  }
};

export const getRequest: QueryFunction<unknown, QueryKey, never> = async ({
  queryKey,
}: {
  queryKey: QueryKey;
}) => {
  let tempEntity = "";
  if (Array.isArray(queryKey)) {
    tempEntity = queryKey.join("/");
  }
  tempEntity = String(tempEntity);
  try {
    return await serverCall({ url: tempEntity, method: "get" });
  } catch (error: unknown) {
    throw error;
  }
};
