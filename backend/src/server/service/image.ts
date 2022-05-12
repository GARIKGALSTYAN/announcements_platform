import cloudinary from "cloudinary";
import { UserRole, HTTPMethod } from "../../shared";
import { Req, Res, RouteHandlerConfig } from "../types";
import { StorageAPI } from "../../storage";
import {
  IImage,
  CreateImage,
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
      req: Req<any, any, CreateImage>,
      res: Res<IImage>,
    ) => {
      const { body } = req;

      console.log("body.image_base_64: ", body.image_base_64.length);

      let image_url: null | string = null;

      try {
        const upload_result = await cloudinary.v2.uploader.upload(
          body.image_base_64,
        );

        console.log("upload_result: ", upload_result);
        console.log("upload_result:: ", JSON.stringify(upload_result, null, 2));
        image_url = upload_result.url; // or .secure_url
      } catch (error) {
        console.log("error on upload: ", error);
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
