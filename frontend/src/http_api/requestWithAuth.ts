import axios from "axios";
import type { Method } from "axios";
import { getAccessToken, getRefreshToken, setAccessToken } from "../utils";
import type { RevalidateRequest, RevalidateResult } from "common";

const API_URL = import.meta.env.VITE_APP_API_URL;

export interface HTTPRequestArgs {
  path: string;
  method: Method;
  body?: object;
}



export function tryToRevalidate() {
  const access_token = getAccessToken();

  if (!access_token) {
    const ref_token = getRefreshToken();

    if (!ref_token) {
      throw new Error("Unable to re-validate   in tryToRevalidate");
    }

    console.log("p 2");
    axios.request({
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
        console.log("p 6");
        console.log("Unable to re-validate.", error);
      });

    console.log("p 10");
  }
}

export function requestWithAuth<T>(args: HTTPRequestArgs) {
  console.log("v 1");
  tryToRevalidate();
  console.log("v 2");

  console.log("v 3");
  const access_token = getAccessToken();
  console.log("v 4");
  if (!access_token) {
    console.log("v 5");
    throw new Error("Unable to re-validate.");
  }
  console.log("v 6");
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
