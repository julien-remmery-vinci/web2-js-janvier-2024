const path = require('node:path');

const { parse } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/quotes.json');

function readOneQuoteFromId(id) {
  const quotes = parse(jsonDbPath, []);
  const index = quotes.findIndex((q) => q.id === parseInt(id, 10));
  return quotes[index];
}

module.exports = {
  readOneQuoteFromId,
};
