

const { getUUID } = require("./get-id.plugin");
const { getAge } = require("./get-age.plugin");
const { httpClientPlugin: http } = require("./http-client.plugin");
const buildLogger = require("./logger.plugin");

module.exports = {
  getUUID,
  getAge,
  http,
  buildLogger,
};