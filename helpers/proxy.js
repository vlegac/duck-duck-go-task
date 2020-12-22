const fetch = require("node-fetch");

module.exports = {
  proxy: async (query) => {
    try {
      const response = await fetch(
        `https://api.duckduckgo.com/?q=${query}&format=json`
      );
      const responseData = await response.json();
      let topicData = [];
      let relatedTopicsData = [];
      relatedTopicsData = responseData.RelatedTopics.map((topic) => {
        if (topic.Text && topic.FirstURL) {
          return {
            title: topic.Text,
            url: topic.FirstURL,
          };
        }
        if (topic.Topics) {
          const exctractedTopics = topic.Topics.map((topicItem) => {
            return {
              title: topicItem.Text,
              url: topicItem.FirstURL,
            };
          });
          topicData = [...topicData, ...exctractedTopics];
        }
      });
      const filteredRelatedTopicsData = relatedTopicsData.filter((item) => {
        item !== null || item !== undefined;
      });
      const duckData = [...filteredRelatedTopicsData, ...topicData];
      return [duckData, null];
    } catch (error) {
      return [null, error];
    }
  },
};
