const mainRouter = require('express').Router();
const userRouter = require('./routes/user.route');
mainRouter.use('/user', userRouter);

module.exports = mainRouter;
