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

    getOrganizations: function (postgres, callback) {
        Query.getOrganizations(postgres, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    createOrganization: function (postgres, payload, callback) {
        Query.createOrganization(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getOrganization: function (postgres, orgID, callback) {
        Query.getOrganization(postgres, orgID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getRecentOrganization: function (postgres, callback) {
        Query.getRecentOrganization(postgres, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    editOrganization: function (postgres, payload, callback) {
        Query.editOrganization(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    deleteOrganization: function (postgres, orgID, callback) {
        Query.deleteOrganization(postgres, orgID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

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

    getUser: function (postgres, userID, callback) {
        Query.getUser(postgres, userID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    createUser: function (postgres, payload, callback) {
        bcrypt.hash(payload.password, saltRounds, function (err, hash) {
            if (err) {
                return callback(err);
            }
            Query.createUser(postgres, {
                username: payload.username,
                password: hash,
                orgID: payload.orgID,
                firstName: payload.firstName,
                lastName: payload.lastName
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

    getTimecards: function (postgres, orgID, callback) {
        Query.getTimecards(postgres, orgID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    createTimecard: function (postgres, payload, callback) {
        Query.createTimecard(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getTimecard: function (postgres, cardID, callback) {
        Query.getTimecard(postgres, cardID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    editTimecard: function (postgres, payload, callback) {
        Query.editTimecard(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    deleteTimecard: function (postgres, cardID, callback) {
        Query.deleteTimecard(postgres, cardID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getTimeRecords: function (postgres, timecardID, callback) {
        Query.getTimeRecords(postgres, timecardID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
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
    },

    getReviews: function (postgres, callback) {
        Query.getReviews(postgres, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    createReview: function (postgres, payload, callback) {
        Query.createReview(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getReview: function (postgres, reviewID, callback) {
        Query.getReview(postgres, reviewID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    editReview: function (postgres, payload, callback) {
        Query.editReview(postgres, payload, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    deleteReview: function (postgres, reviewID, callback) {
        Query.deleteReview(postgres, reviewID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getReviewDash: function (postgres, orgID, callback) {
        Query.getReviewDash(postgres, orgID, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },

    getUserReviews: function (postgres, userID, callback) {
        Query.getUserReviews(postgres, userID,  function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(undefined, result);
        });
    },
};

module.exports = service;
