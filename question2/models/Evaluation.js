const path = require('node:path');

const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/evaluations.json');

function evaluate(username, id, score) {
  const evaluationFound = readOneEvaluation(username, id);
  if (evaluationFound) return undefined;
  const evaluations = parse(jsonDbPath, []);
  const createdEvaluation = {
    idQuote: id,
    username,
    score,
  };
  evaluations.push(createdEvaluation);
  serialize(jsonDbPath, evaluations);
  return createdEvaluation;
}

function readOneEvaluation(username, id) {
  const evaluations = parse(jsonDbPath, []);
  const index = evaluations.findIndex(
    (e) => e.username === username && e.idQuote === id,
  );
  return evaluations[index];
}

module.exports = {
  evaluate,
};
