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

    getOrganizations: function () {
        var queryString = 'SELECT id, name, register_date FROM organization;';

        return queryString;
    },

    editOrganizations: function (payload) {
        var queryString = 'UPDATE organization SET name = \'' + paylaod.name +
                            '\' register_date = \'' + payload.registerDate +
                            '\' WHERE id = ' + payload.id + ';';
    },

    getUserList: function () {
        var queryString = 'SELECT id, org_id, username, is_admin FROM users;';

        return queryString;
    },

    getUserByQuery: function (query) {
        var queryString = 'SELECT id, username, hashed_password FROM users WHERE';
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

    createUser: function (payload) {
        var queryString = 'INSERT INTO users ("username", "hashed_password") VALUES (\'' +
                            payload.username + '\', \'' +
                            payload.password + '\');';

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
    }
};

module.exports = queries;
