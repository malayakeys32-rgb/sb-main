const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";

module.exports = {
  JWT_SECRET,
  JWT_EXPIRES
};
