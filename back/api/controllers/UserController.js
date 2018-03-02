/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
  
  
  saveNote: function (req, res) {

    const data = req.allParams();

    User.update({ id: data.token.id }, { note: data.note })
      .exec(function (err, updatedUser) {
        if (err) return res.negotiate();
        if (!updatedUser) return res.notFound('User not found!');

        // Return the updated user
        return res.json(updatedUser);
      })
  },

  changeMail: function (req, res) {

    const data = req.allParams();

    User.update({ id: req.token.id }, { email: data.email })
      .exec(function (err, updatedUser) {
        if (err) return res.negotiate();
        if (!updatedUser) return res.notFound('User not found!');

        // Return the updated user
        return res.json(updatedUser);
      })
  },

  login: function (req, res) {
    const data = req.body;

    if (!data.password || !data.username) return res.badRequest('Missing credentials: username, email or password');

    User.findOne({ username: data.username })
      .then((user) => {
        if (!user || user.deleted) return res.notFound('User not found!');
        User.comparePassword(data.password, user.encryptedPassword)
          .then(() => {
            return res.send(
              {
                isAdmin: user.admin, username: user.username,note:user.note, token: JwtService.issue({ id: user.id })
              })
          })
          .catch((err) => {
            return res.forbidden();
          });
      })
      .catch((err) => {
        sails.log.error(err);
        return res.serverError();
      });
  },

  signup: function (req, res) {

    if (_.isUndefined(req.param('email'))) {
      return res.badRequest('An email address is required!');
    }

    if (_.isUndefined(req.param('password'))) {
      return res.badRequest('A password is required!');
    }

    if (req.param('password').length < 6) {
      return res.badRequest('Password must be at least 6 characters!');
    }

    if (_.isUndefined(req.param('username'))) {
      return res.badRequest('A username is required!');
    }

    // username must be at least 6 characters
    if (req.param('username').length < 6) {
      return res.badRequest('Username must be at least 6 characters!');
    }

    // Username must contain only numbers and letters.
    if (!_.isString(req.param('username')) || req.param('username').match(/[^a-z0-9]/i)) {
      return res.badRequest('Invalid username: must consist of numbers and letters only.');
    }

    const data = req.body;

    if (data.password !== data.confirmpass) return res.badRequest("Password not the same");

    User.create({
      email: data.email,
      password: data.password,
      username: data.username,
    })
    .then((user) => {
        Mailer.sendWelcomeMail(user); // use email service
        res.send({
          token: JwtService.issue({ id: user.id }),
        }); // payload is { id: user.id}
      })
      .catch((err) => {
        sails.log.error(err);
        return res.alreadyInUse(err);
      });
  },

  userGetProfile: function (req, res) {
    let data = req.allParams();
    // Try to look up user using the provided email address
    User.findOne({ id: data.userId }).exec(function foundUser(err, foundUser) {
      // Handle error
      if (err) return res.negotiate(err);

      // Handle no user being found
      if (!foundUser) return res.notFound('User not found!');

      const result = {
        email: foundUser.email,
        username: foundUser.username,
        admin: foundUser.admin,
      };

      // Return the user
      return res.json(result);
    });
  },

  // User
  userGetMyProfile: function (req, res) {

    // Try to look up user using the id from the token
    User.findOne({ id: req.token.id }).exec(function foundUser(err, foundUser) {
      // Handle error
      if (err) return res.negotiate(err);

      // Handle no user being found
      if (!foundUser) return res.notFound('User not found!');

      const result = {
        email: foundUser.email,
        username: foundUser.username,
        admin: foundUser.admin,
      };

      // Return the user
      return res.json(result);
    });
  },

  userEditProfile: function (req, res) {

    let data = req.allParams();

    delete data.deleted;
    delete data.admin;
    delete data.banned;

    userObj = {};

    if (data.email) {
      userObj.email = data.email;
    }
    if (data.username) {
      userObj.username = data.username;
    }
    if (data.password) {
      userObj.password = data.password;
    }

    // Try to look up by id from token, then update to new email and new username
    User.update({ id: req.token.id }, userObj)
      .exec(function (err, updatedUser) {
        // Handle error
        if (err) return res.negotiate(err);

        // Handle no user being found
        if (!updatedUser) return res.notFound('User not found!');

        // Return the updated user
        return res.json(updatedUser);
      });
  },

  adminDeleteUser: function (req, res) {

    if (!req.param('id')) {
      return res.badRequest('id is a required parameter.');
    }

    User.destroy({
      id: req.param('id')
    }).exec(function (err, usersDestroyed) {
      if (err) return res.negotiate(err);
      if (usersDestroyed.length === 0) {
        return res.notFound();
      }
      return res.ok();
    });
  },

  userRemoveProfile: function (req, res) {

    if (!req.token.id) {
      return res.forbidden();
    }

    User.update({
      id: req.token.id
    }, {
        deleted: true
      }, function (err, removedUser) {

        if (err) return res.negotiate(err);
        if (removedUser.length === 0) {
          return res.notFound();
        }

        // Log user out - u frontendu odlogirati korisnika
        return res.ok('User account set for deletion and temporarily suspended. Log in user to re-activate it.');
      });
  },

  userRestoreProfile: function (req, res) {

    let data = req.allParams();

    User.findOne({
      email: data.email
    }, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();
      /*
       User.update({ id: req.token.id }, userObj)
      .exec(function (err, updatedUser) {
        // Handle error
        if (err) return res.negotiate(err);

        // Handle no user being found
        if (!updatedUser) return res.notFound('User not found!');

        // Return the updated user
        return res.json(updatedUser);
      });
      */

      User.update({  }, user.encryptedPassword).exec({

        error: function (err) {
          return res.negotiate(err);
        },

        incorrect: function () {
          return res.notFound();
        },

        success: function () {

          User.update({
            id: user.id
          }, {
              encryptedPassword: user.encryptedPassword
            }).exec(function (err, updatedUser) {

              // Log the user in
              req.token.id = user.id;

              return res.json(updatedUser);
            });
        }
      });
    });
  },

  adminGetUsers: function (req, res) {

    User.find().exec(function (err, users) {

      if (err) return res.negotiate(err);

      return res.json(users);

    });
  },

  adminUpdateAdmin: function (req, res) {

    let data = req.allParams();

    delete data.encryptedPassword;

    userObj = {};

    if (data.email) {
      userObj.email = data.email;
    }
    if (data.username) {
      userObj.username = data.username;
    }
    if (data.deleted) {
      userObj.deleted = data.deleted;
    }
    if (data.admin) {
      userObj.admin = data.admin;
    }
    if (data.banned) {
      userObj.banned = data.banned;
    }

    User.update(req.param('userId'), userObj).exec(function (err, updatedUser) {

      if (err) return res.negotiate(err);

      return res.json(updatedUser);
    });
  },
};
