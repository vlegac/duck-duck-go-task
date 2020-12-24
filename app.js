const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const duckRoutes = require("./api/routes/duck");
const historyRoutes = require("./api/routes/history");
// Morgan usage - logger handle plugin
app.use(morgan("dev"));

// BodyParser usage
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Info GET endpoint
app.get("/info", (req, res, next) => {
  res.send(
    "This is a proxy service which proxies to Billing and Account APIs."
  );
});

// Routes which should handle requests
app.use("/duck", duckRoutes);
app.use("/history", historyRoutes);

// Error handler if in url is neither of api calls from above
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
