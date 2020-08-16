const { Problem, Submission, Testcase } = require('../models');
const { Op, literal, QueryTypes } = require('sequelize');
const logger = require('../configs/logger').logger;
const got = require('got');
exports.createSubmission = async (req, res) => {
  const { user } = req.user;
  const { code, problemId, language } = req.body;

  const problem = await Problem.findByPk(problemId, {
    include: [
      {
        model: Testcase,
        attributes: ['input', 'output'],
      },
    ],
  });

  const stdin = problem.Testcases.map((testcase) => testcase.input).join(
    ' ||| '
  );
  const stdout = problem.Testcases.map((testcase) => testcase.output).join(
    ' ||| '
  );

  const response = await got.post('http://localhost/submit', {
    json: {
      src: new Buffer(code).toString('base64'),
      stdin: stdin,
      expected_result: stdout,
      lang: language,
      timeout: 2,
      isBase64: true,
    },
  });

  const currentInterval = setInterval(async () => {
    const result = await got.get(response.body).json();
    if (result.status !== 'Queued' && result.status !== 'Processing') {
      logger.info(result);
      clearTimeout(currentInterval);
      return res.status(201).json(result);
    }
  }, 400);
};
