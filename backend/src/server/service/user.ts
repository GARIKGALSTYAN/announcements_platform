import { UserRole, HTTPMethod } from "../../shared";
import { Req, Res, RouteHandlerConfig } from "../types";
import { StorageAPI } from "../../storage";
import { generatePasswordHash } from "../../shared/utils";
import { app_environment_variables } from "../../env.config";


export const user_route_handlers: Array<RouteHandlerConfig> = [
  {
    name: "USER CREATE/REGISTRATION",

    access: [UserRole.ADMIN, UserRole.USER],
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
    name: "USER LOGIN",

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
      try {
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
        });
        res.end();
      } catch (error) {
        res.status(400);
        res.statusMessage = "Can't login";
        res.end();
      }
    },
  }
];

interface IUserCreateBody {
  email: string,
  last_name: string,
  name: string,
  password: string,
  phone_number: undefined | string,
}

interface IUserLoginBody {
  email: string,
  password: string,
}

