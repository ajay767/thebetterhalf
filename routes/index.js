const app = require("./../app");

const authRouter = reqire("./authRoutes.js");

app.use("/api/v1/auth", authRouter);
