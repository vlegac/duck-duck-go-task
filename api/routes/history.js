const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fs = require("fs");

router.get("/", async (req, res, next) => {
  let historyRawData = fs.readFileSync("api/history/searchedHistory.json");
  let savedQuery = JSON.parse(historyRawData);
  console.log(savedQuery);
  res.status(200).json(savedQuery);
});

module.exports = router;
