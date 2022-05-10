import axios from "axios";
import type { Method } from "axios";
import { getAccessToken } from "../utils";

const API_URL = import.meta.env.VITE_APP_API_URL;

export interface HTTPRequestArgs {
  path: string;
  method: Method;
  body?: object;
}

export function requestWithAuth<T>(args: HTTPRequestArgs) {
  const access_token = getAccessToken();

  if (!access_token) {
    throw new Error("Re-validation is not implemented");
  }

  return axios.request<T>({
    method: args.method,
    url: API_URL + args.path,
    data: args.body,
    headers: {
      access_token,
    },
  });
}

export function request<T>(args: HTTPRequestArgs) {
  return axios.request<T>({
    method: args.method,
    url: API_URL + args.path,
    data: args.body,
  });
}
