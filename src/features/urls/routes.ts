import express from "express";
import { schemaValidate } from "../../middlewares/validate";
import { urlSchema } from "./validation";
import { addShortUrl, deleteLongUrl, redirectToLongUrl } from "./controller";
import { checkLongUrlExists } from "../../middlewares/urlMiddleware";

export const urlRoutes = express.Router();

urlRoutes.get("/:key", redirectToLongUrl);
urlRoutes.post("/", schemaValidate(urlSchema), checkLongUrlExists, addShortUrl);
urlRoutes.delete("/:key", deleteLongUrl);
