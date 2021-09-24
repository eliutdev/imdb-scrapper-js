import request from "request-promise";
import cheerio from "cheerio";

export default async (id) => {
  const $ = await request({
    uri: `https://www.imdb.com/title/${id}`,
    transform: (body) => cheerio.load(body),
  });

  const data = {
    title: $("title").text(),
    description: $('meta[name="description"]').attr("content"),
    image: $('meta[property="og:image"]').attr("content"),
    type: $('meta[property="og:type"]').attr("content"),
    userRating: $(
      '[data-testid="hero-rating-bar__aggregate-rating"] [data-testid="hero-rating-bar__aggregate-rating__score"] span:nth-child(1)'
    ).text(),
    genres: $('[data-testid="genres"] span')
      .map((_, el) => $(el).text())
      .get(),
    director: $(
      '[data-testid="title-pc-principal-credit"] .ipc-metadata-list-item__list-content-item'
    ).text(),
  };

  if (data.type === "video.movie") {
    data.releaseDate = $(
      '[data-testid="hero-title-block__metadata"] .ipc-inline-list__item:nth-child(1) a'
    ).text();
    data.pgRating = $(
      '[data-testid="hero-title-block__metadata"] .ipc-inline-list__item:nth-child(2) a'
    ).text();
    data.duration = $(
      '[data-testid="hero-title-block__metadata"] .ipc-inline-list__item:nth-child(3)'
    ).text();
  }

  return data;
};
