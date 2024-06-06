import express from "express";
import { configDotenv } from "dotenv";
import { urlRoutes } from "./features/urls/routes";
import bodyParser from "body-parser";

configDotenv();

const app = express();
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", urlRoutes);

const port = process.env.PORT ? process.env.PORT : 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
