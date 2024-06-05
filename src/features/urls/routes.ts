import express from "express";
import { schemaValidate } from "../../middlewares/validate";
import { urlSchema } from "./validation";
import { generateShortUrl, generateUniqueHash } from "../../utils/helper";
import { db } from "../../db/setup";
import { urls } from "../../db/schema";

export const urlRoutes = express.Router();

urlRoutes.post("/", schemaValidate(urlSchema), async (req, res) => {
  const { longUrl } = req.body;
  console.log("longUrl", longUrl);
  const key = generateUniqueHash();
  console.log("key", key);
  const shortUrl = generateShortUrl(key);
  try {
    await db.insert(urls).values({ key, shortUrl, longUrl });
  } catch (error) {
    console.log(error);
    return error;
  }
  return res.send({ key, shortUrl, longUrl });
});

// handle the case of long_url already exists
