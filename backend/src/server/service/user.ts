import { UserRole, HTTPMethod } from "../../shared";
import { Req, Res, RouteHandlerConfig, HandlerArgs } from "../types";
import express, { Request, Response } from "express";
import { Schema } from "jsonschema";

export const user_route_handlers: Array<RouteHandlerConfig> = [
  {
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
    // handler: async (args: HandlerArgs<UserCreateBody>) => {
    //   const { body } = args;
    //   console.log("user create post request body: ", body);
    // },
    handler: async (req: Request, res: Response) => {
      // const { body } = args;
      console.log("user create post request body: ", req.body);
      res.end();
    },
  },
];

interface UserCreateBody {
  email: string,
  last_name: string,
  name: string,
  password: string,
  phone_number: undefined | string,
}
