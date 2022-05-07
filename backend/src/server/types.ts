import express, { Request, Response } from "express";
import { UserRole, HTTPMethod } from "../shared";
import { Schema } from "jsonschema";

export interface Req extends Request {
  user: null | RequestUserAuthData
}


export interface RequestUserAuthData {
  role: UserRole;
  user_id: number;
}


export interface Res extends Response {}

export interface RouteHandlerConfig {
  method: HTTPMethod,
  path: string,

  access: null | Array<UserRole>,

  validation_schemas: ValidationSchemas,
  // handler: (args: HandlerArgs<any, any, any>) => Promise<any>,
  // handler: (req: Req, res: Res) => Promise<any>,
  handler: (req: Request, res: Response) => Promise<any>,
}

export interface ValidationSchemas {
  body: undefined | Schema,
  params: undefined | Schema,
  query: undefined | Schema,
}

export interface HandlerArgs<Body = undefined, Params = undefined, Query = undefined> {
  body: Body,
  params: Params,
  query: Query,
  user: null | RequestUserAuthData,
}
