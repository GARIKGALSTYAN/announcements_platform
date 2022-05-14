import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app_environment_variables } from "../env.config";
import { initStorageConnection } from "../storage";
import { router } from "./router";
import { authMiddleware } from "./authMiddleware";


initStorageConnection().catch((error) => {
    console.log("Error on storage connection init: ", error);
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "6mb" }));
app.use(cookieParser());
app.use(cors());
app.use(express.static("public"));
console.log("dir", __dirname)
app.use(authMiddleware);
app.use(router);

app.listen(() => {
    console.log(`Started on port: ${app_environment_variables.server.port}`);
});
