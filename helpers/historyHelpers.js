const fs = require("fs");

module.exports = {
  // Save into file if there is no history.json
  saveQuery: (query) => {
    let searchQuerys = {
      searchedTerms: [],
    };
    searchQuerys.searchedTerms.push({ term: query });
    let saveQueryData = JSON.stringify(searchQuerys, null, 2);
    fs.writeFileSync("searchedHistory.json", saveQueryData);
  },

  // Read and append into history.json
  appendQuery: (query) => {
    let searchQuerys = {
      searchedTerms: [],
    };

    const historyData = fs.readFileSync("searchedHistory.json");

    searchQuerys = JSON.parse(historyData);
    searchQuerys.searchedTerms.push({ term: query });
    let saveQueryData = JSON.stringify(searchQuerys, null, 2);
    fs.writeFileSync("searchedHistory.json", saveQueryData);
  },
};
