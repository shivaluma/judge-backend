const got = require('got');

exports.postRunCode = async (req, res) => {
  const { src, stdin, lang } = req.body;
  try {
    const response = await got.post('http://judgecore-server:3007/submit', {
      json: {
        src: new Buffer(src).toString('base64'),
        stdin: stdin,
        expected_result: '',
        lang: lang,
        timeout: 2,
        isBase64: true,
      },
    });
    const currentInterval = setInterval(async () => {
      const result = await got.get(response.body).json();
      if (result.status !== 'Queued' && result.status !== 'Processing') {
        clearTimeout(currentInterval);
        return res.status(201).json(result);
      }
    }, 400);
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      message: 'Some error occured, please contact the administrator.',
    });
  }
};
