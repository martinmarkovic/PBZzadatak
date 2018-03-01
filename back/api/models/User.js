/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
'use strict';
const bcrypt = require('bcrypt');

module.exports = {

  schema: 'true',

  attributes: {

    email: {
      type: 'string',
      email: 'true',
      unique: 'true'
    },

    username: {
      type: 'string',
      unique: 'true'
    },

    encryptedPassword: {
      type: 'string'
    },

    deleted: {
      type: 'boolean',
      defaultsTo: false
    },

    admin: {
      type: 'boolean',
      defaultsTo: false
    },

    banned: {
      type: 'boolean',
      defaultsTo: false
    },

    note:{
      type:"string",
      defaultsTo:"Nema note za korisnika."
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    },
  },

  // Encrypt password before creating a User
  beforeCreate(values, next) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        sails.log.error(err);
        return next();
      }

      bcrypt.hash(values.password, salt, (err, hash) => {
        if (err) {
          sails.log.error(err);
          return next();
        }
        values.encryptedPassword = hash; // Encrypted password
        return next();
      });
    });
  },

  // Encrypt password before updating a User
  beforeUpdate(values, next) {
    if (!values.password) return next();
      
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        sails.log.error(err);
        return next();
      }

      bcrypt.hash(values.password, salt, (err, hash) => {
        if (err) {
          sails.log.error(err);
          return next();
        }
        values.encryptedPassword = hash; // Encrypted password
        return next();
      });
    });
  },

  // // Before update
  // beforeUpdate(values, next) {
  //   if (values.newPassword) {
  //     bcrypt.genSalt(10, ())
  //   }
  // },

  comparePassword(password, encryptedPassword) {

    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, encryptedPassword, (err, match) => {
        if (err) {
          sails.log.error(err);
          return reject("Something went wrong!");
        }
        if (match) return resolve();
        else return reject("Mismatch passwords");
      });
    });
  }
}
