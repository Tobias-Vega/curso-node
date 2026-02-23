const { default: axios } = require("axios");

const httpClientPlugin = {
  get: async (url) => {

    const { data } = await axios.get(url);
    return data;
    // const resp = await fetch(url);
    // const data = await resp.json();



    return data;
  },

  post: async (url, body) => {},
  put: async (url, body) => {},
  delete: async (url) => {},
};

module.exports = { httpClientPlugin };
