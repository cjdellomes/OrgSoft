var xlsx = require('node-xlsx');

var parseProperty = function(property) {

    if (property === undefined) {
        property = 'null';
    }
    if (typeof property === 'string' && property === '') {
        property = null;
    }
    if (property === 'null') {
        return null;
    } else {
        return property;
    }

};

// *** Postgres allows rows with duplicate data, so currently
// same data inserted twice will be stored in two separate rows
// need to figure out how to "only insert if not exists" implementation
var queries = {

    getOrganizations: function () {
        var queryString = 'SELECT id, name, register_date FROM organization;';

        return queryString;
    },

    createOrganization: function (payload) {
        var queryString = 'INSERT INTO organization ("name", "register_date") VALUES (\'' +
                            payload.name + '\', \'' +
                            payload.registerDate + '\');';

        return queryString;
    },

    getOrganization: function (orgID) {
        var queryString = 'SELECT id, name, register_date FROM organization WHERE id = \'' + orgID + '\';';

        return queryString;
    },

    getRecentOrganization: function () {
        var queryString = 'SELECT id, name, register_date FROM organization WHERE  id = (SELECT MAX(id) FROM organization);'

        return queryString;
    },

    editOrganizations: function (payload) {
        var queryString = 'UPDATE organization SET name = \'' + payload.name +
                            '\' register_date = \'' + payload.registerDate +
                            '\' WHERE id = ' + payload.id + ';';

        return queryString;
    },

    deleteOrganization: function (orgID) {
        var queryString = 'DELETE FROM organization WHERE id = ' + orgID + ';';

        return queryString;
    },

    getUserList: function () {
        var queryString = 'SELECT id, org_id, username, is_admin FROM users;';

        return queryString;
    },

    getUserByQuery: function (query) {
        var queryString = 'SELECT id, org_id, username, hashed_password, first_name, last_name, display_name, is_admin, flsa FROM users WHERE';
        var setId = false;

        if (query.id) {
            queryString += ' id = \'' + query.id + '\'';
            setId = true;
        }
        if (query.username) {
            if (setId) {
                queryString += ' AND';
            }
            queryString += ' username = \'' + query.username + '\'';
        }
        queryString += ';';

        return queryString;
    },

    getUser: function (userID) {
        var queryString = 'SELECT id, org_id, first_name, last_name, display_name, is_admin, flsa FROM users WHERE id = ' + userID + ';';

        return queryString;
    },

    createUser: function (payload) {
        var queryString = 'INSERT INTO users (username, hashed_password, org_id, sup_id, first_name, last_name, display_name, is_admin) VALUES (\'' +
                            payload.username + '\', \'' +
                            payload.password + '\', ' +
                            payload.orgID + ', null, \'' +
                            payload.firstName + '\', \'' +
                            payload.lastName + '\', \'' +
                            payload.firstName + ' ' + payload.lastName + '\', ' + 'true);';

        return queryString;
    },

    updateUser: function (userId, payload) {
        var queryString = 'UPDATE users SET username = \'' + payload.username +
                            '\' WHERE id = \'' + userId + '\';';

        return queryString;
    },

    getUserSettings: function (userId) {
        var queryString = 'SELECT user_id, settings_data FROM settings WHERE user_id = ' + userId + ';';

        return queryString;
    },

    changeUserPassword: function (userId, hashedPassword) {
        var queryString = 'UPDATE users SET hashed_password = \'' + hashedPassword +
                            '\' WHERE id = ' + userId + ';';

        return queryString;
    },

    deleteUser: function (userId) {
        var queryString = 'DELETE FROM users WHERE id = ' + userId + ';';

        return queryString;
    },

    getTimecards: function (orgID) {
        var queryString = 'SELECT timecard.id, user_id, start_date, end_date, employee_signed, admin_signed FROM timecard LEFT JOIN users ON timecard.user_id = users.id WHERE users.org_id = ' + orgID;

        return queryString;
    },

    createTimecard: function (payload) {
        var queryString = 'INSERT INTO timecard (user_id, start_Date, end_date, employee_signed, admin_signed) VALUES (\'' +
                            payload.userID + '\' \'' +
                            payload.startDate + '\ \'' +
                            payload.endDate + '\ \'' +
                            payload.employeeSigned + '\ \'' +
                            payload.adminSigned + '\');';

        return queryString;
    },

    getTimecard: function (cardID) {
        var queryString = 'SELECT id, user_id, start_date, end_date, employee_signed, admin_signed FROM timecard WHERE id = ' +
                            cardID + ';';

        return queryString;
    },

    editTimecard: function (payload) {
        var queryString = 'UPDATE timecard SET user_id = \'' + payload.userID +
                            '\' start_date = \'' + payload.startDate +
                            '\' end_date = \'' + payload.endDate +
                            '\' employee_signed = \'' + payload.employeeSigned +
                            '\' admin_signed = \'' + payload.adminSigned +
                            '\' WHERE id = ' + payload.id + ';';

        return queryString;
    },

    deleteTimecard: function (cardID) {
        var queryString = 'DELETE FROM timecard WHERE id = ' + cardID + ';';

        return queryString;
    },

    getTimeRecords: function (timecardID) {
        var queryString = 'SELECT time_record.id, date, time, type FROM time_record LEFT JOIN timecard ON timecard.id = time_record.timecard_id WHERE timecard.id = ' + timecardID;

        return queryString;
    },

    uploadFile: function (payload) {
        var queryString = 'INSERT INTO file (client_id, name, type, date, base_64_string) VALUES (\'' +
                            payload.clientID + '\', \'' +
                            payload.name + '\', \'' +
                            payload.type + '\', \'' +
                            payload.date + '\', \'' +
                            payload.fileString + '\');';

        return queryString;
    },

    deleteFile: function (fileID) {
        var queryString = 'DELETE FROM file WHERE id = ' + fileID + ';';
        return queryString;
    },

    getClientFiles: function (clientID) {
        var queryString = 'SELECT id, name, type, date, base_64_string FROM file WHERE client_id = ' + clientID + ';';
        return queryString;
    },

    getProfilePicture: function (clientID) {
        var queryString = 'SELECT name, type, base_64_string FROM file WHERE client_id = ' + clientID +
                            'AND type=\'profile_picture\'' +
                            'AND id = (SELECT MAX(id) FROM file WHERE client_id = ' + clientID +
                            ' AND type=\'profile_picture\');';
        return queryString;
    },

    getReviews: function () {
        var queryString = 'SELECT user_id, flsa, date, next_review_date, days_until_review, status FROM;';

        return queryString;
    },

    createReview: function (payload) {
        var queryString = 'INSERT INTO review (user_id, date, next_review_date, days_until_review, status) VALUES (\'' +
                                payload.userID + '\', \'' +
                                payload.date + '\', \'' +
                                payload.nextReviewDate + '\', \'' +
                                payload.daysUntilReview + '\', \'' +
                                payload.status + '\');';

        console.log(queryString);
        return queryString;
    },

    getReview: function (reviewID) {
        var queryString = 'SELECT user_id, date, next_review_date, days_until_review, status FROM review WHERE id = ' + reviewID + ';';

        return queryString;
    },

    editReview: function (payload) {
        var queryString = 'UPDATE review SET user_id = \'' + payload.userID +
                            '\', date = \'' + payload.date +
                            '\', next_review_date = \'' + payload.nextReviewDate +
                            '\', days_until_review = \'' + payload.daysUntilReview +
                            '\', status = \'' + payload.status +
                            '\' WHERE id = ' + payload.id + ';';

        console.log(queryString);

        return queryString;
    },

    deleteReview: function (reviewID) {
        var queryString = 'DELETE from review WHERE id = ' + reviewID + ';';

        return queryString;
    },

    getReviewDash: function (orgID) {
        var queryString = `WITH CTE1 AS 
            (SELECT a.id, a.flsa, a.display_name AS display_name, b.display_name AS supervisor, MAX(date) AS date, MAX(next_review_date) as next_review_date, status, MAX(days_until_review) AS days_until_review 
            FROM users a LEFT JOIN review ON a.id = review.user_id LEFT JOIN users b on a.sup_id = b.id
            WHERE a.org_id = ` + orgID + `
            GROUP BY a.id, a.flsa, a.display_name, b.display_name, date, next_review_Date, status, days_until_review, review.id HAVING review.id = MAX(review.id)),
            CTE2 AS
            (SELECT distinct a.* FROM CTE1 a LEFT OUTER JOIN CTE1 b ON a.id = b.id AND a.days_until_review < b.days_until_review WHERE b.id IS NULL)

            SELECT * FROM CTE2`;

        return queryString;
    },

    getUserReviews: function (userID) {
        var queryString = 'SELECT review.id, b.display_name AS supervisor, date, next_review_date, status, days_until_review FROM users a LEFT JOIN review on a.id = review.user_id LEFT JOIN users b on a.sup_id = b.id WHERE a.id = ' + userID + ';';

        return queryString;
    }
};

module.exports = queries;
