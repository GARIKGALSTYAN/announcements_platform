import type { LoginResponse } from "common";

export function saveTokens(args: LoginResponse) {
  localStorage.setItem("access_token", args.access_token);
  localStorage.setItem(
    "access_token_expiry_date",
    args.access_token_expiry_date
  );
  localStorage.setItem("role", args.role);
  localStorage.setItem("refresh_token", args.refresh_token);
}

export function getAccessToken() {
  const access_token = localStorage.getItem("access_token");
  const access_token_expiry_date = localStorage.getItem(
    "access_token_expiry_date"
  );

  if (!access_token_expiry_date || !access_token) {
    return null;
  }

  const expiry_date = new Date(access_token_expiry_date);

  if (Date.now() > expiry_date.getTime()) {
    return null;
  }

  return access_token;
}

export function getRole() {
  const user_role = localStorage.getItem("role");

  if (!user_role) {
    return null;
  }

  return user_role;
}

export function getRefreshToken() {
  const refresh_token = localStorage.getItem("refresh_token");

  if (!refresh_token) {
    return null;
  }
  return refresh_token;
}

export function setAccessToken(
  token: string,
  access_token_expiry_date: string
) {
  localStorage.setItem("access_token", token);
  localStorage.setItem("access_token_expiry_date", access_token_expiry_date);
}
