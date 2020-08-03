const mainRouter = require("express").Router();
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const codeRouter = require("./routes/code.route");
const discussRouter = require("./routes/discuss.route");

mainRouter.use("/user", userRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/playground", codeRouter);
mainRouter.use("/discuss", discussRouter);

module.exports = mainRouter;
