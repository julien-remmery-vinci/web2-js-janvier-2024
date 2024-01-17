const express = require('express');
const { authorize } = require('../utils/auths');
const { readOneQuoteFromId } = require('../models/Quote');
const { evaluate } = require('../models/Evaluation');

const router = express.Router();

/* GET users listing. */
router.post('/:id', authorize, (req, res) => {
  const id = req?.params?.id ? req.params.id : undefined;
  const score = req?.body?.score ? req.body.score : undefined;

  if (!id || !readOneQuoteFromId(id)) return res.status(400).json("La citation demandée n'éxiste pas.");
  if (!score || score < 0 || score > 10) return res.status(400).json("Le score entré n'est pas compris entre 0 et 10.");

  const createdEvaluation = evaluate(req.user.username, id, score);
  if (!createdEvaluation) return res.status(409).json("L'utilisateur a déjà fait une évaluation pour cette citation");

  return res.status(201).json(createdEvaluation);
});

module.exports = router;
