var respond = {
    
    failedToGetUsers: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get Users!",
            error: err
        }).code(500);
    },
    gotUsers: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got Users!",
            result: result
        }).code(200);
    },
    failedToGetUserByQuery: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get User!",
            error: err
        }).code(500);
    },
    gotUserByQuery: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got User!",
            result: result
        }).code(200);
    },
    noUserByQueryFound: function (reply) {
        reply({
            statusCode: 404,
            message: "No such User found!"
        }).code(404);
    },
    failedToCreateUser: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to create User!",
            error: err
        }).code(500);
    },
    usernameAlreadyExists: function (reply) {
        reply({
            statusCode: 401,
            message: "Username already exists!"
        }).code(401);
    },
    createdUser: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully created User!",
            result: result
        }).code(200);
    },
    userDoesNotExist: function (reply) {
        reply({
            statusCode: 404,
            message: "Username does not exist!"
        }).code(404);
    },
    getUser: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got User!",
            result: result
        }).code(200);
    },
    failedToUpdateUser: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to update User!",
            error: err
        }).code(500);
    },
    updateUser: function (reply, result, token) {
        reply({
            statusCode: 200,
            message: "Successfully updated User!",
            result: result
        }).code(200).header("Authorization", token);
    },
    failedToComparePasswords: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to compare passwords!",
            error: err
        }).code(500);
    },
    userPassNoMatch: function (reply) {
        reply({
            statusCode: 401,
            message: "Username or Password do not match!"
        }).code(401);
    },
    failedToGenToken: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to generate token!",
            error: err
        }).code(500);
    },
    loggedIn: function (reply, token, userID) {
        reply({
            statusCode: 200,
            message: "Successfully logged in!",
            result: userID
        }).code(200).header("Authorization", token);
    },
    noSuchUserExists: function (reply) {
        reply({
            statusCode: 404,
            message: "User does not exist!"
        }).code(404);
    },
    passNoMatch: function (reply) {
        reply({
            statusCode: 401,
            message: "Passwords do not match!"
        }).code(401);
    },
    failedGetUserSettings: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get user settings!",
            error: err
        }).code(500);
    },
    getUserSettings: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got user settings!",
            result: result
        }).code(200);
    },
    failedToChangeUserPassword: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to change User password!",
            error: err
        }).code(500);
    },
    changeCurrentUserPassword: function (reply, result, token) {
        reply({
            statusCode: 200,
            message: "Successfully changed User password!",
            result: result
        }).code(200).header("Authorization", token);
    },
    failedToDeleteUser: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to delete User!",
            error: err
        }).code(500);
    },
    deleteUser: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully deleted User!",
            result: result
        }).code(200);
    },
    failedToUploadFile: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to upload file",
            error: err
        }).code(500);
    },
    uploadFile: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully uploaded file",
            result: result
        }).code(200);
    },
    failedToGetClientFiles: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get client's files",
            error: err
        }).code(500);
    },
    getClientFiles: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got client's files",
            result: result
        }).code(200);
    },
    failedToGetProfilePicture: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get client's profile picture",
            error: err
        }).code(500);
    },
    getProfilePicture: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got client's profile picture",
            result: result
        }).code(200);
    },
    failedToDeleteFile: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to delete file",
            error: err
        }).code(500);
    },
    deleteFile: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully deleted file",
            result: result
        }).code(200);
    }
};

module.exports = respond;
