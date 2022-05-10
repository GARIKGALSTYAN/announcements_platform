import axios from "axios";
import type { Method } from "axios";
import type { IAnnouncement22222 } from "common";

const API_URL = import.meta.env.VITE_APP_API_URL;

export interface RequestWithAuthArgs {
  path: string;
  metod: Method;
  body?: unknown;
}

export function requestWithAuth(args: RequestWithAuthArgs) {

  const a: IAnnouncement22222 = {
    city: "",
    description: "",
    id: 4,
    price: 54,
    region: "dwedw",
  };
  console.log('aaaaaaaaaaaaaa: ', a);

  console.log("requestWithAuth API_URL: ", API_URL);

  const access_token = localStorage.getItem("access_token");

  console.log("requestWithAuth access_token: ", access_token);

  if (!access_token) {
    // maybe re-request acc token with ref token :D
    throw new Error("wut ?");
  }

  return axios.request({
    method: args.metod,
    url: API_URL + args.path,
    data: args.body,
    headers: {
      access_token,
    },
  });
}