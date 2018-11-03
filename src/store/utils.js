let shortid = require("shortid");

export const getUniqueId = () => {
  return shortid.generate();
};
