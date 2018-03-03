module.exports = function (req, res, next) {

  

  if (!req.options.admin) return res.forbidden('Only admin users allowed here!');
  
  next();
};
