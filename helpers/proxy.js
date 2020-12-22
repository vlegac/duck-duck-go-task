const fetch = require("node-fetch");

module.exports = {
  proxy: async (query) => {
    try {
      const response = await fetch(
        `https://api.duckduckgo.com/?q=${query}&format=json`
      );
      const data = await response.json();
      const touchedData = data.RelatedTopics.map((topic) => {
        return {
          title: topic.Text,
          url: topic.FirstURL,
        };
      });
      return [touchedData, null];
    } catch (error) {
      return [null, error];
    }
  },
};
