const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fs = require("fs");

// Save into file if there is no history.json
const saveQuery = (query) => {
  let searchQuerys = {
    searchedTerms: [],
  };
  searchQuerys.searchedTerms.push({ term: query });
  let saveQueryData = JSON.stringify(searchQuerys, null, 2);
  fs.writeFileSync("api/history/searchedHistory.json", saveQueryData);
};

// Read and append into history.json
const appendQuery = (query) => {
  let searchQuerys = {
    searchedTerms: [],
  };
  console.log("here");

  const historyData = fs.readFileSync("api/history/searchedHistory.json");

  searchQuerys = JSON.parse(historyData);
  searchQuerys.searchedTerms.push({ term: query });
  let saveQueryData = JSON.stringify(searchQuerys, null, 2);
  fs.writeFileSync("api/history/searchedHistory.json", saveQueryData);
};

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
    appendQuery(query);
  } else {
    saveQuery(query);
  }
  res.status(200).json(data);
});

module.exports = router;
