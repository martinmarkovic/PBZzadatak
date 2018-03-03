var _ = require('lodash');

module.exports = function (req, res, next) {

  JwtService.getToken(req, function (err, rawToken) {
    if (err || !rawToken) return res.badRequest(err || 'noToken');
    JwtService.verifyToken(rawToken, function (err, token) {
      if (err) return res.unauthorized('invalidToken');
             
        User.findOne({ id: token.id }).exec(function (err, foundAdmin) {
          if (err || !foundAdmin) return res.forbidden(err);
          req.options.admin = token.admin;
          req.options.id = token.id;
next();  

        });
        
    });
   
  });

  
};
