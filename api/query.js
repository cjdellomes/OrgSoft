var Path = require('path');
var Queries = require(Path.join(__dirname, 'queries.js'));

var query = {

    getOrganizations: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.getOrganizations(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createOrganization: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.createOrganization(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getOrganization: function (postgres, orgID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.getOrganization(orgID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    editOrganization: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.editOrganization(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    deleteOrganization: function (postgres, orgID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.deleteOrganization(orgID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getUserList: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getUserList(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getUserByQuery: function (postgres, query, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getUserByQuery(query), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createUser: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.createUser(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    updateUser: function (postgres, userId, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.updateUser(userId, payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getUserSettings: function (postgres, userId, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getUserSettings(userId), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    changeUserPassword: function (postgres, userId, hashedPassword, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.changeUserPassword(userId, hashedPassword), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    deleteUser: function (postgres, userId, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.deleteUser(userId), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getTimecards: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getTimecards(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    createTimecard: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.createTimecard(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getTimecard: function (postgres, cardID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getTimecard(cardID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    editTimecard: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.editTimecard(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    deleteTimecard: function (postgres, cardID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.deleteTimecard(cardID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    uploadFile: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            // if you get a huge printout of base64
            // text in your terminal window, it means the image made it through
            // down to this level and is about to go into postgres

            // uncommenting this console log is useful to see if it makes it
            // but it might crash your dev console because the string is so big
            // console.log(payload.fileString);
            client.query(Queries.uploadFile(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },

    getClientFiles: function (postgres, clientID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }
            client.query(Queries.getClientFiles(clientID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    getProfilePicture: function (postgres, clientID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getProfilePicture(clientID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    deleteFile: function (postgres, fileID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.deleteFile(fileID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    getReviews: function (postgres, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getReviews(), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    createReview: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.createReview(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    getReview: function (postgres, reviewID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.getReview(reviewID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    editReview: function (postgres, payload, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.editReview(payload), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    },
    deleteReview: function (postgres, reviewID, callback) {
        postgres.connect(function (err, client, done) {
            if (err) {
                return callback(err);
            }

            client.query(Queries.deleteReview(reviewID), function (err, result) {
                done();
                if (err) {
                    return callback(err);
                }

                return callback(undefined, result);
            });
        });
    }
};

module.exports = query;
