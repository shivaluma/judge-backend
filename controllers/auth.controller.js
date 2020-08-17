const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const keys = require('../configs/keys');
const got = require('got');

const { User, SocialLogin } = require('../models');
const { v4: uuidv4 } = require('uuid');

exports.postSignUp = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password || !confirmPassword)
    return res.status(400).json({ message: 'Please input all fields.' });

  if (!validator.isEmail(email))
    return res.status(400).json({ message: 'Not a valid email.' });

  if (password !== confirmPassword)
    return res.status(400).json({ message: 'Password do not match.' });
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    await User.create({
      username,
      password: hashedPassword,
      email,
    });
    res.status(201).json({ message: 'Create account successfully' });
  } catch (err) {
    const env = process.env.NODE_ENV || 'development';
    return res.status(400).json({
      message: 'Cannot create account',
      error: err.errors,
    });
  }
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Please input all fields.' });
  try {
    const user = await User.findOne({
      attributes: ['id', 'username', 'password', 'avatar', 'role'],
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: 'Invalid username or password.' });
    const payload = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      role: user.role,
    };
    const accessToken = jwt.sign(payload, keys.secretOrKey);
    return res
      .status(200)
      .json({ message: 'Login successfully.', accessToken, user: payload });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
};

exports.postLoginAdmin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Please input all fields.' });
  try {
    const user = await User.findOne({
      attributes: ['id', 'username', 'password', 'avatar', 'role'],
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    if (user.role !== 'super_admin' && user.role !== 'judge_admin') {
      return res
        .status(403)
        .json({ message: 'You dont have permission to access to this page.' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: 'Invalid username or password.' });
    const payload = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      role: user.role,
    };
    const accessToken = jwt.sign(payload, keys.secretOrKey);
    return res
      .status(200)
      .json({ message: 'Login successfully.', accessToken, user: payload });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }
};

exports.postGoogle = async (req, res) => {
  const { ggAccessToken } = req.body;
  try {
    const query = `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${ggAccessToken}`;
    const response = await got(`${query}`).json();

    const socialLoginUser = await SocialLogin.findOne({
      where: {
        providerKey: response.sub,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email', 'avatar', 'role'],
        },
      ],
    });

    if (!socialLoginUser) {
      if (User.count({ email: response.email }) > 0)
        return res.status(409).json({
          message:
            'There is an account with this email address, please login then bind to this google account.',
        });

      const verifyToken = uuidv4();
      SocialLogin.create({
        providerKey: response.sub,
        providerType: 'google',
        verifyToken,
      });

      return res.status(302).json({
        message: 'No username found, please choose a username.',
        usernameToken: verifyToken,
        email: response.email,
      });
    }

    if (!socialLoginUser.User) {
      return res.status(302).json({
        message: 'No username found, please choose a username.',
        verifyToken: socialLoginUser.verifyToken,
        email: response.email,
      });
    }

    const payload = {
      id: socialLoginUser.User.id,
      username: socialLoginUser.User.username,
      avatar: socialLoginUser.User.avatar,
      role: socialLoginUser.User.role,
    };

    const accessToken = jwt.sign(payload, keys.secretOrKey);
    return res
      .status(200)
      .json({ message: 'Login successfully.', accessToken, user: payload });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.getCheckUsernameValid = async (req, res) => {
  const { username } = req.query;

  if (!username)
    return res.status(400).json({ message: 'Not a valid username.' });
  if (!validator.isAlphanumeric(username))
    return res.status(400).json({ message: 'Not a valid username.' });
  const user = await User.findOne({
    where: {
      username,
    },
  });

  if (user)
    return res.status(409).json({
      message:
        'This username is already used by another user, please choose another username.',
    });
  return res.status(200).json({
    message: 'This username is valid.',
  });
};

exports.getCheckEmailValid = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: 'Not a valid email.' });
  if (!validator.isEmail(email))
    return res.status(400).json({ message: 'Not a valid email.' });
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user)
    return res.status(409).json({
      message:
        'This email is already used by another user, please choose another email.',
    });
  return res.status(200).json({
    message: 'This email is valid.',
  });
};

