import { app_environment_variables } from "../../env.config";
import { UserRole, HTTPMethod } from "../../shared";
import { Req, Res, RouteHandlerConfig } from "../types";
import { StorageAPI } from "../../storage";
import { generatePasswordHash } from "../../utils";
import {
  RevalidateRequest,
  RevalidateResult,
  IUserCreateBody,
  IUserLoginBody,
} from "common";


export const user_route_handlers: Array<RouteHandlerConfig> = [
  {
    name: "User registration",
    access: null,
    method: HTTPMethod.POST,
    path: '/user',
    validation_schemas: {
      body: {
        "type": "object",
        "properties": {
          "email": {
            "title": "Email",
            "type": "string",
            "pattern": "^\\S+@\\S+\\.\\S+$",
            "format": "email",
            "minLength": 6,
            "maxLength": 124,
          },
          "last_name": {
            "title": "Last name",
            "type": "string",
            "minLength": 3,
            "maxLength": 64,
          },
          "name": {
            "title": "Name",
            "type": "string",
            "minLength": 3,
            "maxLength": 64,
          },
          "password": {
            "title": "Password",
            "type": "string",
            "minLength": 3,
            "maxLength": 64,
          },
          "phone_number": {
            "title": "Phone number",
            "type": "string",
            "minLength": 3,
            "maxLength": 32,
          },
        },
        "required": ["email", "last_name", "name", "password"],
      },
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<any, any, IUserCreateBody>,
      res: Res,
    ) => {
      const { body } = req;

      const password_hash = generatePasswordHash(body.password);

      const user = await StorageAPI.Users.create({
        email: body.email,
        last_name: body.last_name,
        name: body.name,
        password: password_hash,
        phone_number: body.phone_number || null,
        role: UserRole.USER,
        is_verified: false,
      });

      res.json(user);
      res.end();
    },
  },
  {
    name: "User login",
    access: null,
    method: HTTPMethod.POST,
    path: '/user/login',
    validation_schemas: {
      body: {
        "type": "object",
        "properties": {
          "email": {
            "title": "Email",
            "type": "string",
            "pattern": "^\\S+@\\S+\\.\\S+$",
            "format": "email",
            "minLength": 6,
            "maxLength": 124,
          },
          "password": {
            "title": "Password",
            "type": "string",
            "minLength": 3,
            "maxLength": 64,
          },
        },
        "required": ["email", "password"],
      },
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<any, any, IUserLoginBody, any, any>,
      res: Res,
    ) => {
      const { body } = req;

      const password_hash = generatePasswordHash(body.password);

      const user = await StorageAPI.Users.userLogin({
        email: body.email,
        password: password_hash,
      });

      if (user === null) {
        throw new Error("Invalid credentials");
      }

      const user_refresh_token = await StorageAPI.RefreshTokens.create({
        user_id: user.id,
      });

      const user_access_token = await StorageAPI.AccessTokens.create({
        user_id: user.id,
        refresh_token_id: user_refresh_token.id,
        expiry_date: new Date(Date.now() + app_environment_variables.server.access_token_expiration_time_ms),
      });

      res.json({
        refresh_token: user_refresh_token.value,
        access_token: user_access_token.value,
        access_token_expiry_date: user_access_token.expiry_date,
        role: user.role,
      });
      res.end();
    },
  },

  {
    name: "Get new access token",
    access: null,
    method: HTTPMethod.POST,
    path: '/revalidate',
    validation_schemas: {
      body: {
        "type": "object",
        "properties": {
          "refresh_token": {
            "title": "Refresh token",
            "type": "string",
          }
        },
        "required": ["refresh_token"],
      },
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<any, any, RevalidateRequest, any, any>,
      res: Res<RevalidateResult>,
    ) => {
      const { body } = req;

      const refresh_tokens = await StorageAPI.RefreshTokens.getMany({
        token: body.refresh_token,
        id: undefined,
        user_id: undefined,
      });

      const refresh_token = refresh_tokens[0];

      if (refresh_token === undefined) {
        throw new Error("Credentials are invalid");
      }

      const new_access_token = await StorageAPI.AccessTokens.create({
        user_id: refresh_token.user_id,
        refresh_token_id: refresh_token.id,
        expiry_date: new Date(Date.now() + app_environment_variables.server.access_token_expiration_time_ms),
      });

      res.json({
        access_token: new_access_token.value,
        access_token_expiry_date: new_access_token.expiry_date.toString(),
      });
      res.end();
    },
  }

];
