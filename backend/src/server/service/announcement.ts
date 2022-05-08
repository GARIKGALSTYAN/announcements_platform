import { UserRole, HTTPMethod } from "../../shared";
import { Req, Res, RouteHandlerConfig } from "../types";
import { StorageAPI } from "../../storage";
import { generatePasswordHash } from "../../shared/utils";
import { app_environment_variables } from "../../env.config";


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
