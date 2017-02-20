var Path = require('path');
var Service = require(Path.join(__dirname, 'service.js'));
var Respond = require(Path.join(__dirname, 'respond.js'));

// these functions get called from routes/api_routes.js
var api = {

    getUserList: function (request, reply) {
        if (request.query.username || request.query.id) {
            Service.getUserByQuery(request.postgres, {
                id: request.query.id,
                username: request.query.username
            }, function (err, user) {
                if (err) {
                    Respond.failedToGetUserByQuery(reply, err);
                } else if (user) {
                    Respond.gotUserByQuery(reply, {
                        id: user.id,
                        username: user.username
                    });
                } else {
                    Respond.noUserByQueryFound(reply);
                }
            });
        } else {
            Service.getUserList(request.postgres, function (err, result) {
                if (err) {
                    Respond.failedToGetUsers(reply, err);
                } else {
                    Respond.gotUsers(reply, result);
                }
            });
        }
    },

    createUser: function (request, reply) {
        Service.getUserByQuery(request.postgres, {
            username: request.payload.username
        }, function (err, user) {
            if (err) {
                Respond.failedToGetUserByQuery(reply, err);
            } else if (user) {
                Respond.usernameAlreadyExists(reply);
            } else {
                Service.createUser(request.postgres, request.payload, function (err, result) {
                    if (err) {
                        Respond.failedToCreateUser(reply, err);
                    } else {
                        Respond.createdUser(reply, result);
                    }
                });
            }
        });
    },

    getUser: function (request, reply) {
        var userQuery;
        if (request.params.userId === 'self') {
            userQuery = {
                id: request.auth.credentials.id
            };
        } else {
            userQuery = {
                id: request.params.userId
            };
        }
        Service.getUserByQuery(request.postgres, userQuery, function (err, user) {
            if (err) {
                Respond.failedToGetUserByQuery(reply, err);
            } else if (!user) {
                Respond.userDoesNotExist(reply);
            } else {
                Respond.getUser(reply, {
                    id: user.id,
                    username: user.username
                });
            }
        });
    },

    updateUser: function (request, reply) {
        var userQuery;
        if (request.params.userId === 'self') {
            userQuery = {
                id: request.auth.credentials.id
            };
        } else {
            userQuery = {
                id: request.params.userId
            };
        }
        Service.getUserByQuery(request.postgres, userQuery, function (err, user) {
            if (err) {
                Respond.failedToGetUserByQuery(reply, err);
            } else if (!user) {
                Respond.userDoesNotExist(reply);
            } else {
                Service.updateUser(request.postgres, userQuery.id, request.payload, function (err, result) {
                    if (err) {
                        Respond.failedToUpdateUser(reply, err);
                    } else {
                        Service.genToken({
                            id: userQuery.id,
                            username: request.payload.username
                        }, function (err, token) {
                            if (err) {
                                Respond.failedToGenToken(reply, err);
                            } else {
                                Respond.updateUser(reply, result, token);
                            }
                        });
                    }
                });
            }
        });
    },

    login: function (request, reply) {
        Service.getUserByQuery(request.postgres, {
            username: request.payload.username
        }, function (err, user) {
            if (err) {
                Respond.failedToGetUserByQuery(reply, err);
            } else if (!user) {
                Respond.userPassNoMatch(reply);
            } else {
                Service.matchPasswords(request.payload.password, user.hashedPassword, function (err, match) {
                    if (err) {
                        Respond.failedToComparePasswords(reply, err);
                    } else if (!match) {
                        Respond.userPassNoMatch(reply);
                    } else {
                        Service.genToken({
                            id: user.id,
                            username: user.username
                        }, function (err, token) {
                            if (err) {
                                Respond.failedToGenToken(reply, err);
                            } else {
                                Respond.loggedIn(reply, token, user.id);
                            }
                        });
                    }
                });
            }
        });
    },

    changeCurrentUserPassword: function (request, reply) {
        var userQuery;
        if (request.params.userId === 'self') {
            userQuery = {
                id: request.auth.credentials.id
            };
        } else {
            userQuery = {
                id: request.params.userId
            };
        }
        Service.getUserByQuery(request.postgres, userQuery, function (err, user) {
            if (err) {
                Respond.failedToGetUserByQuery(reply, err);
            } else if (!user) {
                Respond.noSuchUserExists(reply);
            } else {
                Service.matchPasswords(request.payload.password, user.hashedPassword, function (err, match) {
                    if (err) {
                        Respond.failedToComparePasswords(reply, err);
                    } else if (!match) {
                        Respond.passNoMatch(reply);
                    } else {
                        var newPassword = request.payload.newPassword;
                        Service.changeUserPassword(request.postgres, user.id, newPassword, function (err, result) {
                            if (err) {
                                Respond.failedToChangeUserPassword(reply, err);
                            } else {
                                Service.genToken({
                                    id: user.id,
                                    username: user.username
                                }, function (err, token) {
                                    if (err) {
                                        Respond.failedToGenToken(reply, err);
                                    } else {
                                        Respond.changeCurrentUserPassword(reply, result, token);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },

    deleteUser: function (request, reply) {
        var userQuery;
        if (request.params.userId === 'self') {
            userQuery = {
                id: request.auth.credentials.id
            };
        } else {
            userQuery = {
                id: request.params.userId
            };
        }
        Service.getUserByQuery(request.postgres, userQuery, function (err, user) {
            if (err) {
                Respond.failedToGetUserByQuery(reply, err);
            } else if (!user) {
                Respond.noSuchUserExists(reply);
            } else {
                Service.deleteUser(request.postgres, user.id, function (err, result) {
                    if (err) {
                        Respond.failedToDeleteUser(reply, err);
                    } else {
                        Respond.deleteUser(reply, result);
                    }
                });
            }
        });
    },

    uploadFile: function (request, reply) {
        Service.uploadFile(request.postgres, request.payload, function (err, result) {
            if (err) {
                Respond.failedToUploadFile(reply, err);
            } else {
                Respond.uploadFile(reply, result);
            }
        });
    },

    getUserSettings: function (request, reply) {
        Service.getUserSettings(request.postgres, request.params.userId, function (err, result) {
            if (err) {
                Respond.failedGetUserSettings(reply, err);
            } else {
                Respond.getUserSettings(reply, result);
            }
        });
    },

    deleteFile: function (request, reply) {
        Service.deleteFile(request.postgres, request.params.fileID, function (err, result) {
            if (err) {
                Respond.failedToDeleteFile(reply, err);
            } else {
                Respond.deleteFile(reply, result);
            }
        });
    },

    getClientFiles: function (request, reply) {
        Service.getClientFiles(request.postgres, request.params.clientID, function (err, result) {
            if (err) {
                Respond.failedToGetClientFiles(reply, err);
            } else {
                Respond.getClientFiles(reply, result);
            }
        });
    },

    getProfilePicture: function (request, reply) {
        Service.getProfilePicture(request.postgres, request.params.clientID, function (err, result) {
            if (err) {
                Respond.failedToGetProfilePicture(reply, err);
            } else {
                Respond.getProfilePicture(reply, result);
            }
        });
    }
};


module.exports = api;
