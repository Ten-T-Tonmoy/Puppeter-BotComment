import * as cheerio from "cheerio";
import axios from "axios";
import express from "express";
import fs from "fs";
import env from "dotenv";

const app = express();
const PORT = 3000;

async function getF1drivers() {
  try {
    const url = process.env.URL;
    const response = await axios.get(url, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
    // console.log(response);
    //-----------------------------cheerio time------------------------
    const $ = cheerio.load(response.data);
    //html parsing ft cheerio!>>?
    const dataStorage=[];

    
  } catch {}
}
getF1drivers();
