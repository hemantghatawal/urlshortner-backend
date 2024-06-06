import { Request, Response } from "express";
import { generateShortUrl, generateUniqueHash } from "../../utils/helper";
import { db } from "../../db/setup";
import { urls } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function redirectToLongUrl(req: Request, res: Response) {
  console.log("req.params.key => ", req.params.key);
  const { key } = req.params;
  try {
    const data = await db
      .select({ longUrl: urls.longUrl })
      .from(urls)
      .where(eq(urls.key, key));
    console.log("data", data);
    if (data.length === 0) {
      return res.send(`No URL Found for ${key}`);
    }
    if (data[0].longUrl !== null) {
      res.location(data[0].longUrl);
      return res.status(302).redirect(data[0].longUrl);
    }
  } catch (error) {
    console.log(error, "error in redirectToLongUrl");
    return res.send("something went wrong in redirecting to long url.");
  }
}

export async function addShortUrl(req: Request, res: Response) {
  const { longUrl } = req.body;
  console.log("longUrl", longUrl);
  const key = generateUniqueHash();
  console.log("key", key);
  const shortUrl = generateShortUrl(key);
  try {
    await db.insert(urls).values({ key, shortUrl, longUrl });
    return res.send({ key, shortUrl, longUrl });
  } catch (error) {
    console.log(error);
    return res.send("something went wrong in adding short url");
  }
}

export async function deleteLongUrl(req: Request, res: Response) {
  const { key } = req.params;
  console.log(key);
  try {
    const data = await db
      .select({ key: urls.key, shortUrl: urls.shortUrl, longUrl: urls.longUrl })
      .from(urls)
      .where(eq(urls.key, key));

    // res.send("response positive deleteLongUrl");
  } catch (error) {
    console.log(error);
    return res.send("something went wrong in delete long url");
  }
}
