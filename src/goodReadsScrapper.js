import * as Cheerio from "cheerio";
import axios from "axios";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/**
 * scraping and returning type also its hint
 * @returns {Promise<Object>} //promise resolves to object
 */

async function bookScraper() {
  try {
    const url = "https://www.goodreads.com/shelf/show/most-popular";
    console.log("Scrapper activated >>> >>> >>>");
    const res = await axios.get(url, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });

    const $ = Cheerio.load(res.data);
    const books = [];

    /**
     * Object shape will look like
     * id =>autoincrements
     * title
     * author
     * link
     * avg rating
     * num of ratings
     * published
     */
    //selects all shits with this classname
    $(".elementList").each((idx, el) => {
      //book title------------------------------

      const titleTag = $(el).find(".bookTitle");
      const title = titleTag.text().trim();
      //beaware of the links bruh
      const link = "https://www.goodreads.com" + titleTag.attr("href");

      //book author------------------------------
      //gotta find rawest element that has this shit

      const authorTag = $(el).find(".authorName");
      const author = authorTag.text().trim();

      //book rating-------------------------------
      const ratingTag = $(el).find(".greyText.smallText");
      let avgTotPub = ratingTag.text().trim();
      let avgRating = "";
      let ratingNumber = "";
      let published = "";
      let i = 0;
      let one = true,
        two = true;
      for (i; i < avgTotPub.length; i++) {
        if (avgTotPub[i] === "—") {
          if (one) {
            one = false;
          } else if (two) {
            two = false;
          }
          //its like procedural changing
          continue;
        }
        if (one) {
          avgRating += avgTotPub[i];
        } else if (two) {
          ratingNumber += avgTotPub[i];
        } else published += avgTotPub[i];
      }

      books.push({
        id: idx + 1,
        title,
        author,
        published: published.trim(),
        avgRating: avgRating.trim(),
        totalRatings: ratingNumber.trim(),
        link,
      });
    });

    return {
      source: "Goodreads by Scrapping",
      sourceUrl: url,
      timestamp: new Date().toISOString(),
      resultNumber: books.length,
      result: books,
    };
  } catch (e) {
    console.error("BookScrapper error");
    return {
      error: true,
      message: e.message,
      timestamp: new Date().toISOString(),
    };
  }
}

bookScraper().then((data) => console.log(data));
