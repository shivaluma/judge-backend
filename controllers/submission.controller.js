const { Problem, Submission, Testcase } = require('../models');
const { Op, literal, QueryTypes } = require('sequelize');
const logger = require('../configs/logger').logger;
const got = require('got');

const getShortStatus = (status) => {
  switch (status) {
    case 'Accepted':
      return 'AC';
    case 'Wrong Answer':
      return 'WA';
    case 'Time Limit Exceeded':
      return 'TLE';
    case 'Runtime Error':
      return 'RE';
    default:
      return 'RE';
  }
};

exports.createSubmission = async (req, res) => {
  const user = req.user;
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

  logger.debug('BEFORE RESPONSE');
  const response = await got.post('http://judgecore-server:3007/submit', {
    json: {
      src: new Buffer(code).toString('base64'),
      stdin: stdin,
      expected_result: stdout,
      lang: language,
      timeout: 2,
      isBase64: true,
    },
  });

  logger.debug('BEFORE RESPONSE');

  const currentInterval = setInterval(async () => {
    const result = await got.get(response.body).json();
    if (result.status !== 'Queued' && result.status !== 'Processing') {
      logger.info(result);
      const submission = await Submission.create({
        status: getShortStatus(result.status),
        runtime: !isNaN(Number(result.time_used[0]))
          ? Number(result.time_used[0]).toFixed(1)
          : 0,
        language: language,
        userId: user.id,
        problemId: problemId,
      });
      clearTimeout(currentInterval);
      return res.status(201).json({ result: result, submission: submission });
    }
  }, 400);
};

exports.getSubmissions = async (req, res) => {
  const user = req.user;
  const { problemId } = req.query;
  const submissions = await Submission.findAll({
    where: {
      userId: user.id,
      problemId: problemId,
    },
    order: [['createdAt', 'DESC']],
  });

  return res.status(200).json({ submissions: submissions });
};
