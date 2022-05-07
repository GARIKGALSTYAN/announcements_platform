import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";
import multer from "multer";
import { app_environment_variables } from "../env.config";
import { initStorageConnection } from "../storage";
import { router } from "./router";
import { Req, Res, RequestUserAuthData } from './types';
import { HTTPMethod } from '../shared';

initStorageConnection().catch((error) => {
    console.log("error on initStorageConnection: ", error);
})

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(cors());

app.use(express.static('public'))

// app.use((req, res, next) => {
//     (req as Req).user = null;
//     console.log('boooooooooooooooooooooiiiiiiiiiiiiiiiiiiiii');
//     console.log('req.cookies: ', req.cookies);
//     // req.us
//     // RequestUserAuthData
//     next();
// })

// app.use((req, res, next) => {
//     console.log('m22222222222222');
//     next();
// })

app.get('/test', (req, res) => {res.end("boooooooooooooy")});

app.use(router);

// app.use(router);

// const mds: HTTPMethod[] = [
//     HTTPMethod.GET,
//     HTTPMethod.POST,
//     HTTPMethod.PATCH,
//     HTTPMethod.DELETE,
// ];

// for(let i = 0; i < mds.length; i++) {
//     const md = mds[i];
//     console.log("sssssssssssss", md)
//     console.log("app.get: ", app[md])
//     app[md]("/aa", (req, res) => {
//         console.log('!!@!@@!@@!@!@ test generation success');
//         res.end();
//     })
// }

app.listen(app_environment_variables.server.port, () => {
    console.log(`started on port: ${app_environment_variables.server.port}`);
});
