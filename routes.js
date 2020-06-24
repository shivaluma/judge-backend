const mainRouter = require('express').Router();
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const codeRouter = require('./routes/code.route');
mainRouter.use('/user', userRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/playground', codeRouter);

module.exports = mainRouter;
