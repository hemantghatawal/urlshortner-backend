import { Request } from "express";

export function generateUniqueHash(length = 8) {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateShortUrl(req: Request, key: string): string {
   // Construct the full URL
   const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  return fullUrl + key;
}
