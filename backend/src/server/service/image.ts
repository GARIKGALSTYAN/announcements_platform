import cloudinary from "cloudinary";
import { UserRole, HTTPMethod } from "../../shared";
import { Req, Res, RouteHandlerConfig } from "../types";
import { StorageAPI } from "../../storage";
import {
  Image
} from "common";

cloudinary.v2.config({
  api_secret: "GBVV3w-KVKTZmzHf3stYk9WOQOw",
  api_key: "929693536856614",
  cloud_name: "ds6b98cjz",
});

export const image_route_handlers: Array<RouteHandlerConfig> = [
  {
    name: "Create image",
    access: [UserRole.ADMIN, UserRole.USER],
    method: HTTPMethod.POST,
    path: '/image',
    validation_schemas: {
      body: {
        "type": "object",
        "properties": {
          "image_base_64": {
            "title": "Image in base 64 format",
            "type": "string",
          },
        },
        "required": [
          "image_base_64",
        ],
      },
      params: undefined,
      query: undefined,
    },
    handler: async (
      req: Req<any, any, Image.IImageCreateBodyArgs>,
      res: Res<Image.IImage>,
    ) => {
      const { body } = req;

      let image_url: null | string = null;

      try {
        const upload_result = await cloudinary.v2.uploader.upload(
          body.image_base_64,
        );

        image_url = upload_result.url;
      } catch (error) {
        throw error;
      }

      if (image_url === null) {
        throw new Error("Unable to upload image");
      }

      const storage_image = await StorageAPI.Image.create({
        url: image_url,
      });

      res.json(storage_image);
      res.end();
    },
  },
];
