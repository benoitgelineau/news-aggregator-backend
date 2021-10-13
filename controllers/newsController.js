const NewsAPI = require('newsapi');

const newsApi = new NewsAPI(process.env.NEWS_API_KEY);

const getTopHeadlines = async (req, res, next) => {
  const { query } = req;
  if (!query.category) {
    return res
      .status(400)
      .json({ reason: 'Missing the "category" parameter.' });
  }
  if (!query.country) {
    return res.status(400).json({ reason: 'Missing the "country" parameter.' });
  }

  try {
    const { articles } = await newsApi.v2.topHeadlines({
      category: query.category,
      country: query.country,
    });
    return res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTopHeadlines,
};
