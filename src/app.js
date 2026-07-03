const express = require("express");

const routes = require("./routes/index");

const notFound = require("./middleware/notFound.middleware");

const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

app.use("/api", routes);

app.use(notFound);

app.use(errorHandler);

module.exports = app;