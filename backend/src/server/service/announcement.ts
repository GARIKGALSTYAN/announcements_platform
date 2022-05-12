import { UserRole, HTTPMethod } from "../../shared";
import { Req, Res, RouteHandlerConfig } from "../types";
import { StorageAPI } from "../../storage";
import { IAnnouncement, AnnouncementGetQueryRequest } from "common";
import { parseToNumber, parseToNumberArray } from "../../shared/utils";


export const announcement_route_handlers: Array<RouteHandlerConfig> = [
  {
    name: "Create announcement",

    access: [UserRole.ADMIN, UserRole.USER],
    method: HTTPMethod.POST,
    path: '/announcement',
    validation_schemas: {
      body: {
        "type": "object",
        "properties": {
          "description": {
            "title": "Description",
            "type": "string",
            "minLength": 5,
            "maxLength": 512,
          },
          "price": {
            "title": "Price",
            "type": "number",
          },
          "city": {
            "title": "City ID",
            "type": "number",
          },
          "region": {
            "title": "Region ID",
            "type": "number",
          },
          "images": {
            "type": "array",
            "items": {
              "type": "number",
            },
            "minItems": 1,
          },
          "tags": {
            "type": "array",
            "items": {
              "type": "number",
            },
            "minItems": 1,
          },
          "categories": {
            "type": "array",
            "items": {
              "type": "number",
            },
            "minItems": 1,
          },
        },
        "required": [
          "description",
          "price",
          "images",
          "tags",
          "categories",
        ],
      },
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<any, any, IAnnouncementCreateBody>,
      res: Res,
    ) => {
      const { body } = req;

      const announcement = await StorageAPI.Announcements.create({
        user_id: res.locals.user_id,
        description: body.description,
        price: body.price,
        city_id: body.city,
        region_id: body.region,

        images: body.images,
        tags: body.tags,
        categories: body.categories,
      })

      res.json({user: "uaaaaaaaaaaa"});
      res.end();
    },
  },

  {
    name: "Get requester user announcements",

    access: [UserRole.ADMIN, UserRole.USER],
    method: HTTPMethod.GET,
    path: '/my_announcement',
    validation_schemas: {
      body: undefined,
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<any, any, any>,
      res: Res,
    ) => {

      const announcements = await StorageAPI.Announcements.getMany({
        user_id: res.locals.user_id,
        ids: undefined,
        price_min: undefined,
        price_max: undefined,
        city_ids: undefined,
        region_ids: undefined,
        tag_ids: undefined,
        category_ids: undefined,
        search_query: undefined,
      });

      console.log("announcements: ", announcements)
      console.log("announcements: ", JSON.stringify(announcements, null, 2))

      res.json(announcements);
      res.end();
    },
  },

  {
    name: "Get announcements by filters",

    access: null, // [UserRole.ADMIN, UserRole.USER],
    method: HTTPMethod.GET,
    path: '/announcement',
    validation_schemas: {
      body: undefined,
      params: undefined,



      query: {
        "type": "object",
        "properties": {
          "price_min": {
            "title": "Price minimum",
            "type": "string",
            "minLength": 1,
            "pattern": "^[0-9]{1,}$",
          },
          "price_max": {
            "title": "Price maximum",
            "type": "string",
            "minLength": 1,
            "pattern": "^[0-9]{1,}$",
          },
          "city_ids": {
            "type": "array",
            "items": {
              "type": "string",
              // "minLength": 1,
              "pattern": "^[0-9]{1,}$",
            },
            "minItems": 1,
          },
          "region_ids": {
            "type": "array",
            "items": {
              "type": "string",
              // "minLength": 1,
              "pattern": "^[0-9]{1,}$",
            },
            "minItems": 1,
          },
          "tag_ids": {
            "type": "array",
            "items": {
              "type": "string",
              // "minLength": 1,
              "pattern": "^[0-9]{1,}$",
            },
            "minItems": 1,
          },
          "category_ids": {
            "type": "array",
            "items": {
              "type": "string",
              // "minLength": 1,
              "pattern": "^[0-9]{1,}$",
            },
            "minItems": 1,
          },
          "search_query": {
            "type": "string",
            "minLength": 1,
          },
        }
      },
    },
    handler: async (
      req: Req<any, any, any, AnnouncementGetQueryRequest>,
      res: Res,
    ) => {

      console.log("req.query: ", req.query);

      const announcements = await StorageAPI.Announcements.getMany({
        user_id: res.locals.user_id,
        ids: undefined,
        price_min: parseToNumber(req.query.price_min),
        price_max: parseToNumber(req.query.price_max),
        city_ids: parseToNumberArray(req.query.city_ids),
        region_ids: parseToNumberArray(req.query.region_ids),
        tag_ids: parseToNumberArray(req.query.tag_ids),
        category_ids: parseToNumberArray(req.query.category_ids),
        search_query: req.query.search_query,
      });

      console.log("announcements: ", announcements)
      console.log("announcements: ", JSON.stringify(announcements, null, 2))

      res.json(announcements);
      res.end();
    },
  },

  {
    name: "Delete announcements",

    access: [UserRole.ADMIN, UserRole.USER],
    method: HTTPMethod.DELETE,
    path: '/announcement/:id',
    validation_schemas: {
      body: undefined,
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<{id: number}, any, any>,
      res: Res,
    ) => {

      const ann_id = req.params.id;

      const announcements = await StorageAPI.Announcements.getMany({
        user_id: res.locals.user_id,
        ids: [ann_id],
        price_min: undefined,
        price_max: undefined,
        city_ids: undefined,
        region_ids: undefined,
        tag_ids: undefined,
        category_ids: undefined,
        search_query: undefined,
      });

      console.log("announcements: ", announcements);

      if (announcements[0] !== undefined) {
        await StorageAPI.Announcements.deleteById({
          id: ann_id,
        })
      }

      res.json({});
      res.end();
    },
  },

  {
    name: "Update announcement",

    access: [UserRole.ADMIN, UserRole.USER],
    method: HTTPMethod.PATCH,
    path: '/announcement/:id',
    validation_schemas: {
      body: {
        "type": "object",
        "properties": {
          "description": {
            "title": "Description",
            "type": "string",
            "minLength": 5,
            "maxLength": 512,
          },
          "price": {
            "title": "Price",
            "type": "number",
          },
          "city": {
            "title": "City ID",
            "type": "number",
          },
          "region": {
            "title": "Region ID",
            "type": "number",
          },
          "images": {
            "type": "array",
            "items": {
              "type": "number",
            },
            "minItems": 1,
          },
          "tags": {
            "type": "array",
            "items": {
              "type": "number",
            },
            "minItems": 1,
          },
          "categories": {
            "type": "array",
            "items": {
              "type": "number",
            },
            "minItems": 1,
          },
        }
      },
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<{id: number}, any, IAnnouncementUpdateBody>,
      res: Res<IAnnouncement>,
    ) => {

      const ann_id = req.params.id;

      const announcements = await StorageAPI.Announcements.getMany({
        user_id: res.locals.user_id,
        ids: [ann_id],
        price_min: undefined,
        price_max: undefined,
        city_ids: undefined,
        region_ids: undefined,
        tag_ids: undefined,
        category_ids: undefined,
        search_query: undefined,
      });

      console.log("announcements: ", announcements);

      if (announcements[0] !== undefined) {
        const updated_ann = await StorageAPI.Announcements.update({
          id: ann_id,
          categories: req.body.categories,
          city: req.body.city,
          description: req.body.description,
          images: req.body.images,
          price: req.body.price,
          region: req.body.region,
          tags: req.body.tags,
        });

        res.json(updated_ann);
        res.end();
      } else {
        throw new Error("Unable to update");
      }


    },
  },
];

interface IAnnouncementCreateBody {
  description: string;
  price: number;
  city: number;
  region: number;
  images: number[];
  tags: number[];
  categories: number[];
}

interface IAnnouncementUpdateBody {
  description: undefined | string;
  price: undefined | number;
  city: undefined | number;
  region: undefined | number;
  images: undefined | number[];
  tags: undefined | number[];
  categories: undefined | number[];
}
