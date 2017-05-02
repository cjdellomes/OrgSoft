var respond = {
    
    failedToGetOrganizations: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get organizations!",
            error: err
        }).code(500);
    },
    getOrganizations: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got organizations!",
            result: result
        }).code(200);
    },
    failedToCreateOrganization: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to create organization!",
            error: err
        }).code(500);
    },
    createOrganization: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully created organization!",
            result: result
        }).code(200);
    },
    failedToGetOrganization: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get organization!",
            error: err
        }).code(500);
    },
    getOrganization: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got organization!",
            result: result
        }).code(200);
    },
    failedToGetRecentOrganization: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get most recent organization!",
            error: err
        }).code(500);
    },
    getRecentOrganization: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got most recent organization!",
            result: result
        }).code(200);
    },
    failedToEditOrganization: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to edit organization!",
            error: err
        }).code(500);
    },
    editOrganization: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully edited organization!",
            result: result
        }).code(200);
    },
    failedToDeleteOrganization: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to delete organization!",
            error: err
        }).code(500);
    },
    deleteOrganization: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully deleted organization!",
            result: result
        }).code(200);
    },
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
    failedToGetUser: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get User!",
            error: err
        }).code(500);
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
    failedToGetTimecards: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get timecards!",
            error: err
        }).code(500);
    },
    getTimecards: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got timecards!",
            result: result
        }).code(200);
    },
    failedToCreateTimecard: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to create timecard!",
            error: err
        }).code(500);
    },
    createTimecard: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully created timecard!",
            result: result
        }).code(200);
    },
    failedToGetTimecard: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get timecard!",
            error: err
        }).code(500);
    },
    getTimecard: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got timecard!",
            result: result
        }).code(200);
    },
    failedToEditTimecard: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to edit timecard!",
            error: err
        }).code(500);
    },
    editTimecard: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully edited timecard!",
            result: result
        }).code(200);
    },
    failedToDeleteTimecard: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to delete timecard!",
            error: err
        }).code(500);
    },
    deleteTimecard: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully deleted timecard!",
            result: result
        }).code(200);
    },
    failedToGetTimeRecords: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get time records!",
            error: err
        }).code(500);
    },
    getTimeRecords: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got time records!",
            result: result
        }).code(200);
    },
    failedToCreateTimeRecord: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to create time record!",
            error: err
        }).code(500);
    },
    createTimeRecord: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully created time record!",
            result: result
        }).code(200);
    },
    failedToEditTimeRecord: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to edit time record!",
            error: err
        }).code(500);
    },
    editTimeRecord: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully edited time record!",
            result: result
        }).code(200);
    },
    failedToDeleteTimeRecord: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to delete time record!",
            error: err
        }).code(500);
    },
    deleteTimeRecord: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully deleted time record!",
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
    },
    failedToGetReviews: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get reviews",
            error: err
        }).code(500);
    },
    getReviews: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got reviews",
            result: result
        }).code(200);
    },
    failedToCreateReview: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to create review",
            error: err
        }).code(500);
    },
    createReview: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully created review",
            result: result
        }).code(200);
    },
    failedToGetReview: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get review",
            error: err
        }).code(500);
    },
    getReview: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got review",
            result: result
        }).code(200);
    },
    failedToEditReview: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to edit review",
            error: err
        }).code(500);
    },
    editReview: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully edited review",
            result: result
        }).code(200);
    },
    failedToDeleteReview: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to delete review",
            error: err
        }).code(500);
    },
    deleteReview: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully delted review",
            result: result
        }).code(200);
    },
    failedToGetReviewDash: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get review dashboard",
            error: err
        }).code(500);
    },
    getReviewDash: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got review dashboard",
            result: result
        }).code(200);
    },
    failedToGetUserReviews: function (reply, err) {
        reply({
            statusCode: 500,
            message: "Unable to get user reviews",
            error: err
        }).code(500);
    },
    getUserReviews: function (reply, result) {
        reply({
            statusCode: 200,
            message: "Successfully got user reviews",
            result: result
        }).code(200);
    }
};

module.exports = respond;
