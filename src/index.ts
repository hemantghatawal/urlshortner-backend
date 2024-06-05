import express from "express";
import { configDotenv } from "dotenv";
import { urlRoutes } from "./features/urls/routes";
import bodyParser from "body-parser";
import { db } from "./db/setup";
import { urls } from "./db/schema";
import { eq } from "drizzle-orm";

configDotenv();

const app = express();
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/:key", async (req, res) => {
  console.log(req.params.key);
  const key = "lcykxJ6";
  let data = [];
  try {
    data = await db
      .select({ longUrl: urls.longUrl })
      .from(urls)
      .where(eq(urls.shortUrl, key));
  } catch (error) {
    return res.send(error);
  }
  console.log("data => ", data);
  if (data[0].longUrl !== null) {
    res.location(data[0].longUrl);
    return res.status(302).redirect(data[0].longUrl);
  }
  return res.send("something went wrong!");
});

app.use("/url", urlRoutes);

const port = process.env.PORT ? process.env.PORT : 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
