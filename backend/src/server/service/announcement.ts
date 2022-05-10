import { UserRole, HTTPMethod } from "../../shared";
import { Req, Res, RouteHandlerConfig } from "../types";
import { StorageAPI } from "../../storage";


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

      console.log('announcement create body: ', body);

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

      console.log('announcement created anncmnt: ', announcement);

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
      console.log("announcement ger my call");

      const announcements = await StorageAPI.Announcements.getMany({
        user_id: res.locals.user_id,
        cities: undefined,
        ids: undefined,
        regions: undefined,
        tags: undefined,
      })

      console.log('announcement get my anncmnt: ', announcements);

      res.json(announcements);
      res.end();
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
