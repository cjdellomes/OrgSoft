var Path = require('path');
var Query = require(Path.join(__dirname, 'query.js'));
var bcrypt = require('bcrypt');
var JWT = require('jsonwebtoken');

var saltRounds = 10;
var jwtOptions = {
    algorithm: 'HS256',
    expiresIn: '1 day'
};

var service = {

    getUserList: function (postgres, callback) {
        Query.getUserList(postgres, function (err, result) {
            if (err) {
                return callback(err);
            }

            var users = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];

                users.push({
                    id: local.id,
                    username: local.username
                });
            }
            return callback(undefined, users);
        });
    },

    getUserByQuery: function (postgres, query, callback) {
        Query.getUserByQuery(postgres, query, function (err, result) {
            if (err) {
                return callback(err);
            }
            if (!result.rows.length) {
                return callback();
            }

            var local = result.rows[0];
            return callback(undefined, {
                id: local.id,
                username: local.username,
                hashedPassword: local.hashed_password
            });
        });
    },

    createUser: function (postgres, payload, callback) {
        bcrypt.hash(payload.password, saltRounds, function (err, hash) {
            if (err) {
                return callback(err);
            }
            Query.createUser(postgres, {
                username: payload.username,
                password: hash
            }, callback);
        });
    },

    updateUser: function (postgres, userId, payload, callback) {
        Query.updateUser(postgres, userId, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, result);
        });
    },

    matchPasswords: function (password, hashedPassword, callback) {
        bcrypt.compare(password, hashedPassword, function (err, res) {
            if (err) {
                return callback(err);
            }
            return callback(undefined, res);
        });
    },

    genToken: function (session, callback) {
        JWT.sign(session, process.env.ORGSOFT_KEY, jwtOptions, callback);
    },

    getUserSettings: function (postgres, userId, callback) {
        Query.getUserSettings(postgres, userId, function(err, result) {
            if (err) {
                return callback(err);
            }
            if (!result.rows[0]) {
                return callback();
            }
            var arr = [];
            for (var i = 0; i < result.rows.length; i++) {
                var local = result.rows[i];
                arr.push({
                    userID: local.user_id,
                    settingsData: local.settings_data
                });
            }
            return callback(undefined, arr);
        });
    },

    changeUserPassword: function (postgres, userId, password, callback) {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) {
                return callback(err);
            }
            Query.changeUserPassword(postgres, userId, hash, callback);
        });
    },

    deleteUser: function (postgres, userId, callback) {
        Query.deleteUser(postgres, userId, callback);
    },

    uploadFile: function (postgres, payload, callback) {
        Query.uploadFile(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getClientFiles: function (postgres, clientID, callback) {
        Query.getClientFiles(postgres, clientID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getProfilePicture: function (postgres, clientID, callback) {
        Query.getProfilePicture(postgres, clientID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    deleteFile: function (postgres, fileID, callback) {
        Query.deleteFile(postgres, fileID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    }
};

module.exports = service;
