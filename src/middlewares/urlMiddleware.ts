import { NextFunction, Request, Response } from "express";
import { db } from "../db/setup";
import { urls } from "../db/schema";
import { eq } from "drizzle-orm";

export async function checkLongUrlExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { longUrl } = req.body;
  try {
    const data = await db
      .select({ key: urls.key, shortUrl: urls.shortUrl, longUrl: urls.longUrl })
      .from(urls)
      .where(eq(urls.longUrl, longUrl));
    if (data.length === 0 || typeof data === undefined) {
      return next();
    }
    const { key, shortUrl } = data[0];
    return res.send({ key, shortUrl, longUrl });
  } catch (error) {
    console.error(error);
    return res.status(400).send("something went wrong in checking long url exists");
  }
}

