module.exports = function alreadyInUse(err) {

  // Get access to `res`
  // (since the arguments are up to us)
  var res = this.res;

  // A violation of the unique constraint for email
  if (err.invalidAttributes.email) {
    return res.send(409, 'Email address is already taken by another user, please try again.');
  }

  // A violation of the unique constraint for username
  if (err.invalidAttributes.username) {
    return res.send(409, 'Username is already taken by another user, please try again.');
  }

  // A catch all response
  return res.send(500);
};
