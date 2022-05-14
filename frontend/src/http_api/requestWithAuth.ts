import axios from "axios";
import type { Method } from "axios";
import { getAccessToken, getRefreshToken, setAccessToken } from "../utils";

const API_URL = import.meta.env.VITE_APP_API_URL;

export interface HTTPRequestArgs {
  path: string;
  method: Method;
  body?: object;
  params?: object;
}

export function tryToRevalidate() {
  const access_token = getAccessToken();

  if (!access_token) {
    const ref_token = getRefreshToken();

    if (!ref_token) {
      throw new Error("Unable to re-validate   in tryToRevalidate");
    }

    axios
      .request({
        method: "POST",
        url: API_URL + "/revalidate",
        data: { refresh_token: ref_token },
      })
      .then((res) => {
        setAccessToken(
          res.data.access_token,
          res.data.access_token_expiry_date
        );
      })
      .catch((error) => {
        console.log("Unable to re-validate.", error);
      });
  }
}

export function requestWithAuth<T>(args: HTTPRequestArgs) {
  tryToRevalidate();

  const access_token = getAccessToken();
  if (!access_token) {
    throw new Error("Unable to re-validate.");
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
    params: args.params,
  });
}
