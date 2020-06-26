const got = require('got');

exports.postRunCode = async (req, res) => {
  const { source_code, language_id } = req.body;
  try {
    const response = await got
      .post('http://34.92.72.85/submissions/?base64_encoded=true&wait=true', {
        json: {
          source_code,
          language_id,
        },
      })
      .json();
    return res.status(200).json({ response });
  } catch (err) {
    return res.status(400).json({
      message: 'Some error occured, please contact the administrator.',
    });
  }
};
