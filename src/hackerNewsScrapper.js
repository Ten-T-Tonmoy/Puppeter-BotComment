import * as cheerio from "cheerio";
import axios from "axios";
import express from "express";
import fs from "fs";
import env from "dotenv";
import { timeStamp } from "console";
import { totalmem } from "os";

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
    const res = await axios.get(url, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    //-----------------------get htmls by cheerio------------------------
    const $ = cheerio.load(res.data); //parses html into string
    // $ is like jquery lets us to manupulate html doc
    const newsPortal = [];

    //---------------------extracting link and text-----------------------
    /**
     * in this case object will contain
     * title of news
     * link of news
     * score of news
     * writer of news
     */
    $(".titleline").each((idx, el) => {
      //selects all elements with titleline and we using foreach on it
      const linkElement = $(el).find("a").first();
      //first element that has <a> tag
      const title = linkElement.text().trim();
      //extracts text within the <a> tag bruh
      const link = linkElement.attr("href");
      //gets the href attribute from the element a
      const scoreElement = $(el).parent().parent().find(".score");
      //parent of this and parent of that since yk shit within same div
      const score = scoreElement.length //>0
        ? scoreElement.text().trim()
        : "Unscored yet";

      newsPortal.push({
        id: idx + 1,
        title, // when property name and variable namme same just shorthand bro
        link,
        score,
      });
    });

    return {
      source: "Hacker News by scrapping",
      sourceUrl: url,
      timeStamp: new Date().toISOString,
      totalResults: newsPortal.length,
      data: newsPortal,
    };
  } catch (error) {
    console.error("Error scrapping Hacker News");
    return {
      error: true,
      message: error.message,
      timeStamp: new Date().toISOString(), //iso formatted string
    };
  }
}

//-------------------async so will return promise use .then chain and print

// scrapeNews().then((data) => console.log(JSON.stringify(data, null, 2)));
/**
 * stringify(value,replacer,space)
 * value=> object or value u wanna stringify
 * modifier kind of or filter
 * adds spacings while forming
 */

export default scrapeNews;
