import express from "express"
import { Validator, ValidationError } from 'jsonschema';
import { RouteHandlerConfig, ValidationSchemas, Req, Res } from "./types";
import { user_route_handlers } from "./service/user";
import { announcement_route_handlers } from "./service/announcement";

var validator = new Validator();

export const router = express.Router();

const all_route_configs: Array<RouteHandlerConfig> = [
  ...user_route_handlers,
  ...announcement_route_handlers,
]

function validateNetworkInput(request: Req, validation_schemas: ValidationSchemas)
: [boolean, Array<ValidationError>] {
  const errors: ValidationError[] = [];

  if (validation_schemas.body !== undefined) {
    const result = validator.validate(request.body, validation_schemas.body);
    errors.push(...result.errors);
  }

  if (validation_schemas.params !== undefined) {
    const result = validator.validate(request.params, validation_schemas.params);
    errors.push(...result.errors);
  }

  if (validation_schemas.query !== undefined) {
    const result = validator.validate(request.query, validation_schemas.query);
    errors.push(...result.errors);
  }

  return [Boolean(errors.length), errors];
}

for(const route_config of all_route_configs) {
  const { name, method, path } = route_config;
  console.log(`> ${method}: ${path} ( ${name} )`);

  let handler_wrapper = async function (req: Req, res: Res) {
    const {
      access,
      handler,
      validation_schemas,
      // @ts-ignore
    } = (this as RouteHandlerConfig)

    let error_message: string = "Unknown error";

    try {

      let has_access = true;
      let has_validation_errors = false;
      let errors: ValidationError[] = []

      if (access !== null && access.length) {
        const requester_role = res.locals.role;
        has_access = access.includes(requester_role);
      }

      [has_validation_errors, errors] = validateNetworkInput(req, validation_schemas);

      console.log("irer: ", errors);
      //           error

      if (has_access === true && has_validation_errors === false) {
        await handler(req, res);
      } else {
        if (has_access === false) { throw new Error("No access to endpoint") }
        if (has_validation_errors === true) { throw new Error("Invalid input") }
      }

    } catch (error) {
      if (error && typeof error === "object" && error.hasOwnProperty("message")) {
        // @ts-ignore
        error_message = error.message;
      } else {
        error_message = "Some error occurred";
      }

      res.status(400)
      res.json({
        error_message,
      });
    }
  }
  handler_wrapper = handler_wrapper.bind(route_config);

  router[method](path, handler_wrapper);
}
