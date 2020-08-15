const { Problem, ProblemVote, Testcase, sequelize } = require('../models');
const { Op, literal, QueryTypes } = require('sequelize');
const logger = require('../configs/logger').logger;

exports.createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    hasSolution,
    isPremium,
    testcases,
  } = req.body;
  const user = req.user;
  try {
    const problem = await Problem.create({
      title: title,
      description: description,
      difficulty: difficulty,
      hasSolution: hasSolution,
      isPremium: isPremium,
      authorId: user.id,
    });

    testcases.forEach(async (testcase) => {
      const newTestcase = await Testcase.create({
        input: testcase.input,
        output: testcase.output,
        problemId: problem.id,
      });
    });

    return res.status(201).json({
      message: 'Create problem successfully',
      data: { problemId: problem.id },
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Cannot create problem',
    });
  }
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
