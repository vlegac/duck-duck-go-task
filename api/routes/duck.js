const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fs = require("fs");
const helpers = require("../../helpers/historyHelpers");

router.get("/:term", async (req, res, next) => {
  let data;
  let query = req.params.term;
  await fetch(`https://api.duckduckgo.com/?q=${query}&format=json`)
    .then((res) => res.json())
    .then(
      (json) =>
        (data = json.RelatedTopics.map((topic) => {
          return {
            title: topic.Text,
            url: topic.FirstURL,
          };
        }))
    );

  const fileExists = fs.existsSync("api/history/searchedHistory.json");
  if (fileExists) {
    helpers.appendQuery(query);
  } else {
    helpers.saveQuery(query);
  }
  res.status(200).json(data);
});

module.exports = router;
