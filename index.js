require("dotenv").config();

const express = require("express");
const loggerMiddleWare = require("morgan");
const corsMiddleWare = require("cors");
const { PORT } = require("./config/constants");

const authRouter = require("./routers/auth");
const cardRouter = require("./routers/card");
const messageRouter = require("./routers/message");

const app = express();

app.use(loggerMiddleWare("dev"));

const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);
app.use(corsMiddleWare());

if (process.env.DELAY) {
  app.use((req, res, next) => {
    setTimeout(() => next(), parseInt(process.env.DELAY));
  });
}

app.use("/", authRouter);
app.use("/cards", cardRouter);
app.use("/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