exports.postFacebook = async (req, res) => {
  const { id, fbAccessToken } = req.body;
  try {
    const query = `https://graph.facebook.com/${id}?fields=birthday,email,picture&access_token=${fbAccessToken}`;
    const response = await got(`${query}`).json();

    const socialLoginUser = await SocialLogin.findOne({
      where: {
        providerKey: response.id,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email', 'avatar', 'role'],
        },
      ],
    });

    if (!socialLoginUser) {
      if (User.count({ email: response.email }) > 0)
        return res.status(409).json({
          message:
            'There is an account with this email address, please login then bind to this facebook account.',
        });

      const verifyToken = uuidv4();
      SocialLogin.create({
        providerKey: response.id,
        providerType: 'facebook',
        verifyToken,
      });

      return res.status(302).json({
        message: 'No username found, please choose a username.',
        usernameToken: verifyToken,
        email: response.email,
      });
    }

    if (!socialLoginUser.User) {
      return res.status(302).json({
        message: 'No username found, please choose a username.',
        verifyToken: socialLoginUser.verifyToken,
        email: response.email,
      });
    }

    const payload = {
      id: socialLoginUser.User.id,
      username: socialLoginUser.User.username,
      avatar: socialLoginUser.User.avatar,
      role: socialLoginUser.User.role,
    };

    const accessToken = jwt.sign(payload, keys.secretOrKey);
    return res
      .status(200)
      .json({ message: 'Login successfully.', accessToken, user: payload });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.postUpdateUsername = async (req, res) => {
  const { usernameToken, username, email } = req.body;

  try {
    const userSocialLogin = await SocialLogin.findOne({
      where: {
        verifyToken: usernameToken,
      },
    });

    let urlAvatar = null;
    if (userSocialLogin.providerType === 'facebook') {
      urlAvatar = `https://graph.facebook.com/${userSocialLogin.providerKey}/picture?type=large`;
    }

    const user = await User.create({
      username,
      email,
      password: 'nopassword',
      avatar: urlAvatar,
    });

    userSocialLogin.userId = user.id;
    await userSocialLogin.save();

    const payload = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, keys.secretOrKey);
    return res.status(200).json({
      message: 'Create account successfully.',
      accessToken,
      user: payload,
    });
  } catch (err) {
    return res.status(400).json({
      message: 'Some error occurs, please contact the administrator for help.',
    });
  }
};

exports.postForgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Please input email!' });

  const tempPassword = randomstring.generate({ length: 6 });
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) return res.status(404).json({ message: 'Email not exsist!' });
    else {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'tan.thai.2t@gmail.com',
          pass: 'Doublet5299',
        },
      });

      const mainOptions = {
        from: 'Crepp',
        to: email,
        subject: 'BrosCode Password Reset Verification',
        text: 'Forgot password',
        html: `<table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">
          <tr><td align="center">
        <table style="; border:1px solid #eaeaea;border-radius:5px;margin:40px 0;" width="600" border="0" cellspacing="0" cellpadding="40">
          <tr><td align="center"><div style="font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;text-align:left;width:465px;">
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">
          <tr><td align="center">
          <div><img src="https://assets.vercel.com/email/vercel.png" width="40" height="37" alt="Vercel" /></div>
          <h1 style="color:#000;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:24px;font-weight:normal;margin:30px 0;padding:0;">Reset password from<b>BrosCode</b></h1>
        </td></tr>
        </table>
        
        <p style="color:#000;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:14px;line-height:24px;">Hello <b> ${User.username}</b>,</p>
        <p style="color:#000;font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:14px;line-height:24px;">This is your new password!</p>
        <br/>
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100% !important;">
          <tr>
            <td align="center" bgcolor="#f6f6f6" valign="middle" height="40" style="font-family:-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, &quot;Roboto&quot;, &quot;Oxygen&quot;, &quot;Ubuntu&quot;, &quot;Cantarell&quot;, &quot;Fira Sans&quot;, &quot;Droid Sans&quot;, &quot;Helvetica Neue&quot;, sans-serif;font-size:16px;font-weight:bold;">${tempPassword}</td>
          </tr>
        </table>
        
        
        
        
        
        
        <hr style="border:none;border-top:1px solid #eaeaea;margin:26px 0;width:100%;"></hr>
        </div></td></tr>
        </table>
        </td></tr>
        </table>`,
      };
      transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Sent:' + info.response);
        }
      });
    }

    const hashedPassword = await bcrypt.hash(tempPassword, 12);
    user.password = hashedPassword;
    res.status(201).json({ message: 'Reset password successfully' });
  } catch (error) {
    return res.status(500).json({
      message: 'Some error occurs, please contact the administrator for help.',
    });
  }
};
