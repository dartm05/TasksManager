import express from "express";
import cors from "cors";
import taskApp from "./routes/task.routes";
import userApp from "./routes/user.routes";
import {errorHandler} from "./controllers/error.controller";
import * as functions from "firebase-functions/v1";
import {Error} from "../domain/errors/base-error";


const appRoutes = express();

appRoutes.use(cors());
appRoutes.use("/", taskApp);
appRoutes.use("/", userApp);

appRoutes.all("*", (req, res, next) => {
  next(new Error(404, "Route not found", "The page you are looking for does not exist", "Not Found"));
});

appRoutes.use(errorHandler);

export const api = functions.https.onRequest(appRoutes);
