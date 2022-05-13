import express from "express";
import { Schema } from "jsonschema";
import { UserRole, HTTPMethod } from "../shared";

export interface Req<T1 = any, T2 = any, T3 = any, T4 = any, T5 = any>
  extends express.Request<T1, T2, T3, T4, T5> {}

export interface Res<T = any> extends express.Response<T, RequestUserAuthData> {}

export interface RequestUserAuthData {
  auth: boolean;
  role: UserRole;
  user_id: number;
}

export interface RouteHandlerConfig {
  method: HTTPMethod,
  path: string,
  name?: string,
  access: null | Array<UserRole>,
  validation_schemas: ValidationSchemas,
  handler: (req: Req, res: Res) => Promise<any>,
}

export interface ValidationSchemas {
  body: undefined | Schema,
  params: undefined | Schema,
  query: undefined | Schema,
}
