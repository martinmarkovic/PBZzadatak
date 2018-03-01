module.exports = function(req, res, next) {

User.findOne({id: req.token.id}).exec(function(err, user) {

  if(err) return res.badRequest(err);
    
  if(!user) return res.notFound();

  if(!user.admin) return res.forbidden({err: 'Your\'re not allowed to visit this page.'});

  req.token.user = user;

  next();

});
}