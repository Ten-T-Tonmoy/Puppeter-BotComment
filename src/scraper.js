import * as cheerio from "cheerio";
import axios from "axios";
import express from "express";
import fs from "fs";
import env from "dotenv";
import { timeStamp } from "console";

const app = express();
const PORT = 3000;

//-------------------Step by Step----------------------
//string sent to headers sent to browser to stop bots
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
//while sending request just add this

/**
 * scraping and returning type also its hint
 * @returns {Promise<Object>} //promise resolves to object
 */

//--------------------now async func using axios---------------------

async function scrapeNews() {
  try {
    const url = "https://news.ycombinator.com/";
    //making req time

    console.log("Fetching >>>> >>> >>> ");
    const res = axios.get(url, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    //-----------------------get htmls by cheerio------------------------
    const $ = cheerio.load(res.data);
    const newsPortal=[];
    
  } catch (error) {
    console.error("Error scrapping Hacker News");
    return {
      error: true,
      message: error.message,
      timeStamp: new Date().toISOString(), //iso formatted string
    };
  }
}
