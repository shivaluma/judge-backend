const { Problem, ProblemVote, sequelize } = require('../models');
const { Op, literal, QueryTypes } = require('sequelize');
const logger = require('../configs/logger').logger;

exports.createProblem = async (req, res) => {
  const { title, description, difficulty, hasSolution, isPremium } = req.body;
};

exports.getProblems = async (req, res) => {
  const { difficulty, hasSolution, page } = req.query;
  let solution = '';
  if (hasSolution == 'true') {
    solution = true;
  } else if (hasSolution == 'false') {
    solution = false;
  }

  if (!page)
    return res
      .status(400)
      .json({ message: 'Cannot get the page number, please try again.' });

  const { count, rows } = await Problem.findAndCountAll({
    distinct: true,
    subQuery: false,

    attributes: [
      'id',
      'title',
      'description',
      'difficulty',
      'hasSolution',
      'is_premium',
      [
        literal(
          `COUNT (DISTINCT (CASE WHEN Submissions.status = 'AC' THEN 1 END))`
        ),
        'AC',
      ],
      [
        literal(
          `COUNT (DISTINCT(CASE WHEN Submissions.status = 'AC' OR Submissions.status = 'WA' OR Submissions.status = 'RE' OR Submissions.status = 'TLE' THEN 1 END))`
        ),
        'allStatus',
      ],
    ],
    where: {
      difficulty: {
        [Op.like]: '%' + difficulty + '%',
      },
      hasSolution: {
        [Op.or]: hasSolution === '' ? [true, false] : [solution],
      },
    },
    offset: 10 * (page - 1),
    limit: 10,
  });
  console.log(rows);
};
