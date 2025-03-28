import axios from "axios";
import * as cheerio from "cheerio";
import { timeout } from "puppeteer";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/**
 * scraping and returning type also its hint
 * @returns {Promise<Object>} //promise resolves to object
 */

async function quoteScrapper() {
  try {
    const url = "http://quotes.toscrape.com/";

    console.log("Scrapper activated >>> >>> >>>");
    const res = await axios.get(url, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });

    const $ = cheerio.load(res.data);
    const quotes = [];

    /**
     * return will have
     * text :quote
     * writer/author
     * tags []
     */
    $(".quote").each((idx, el) => {
      const text = $(el).find(".text").text().trim();

      const writer = $(el).find(".author").text().trim();

      const tags = [];
      //damn shitshow for getting arrayed !?
      $(el)
        .find(".tags a.tag") //dw even if it shows array
        .each((idx, tagEl) => {
          tags.push($(tagEl).text().trim());
        });

      quotes.push({
        id: idx + 1,
        quote: text,
        author: writer,
        tags: tags,
      });
    });
    return {
      source: "Scrapped Quotes",
      sourceUrl: url,
      timpestamp: new Date().toISOString(),
      totalResults: quotes.length,
      result: quotes,
    };
  } catch (error) {
    console.error("Error scrapping quotes and shits");
    return {
      error: true,
      message: error.message,
      timpestamp: new Date().toISOString(),
    };
  }
}

// quoteScrapper().then((data) => console.log(data));

export default quoteScrapper;
