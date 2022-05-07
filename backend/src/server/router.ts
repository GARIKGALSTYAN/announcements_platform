import express, {Request, Response} from "express"
import { Validator, ValidatorResult, ValidationError } from 'jsonschema';
import { resolve } from "path";
import { user_route_handlers } from "./service/user";
import { RouteHandlerConfig, ValidationSchemas } from "./types";

var validator = new Validator();





export const router = express.Router();

const all_route_configs: Array<RouteHandlerConfig> = [
  ...user_route_handlers,
]


function validateNetworkInput(request: Request, validation_schemas: ValidationSchemas)
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
  const {
    access,
    handler,
    method,
    path,
    validation_schemas,
  } = route_config;

  console.log(`${method}: ${path}`);

  let hdl = function (req: Request, res: Response) {
    // @ts-ignore
    console.log("hdl call: ", this);
    const {
      access,
      handler,
      method,
      path,
      validation_schemas,
      // @ts-ignore
    } = (this as RouteHandlerConfig)

    try {

      const [has_error, errors] = validateNetworkInput(req, validation_schemas);

      if (has_error) {
        console.log("BIG NOoooo");
        console.log("errors: ", errors);
      } else {
        console.log("Everything is ok");
      }

      handler(req, res);

    } catch (error) {
      // res.end()
    }
  }
  hdl = hdl.bind(route_config);

  router[method](path, hdl);
}
