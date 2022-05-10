import { UserRole, HTTPMethod } from "../../shared";
import { Req, Res, RouteHandlerConfig } from "../types";
import { StorageAPI } from "../../storage";
import {
  ICity,
  CreateCityRequest,
  IRegion,
  CreateRegionRequest,
  ICategory,
  CreateCategoryRequest,
  ITag,
  CreateTagRequest,
} from "common";


export const admin_route_handlers: Array<RouteHandlerConfig> = [
  {
    name: "Add City",

    access: [UserRole.ADMIN],
    method: HTTPMethod.POST,
    path: '/city',
    validation_schemas: {
      body: {
        "type": "object",
        "properties": {
          "name": {
            "title": "Name",
            "type": "string",
            "minLength": 3,
            "maxLength": 64,
          },
        },
        "required": ["name"],
      },
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<any, any, CreateCityRequest>,
      res: Res<ICity>,
    ) => {
      const { body } = req;

      const city = await StorageAPI.City.create({
        name: body.name,
      })

      res.json(city);
      res.end();
    },
  },

  {
    name: "Add Region",

    access: [UserRole.ADMIN],
    method: HTTPMethod.POST,
    path: '/region',
    validation_schemas: {
      body: {
        "type": "object",
        "properties": {
          "name": {
            "title": "Name",
            "type": "string",
            "minLength": 3,
            "maxLength": 64,
          },
        },
        "required": ["name"],
      },
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<any, any, CreateRegionRequest>,
      res: Res<IRegion>,
    ) => {
      const { body } = req;

      const region = await StorageAPI.Region.create({
        name: body.name,
      })

      res.json(region);
      res.end();
    },
  },

  {
    name: "Add Category",

    access: [UserRole.ADMIN],
    method: HTTPMethod.POST,
    path: '/category',
    validation_schemas: {
      body: {
        "type": "object",
        "properties": {
          "name": {
            "title": "Name",
            "type": "string",
            "minLength": 3,
            "maxLength": 64,
          },
        },
        "required": ["name"],
      },
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<any, any, CreateCategoryRequest>,
      res: Res<ICategory>,
    ) => {
      const { body } = req;

      const category = await StorageAPI.Category.create({
        name: body.name,
      })

      res.json(category);
      res.end();
    },
  },

  {
    name: "Add Tag",

    access: [UserRole.ADMIN],
    method: HTTPMethod.POST,
    path: '/tag',
    validation_schemas: {
      body: {
        "type": "object",
        "properties": {
          "name": {
            "title": "Name",
            "type": "string",
            "minLength": 3,
            "maxLength": 64,
          },
        },
        "required": ["name"],
      },
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<any, any, CreateTagRequest>,
      res: Res<ITag>,
    ) => {
      const { body } = req;

      const tag = await StorageAPI.Tag.create({
        name: body.name,
      })

      res.json(tag);
      res.end();
    },
  },



  {
    name: "Get Tags",

    access: [UserRole.ADMIN, UserRole.USER],
    method: HTTPMethod.GET,
    path: '/tag',
    validation_schemas: {
      body: undefined,
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<any, any, any>,
      res: Res<ITag[]>,
    ) => {
      const tags = await StorageAPI.Tag.getMany({
        ids: undefined,
        name: undefined,
      })

      res.json(tags);
      res.end();
    },
  },
  {
    name: "Get Cities",

    access: [UserRole.ADMIN, UserRole.USER],
    method: HTTPMethod.GET,
    path: '/city',
    validation_schemas: {
      body: undefined,
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<any, any, any>,
      res: Res<ICity[]>,
    ) => {
      const cities = await StorageAPI.City.getMany({
        ids: undefined,
        name: undefined,
      })

      res.json(cities);
      res.end();
    },
  },
  {
    name: "Get categories",

    access: [UserRole.ADMIN, UserRole.USER],
    method: HTTPMethod.GET,
    path: '/category',
    validation_schemas: {
      body: undefined,
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<any, any, any>,
      res: Res<ICategory[]>,
    ) => {
      const categories = await StorageAPI.Category.getMany({
        ids: undefined,
        name: undefined,
      })

      res.json(categories);
      res.end();
    },
  },
  {
    name: "Get regions",

    access: [UserRole.ADMIN, UserRole.USER],
    method: HTTPMethod.GET,
    path: '/region',
    validation_schemas: {
      body: undefined,
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<any, any, any>,
      res: Res<IRegion[]>,
    ) => {
      const regions = await StorageAPI.Region.getMany({
        ids: undefined,
        name: undefined,
      })

      res.json(regions);
      res.end();
    },
  },
];
