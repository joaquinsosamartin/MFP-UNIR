import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";
import * as z from "zod/v4";
import * as cheerio from "cheerio";

const NEWS_URL = "https://www.anthropic.com/news";

async function getLatestNews(limit) {
  const response = await fetch(NEWS_URL, {
    headers: {
      "User-Agent": "anthropic-news-mcp/1.0"
    }
  });

  if (!response.ok) {
    throw new Error(`Anthropic respondió con HTTP ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html);
  const articles = [];
  const seen = new Set();

  // La página lista los artículos mediante enlaces /news/...
  $('a[href^="/news/"]').each((_, element) => {
    const title = $(element)
      .text()
      .replace(/\s+/g, " ")
      .trim();

    const href = $(element).attr("href");

    if (!title || !href || seen.has(href)) {
      return;
    }

    seen.add(href);

    articles.push({
      title,
      url: new URL(href, NEWS_URL).href
    });
  });

  return articles.slice(0, limit);
}

const server = new McpServer({
  name: "anthropic-news",
  version: "1.0.0"
});

server.registerTool(
  "latest_anthropic_news",
  {
    description: "Obtiene las últimas novedades publicadas por Anthropic",
    inputSchema: z.object({
      limit: z.number().int().min(1).max(20).default(5)
    })
  },
  async ({ limit }) => {
    try {
      const news = await getLatestNews(limit);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(news, null, 2)
          }
        ]
      };
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `No se pudieron obtener las novedades: ${error.message}`
          }
        ]
      };
    }
  }
);

serveStdio(() => server);