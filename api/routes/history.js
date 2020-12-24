const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fs = require("fs");

router.get("/", async (req, res, next) => {
  const fileExists = fs.existsSync("searchedHistory.json");
  if (fileExists) {
    let historyRawData = fs.readFileSync("searchedHistory.json");
    let savedQuery = JSON.parse(historyRawData);
    res.status(200).json(savedQuery);
  } else {
    console.log("here");
    const data = [];
    res.status(200).json(data);
  }
});

module.exports = router;
