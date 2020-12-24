const proxyHelper = require("../../helpers/proxy");
const express = require("express");
const router = express.Router();
const fs = require("fs");
const helpers = require("../../helpers/historyHelpers");

// GET
router.get("/:term", async (req, res, next) => {
  let query = req.params.term;
  const [data, error] = await proxyHelper.proxy(query);

  if (error) {
    res.status(500).json({ error: error });
  } else {
    const fileExists = fs.existsSync("searchedHistory.json");
    if (fileExists) {
      helpers.appendQuery(query);
    } else {
      helpers.saveQuery(query);
    }
    res.status(200).json(data);
  }
});
// POST
router.post("/", async (req, res, next) => {
  let query = req.body.term;
  const [data, error] = await proxyHelper.proxy(query);
  if (error) {
    res.status(500).json({ error: error });
  } else {
    const fileExists = fs.existsSync("searchedHistory.json");
    if (fileExists) {
      helpers.appendQuery(query);
    } else {
      helpers.saveQuery(query);
    }
    res.status(200).json(data);
  }
});

module.exports = router;
