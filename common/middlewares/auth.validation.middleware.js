const jwt = require("jsonwebtoken"),
  secret = require("../config/env.config.js").jwt_secret,
  crypto = require("crypto");

exports.verifyRefreshBodyField = (req, res, next) => {
  if (req.body && req.body.refresh_token) {
    return next();
  } else {
    return res.status(400).send({ error: "need to pass refresh_token field" });
  }
};

exports.validRefreshNeeded = (req, res, next) => {
  let b = new Buffer(req.body.refresh_token, "base64");
  let refresh_token = b.toString();
  let hash = crypto
    .createHmac("sha512", req.jwt.refreshKey)
    .update(req.jwt.userId + secret)
    .digest("base64");
  if (hash === refresh_token) {
    req.body = req.jwt;
    return next();
  } else {
    return res.status(400).send({ error: "Invalid refresh token" });
  }
};

// always validates the user if they are using a valid JWT
exports.validJWTNeeded = (req, res, next) => {
  if (req.headers["authorisation"]) {
    try {
      let authorisation = req.headers["authorisation"].split(" ");
      if (authorisation[0] !== "MyAuthCode") {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(authorisation[1], secret);
        return next();
      }
    } catch (err) {
      return res.status(403).send();
    }
  } else {
    return res.status(401).send();
  }
};
