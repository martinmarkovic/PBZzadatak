var jwt = require('jsonwebtoken');
tokenSecret = "secret12323hgda";

module.exports = {
  // // Generates a token from supplied payload
  // issue(payload) {
  //   return jwt.sign(
  //     payload,
  //     tokenSecret, // Token Secret that we sign it with     
  //     {
  //       expiresIn: "30 days" // Token Expire time
  //     });
  // },

  // // Verifies token on a request
  // verify(token, callback) {
  //   return jwt.verify(
  //     token, // The token to be verified
  //     tokenSecret, // Same token we used to sign
  //     {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
  //     callback // Pass errors or decoded token to callback
  //   );
  // },
  issueToken: function (req, tokenData) {
    let payload = {}, options = {};

    payload.id = tokenData.id;
    payload.admin = tokenData.admin;
    payload.deleted = tokenData.deleted;

    options = {
      expiresIn: '10h'
    };

    return jwt.sign(payload, tokenSecret, options);
  },

  verifyToken: function (token, callback) {
    
    return jwt.verify(token, tokenSecret, {}, callback);
  },

  getToken: function (req, callback) {
    if (!req.headers || !req.headers.authorization) return callback('noAuthHeader');

    let tokenHeader = req.headers.authorization,
        parts = tokenHeader.split(' ');
    if (parts.length !== 2) return callback('invalidFormat');

    let scheme = parts[0],
        credentials = parts[1];
      // console.log(scheme);
      // console.log(credentials);

    if (!/^Bearer$/i.test(scheme)) return callback('invalidFormat'); // TODO: return cb with a service
    if (!credentials) return callback('invalidFormat');

    // console.log(credentials);

    return callback(null, credentials);
  }
};
