import express from "express";
import { hackerNewsGive } from "./controllers/scraper.controller.js";

const router = express.Router();

//using route handlers are pain
router.get("/hackernews", hackerNewsGive);
export default router;
