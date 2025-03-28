import express from "express";
import axios from "axios";
import nodemon from "nodemon"; // no need tho
import path from "path";
import { fileURLToPath } from "url";
import scraperRoutes from "./scraper.routes.js";

//bruh in module u cant just directly use __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;
const app = express();
app.set("view engine", "ejs");
// view directory setting up
app.set("views", path.join(__dirname, "views"));
//path join current server directory/public
//static files will go from here!
app.use(express.static(path.join(__dirname, "public")));
// path join gets the

//----------------------------endpoints--------------------------------------------
app.get("/", (req, res) => {
  res.render("index", {
    title: "This is a memphis",
  });
});

app.use("/", scraperRoutes);
//yeah man just one route
app.listen(PORT || 3000, () => {
  console.log(`Running on port ${PORT}`);
});
