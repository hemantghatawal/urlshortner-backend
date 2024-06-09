import { Request, Response } from "express";
import { generateShortUrl, generateUniqueHash } from "../../utils/helper";
import { db } from "../../db/setup";
import { urls } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function redirectToLongUrl(req: Request, res: Response) {
  const { key } = req.params;
  try {
    const data = await db
      .select({ longUrl: urls.longUrl })
      .from(urls)
      .where(eq(urls.key, key));
    if (data.length === 0) {
      return res.send(`No URL Found for ${key}`);
    }
    if (data[0].longUrl !== null) {
      res.location(data[0].longUrl);
      return res.status(302).redirect(data[0].longUrl);
    }
  } catch (error) {
    console.error(error, "error in redirectToLongUrl");
    return res.status(400).send("something went wrong in redirecting to long url.");
  }
}

export async function addShortUrl(req: Request, res: Response) {
  const { longUrl } = req.body;
  const key = generateUniqueHash();
  const shortUrl = generateShortUrl(req, key);
  try {
    await db.insert(urls).values({ key, shortUrl, longUrl });
    return res.send({ key, shortUrl, longUrl });
  } catch (error) {
    console.error(error);
    return res.status(400).send("something went wrong in adding short url");
  }
}

export async function deleteLongUrl(req: Request, res: Response) {
  const { key } = req.params;
  try{
  // checking if key exists in db
  const data = await db
      .select({ key: urls.key, shortUrl: urls.shortUrl, longUrl: urls.longUrl })
      .from(urls)
      .where(eq(urls.key, key));
      if (data.length === 0) {
        return res.send("This Url Doesn't Exist to delete.")
      } else {
        await db.delete(urls).where(eq(urls.key, key));
        return res.send("Url Delete Success")
      }
    } catch(error){
      res.status(400).send("something went wrong ")
    }
}
