const mainRouter = require('express').Router();
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const codeRouter = require('./routes/code.route');
const discussRouter = require('./routes/discuss.route');
const problemRouter = require('./routes/problem.route');

mainRouter.use('/user', userRouter);
mainRouter.use('/auth', authRouter);
mainRouter.use('/playground', codeRouter);
mainRouter.use('/discuss', discussRouter);
mainRouter.use('/problem', problemRouter);

module.exports = mainRouter;
