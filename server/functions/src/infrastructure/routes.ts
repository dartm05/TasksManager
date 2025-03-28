import express from "express";
import cors from "cors";
import taskApp from "./routes/task.routes";
import userApp from "./routes/user.routes";
import {errorHandler} from "./controllers/error.controller";
import * as functions from "firebase-functions/v1";


const appRoutes = express();

appRoutes.use(cors());
appRoutes.use("/", taskApp);
appRoutes.use("/", userApp);

appRoutes.use(errorHandler);

export const api = functions.https.onRequest(appRoutes);
