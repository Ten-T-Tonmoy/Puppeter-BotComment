import scrapeNews from "../hackerNewsScrapper.js";
import quoteScrapper from "../quoteScrapper.js";
import bookScraper from "../goodReadsScrapper.js";

export const hackerNewsGive = async (req, res) => {
  try {
    const data = await scrapeNews();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};
