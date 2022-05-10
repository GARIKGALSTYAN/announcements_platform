import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app_environment_variables } from "../env.config";
import { initStorageConnection } from "../storage";
import { router } from "./router";
import { authMiddleware } from "./authMiddleware";
import { Req, Res, RequestUserAuthData } from "./types"
import { IAnnouncement, IAnnouncement22222 } from "common";

const a: IAnnouncement22222 = {
    city: '',
    description: "",
    id: 4,
    price: 54,
    region: "dwedw"
}

console.log('aaaaaaaaaaaaaaaaA":', a);


initStorageConnection().catch((error) => {
    console.log("Error on initStorageConnection: ", error);
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));

app.use(authMiddleware);

app.use(router);

app.listen(app_environment_variables.server.port, () => {
    console.log(`started on port: ${app_environment_variables.server.port}`);
});
