const mainRouter = require('express').Router();
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
mainRouter.use('/user', userRouter);
mainRouter.use('/auth', authRouter);

module.exports = mainRouter;
