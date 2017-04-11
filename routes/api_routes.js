var Path = require('path');
var Api = require(Path.join(__dirname, '../api/api.js'));
var Schema = require(Path.join(__dirname, '../api/schema.js'));

/* ajax calls from frontend js files use the path properties
    Example:
    $.ajax({
        url: "api/casemanagers",
        data: data,
        method: "GET",
        success: function (data) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
*/
// details of route format of method, path, handler
// can found in Hapi Routing documentation
var apiRoutes = [
    {
        method: 'GET',
        path: '/hello',
        handler: function (request, reply) { // request and reply come from Hapi package
            reply({
                'hello': 'Welcome to the SPFY webapp!'
            }).code(200);
        }
    },
    {
        method: 'GET',
        path: '/organization',
        handler: Api.getOrganizations
    },
    {
        method: 'GET',
        path: '/organization/{orgID}',
        handler: Api.getOrganization
    },
    {
        method: 'POST',
        path: '/organization/create',
        handler: Api.createOrganization
    },
    {
        method: 'POST',
        path: '/organization/edit',
        handler: Api.editOrganization
    },
    {
        method: 'POST',
        path: '/organization/delete/{orgID}',
        handler: Api.deleteOrganization
    },
    {
        method: 'GET',
        path: '/users',
        handler: Api.getUserList
    },
    {
        method: 'POST',
        path: '/users',
        config: {
            validate: {
                payload: Schema.newUser
            }
        },
        handler: Api.createUser
    },
    {
        method: 'GET',
        path: '/users/{userId}',
        handler: Api.getUser
    },
    {
        method: 'PUT',
        path: '/users/{userId}',
        handler: Api.updateUser
    },
    {
        method: 'POST',
        path: '/sessions',
        config: {
            auth: false,
            validate: {
                payload: Schema.login
            }
        },
        handler: Api.login
    },
    {
        method: 'GET',
        path: '/users/{userId}/settings',
        handler: Api.getUserSettings
    },
    {
        method: 'PUT',
        path: '/users/{userId}/password',
        config: {
            validate: {
                payload: Schema.changeCurrentUserPassword
            }
        },
        handler: Api.changeCurrentUserPassword
    },
    {
        method: 'Delete',
        path: '/users/{userId}',
        handler: Api.deleteUser
    },
    {
        method: 'GET',
        path: '/timecard',
        handler: Api.getTimecards
    },
    {
        method: 'POST',
        path: '/timecard/create',
        handler: Api.createTimecard
    },
    {
        method: 'GET',
        path: '/timecard/{cardID}',
        handler: Api.getTimecard
    },
    {
        method: 'POST',
        path: '/timecard/edit',
        handler: Api.editTimecard
    },
    {
        method: 'POST',
        path: '/timecard/delete/{cardID}',
        handler: Api.deleteTimecard
    },
    {
        method: 'POST',
        path: '/files',
        config: {
            payload: {
                maxBytes: 209715200,
                //output: 'stream',
                //parse: false
            }
        },
        handler: Api.uploadFile
    },
    {
        method: 'GET',
        path: '/files/{clientID}',
        handler: Api.getClientFiles
    },
    {
        method: 'GET',
        path: '/files/profile_picture/{clientID}',
        handler: Api.getProfilePicture
    },
    {
        method: 'POST',
        path: '/files/delete/{fileID}',
        handler: Api.deleteFile
    },
    {
        method: 'GET',
        path: '/review',
        handler: Api.getReviews
    },
    {
        method: 'POST',
        path: '/review/create',
        handler: Api.createReview
    },
    {
        method: 'GET',
        path: '/review/{reviewID}',
        handler: Api.getReview
    },
    {
        method: 'POST',
        path: '/review/edit',
        handler: Api.editReview
    },
    {
        method: 'POST',
        path: '/review/delete/{reviewID}',
        handler: Api.deleteReview
    }
];

// api in this case is a plugin run by the Hapi node package
// each plugin has a register method
module.exports.register = function (server, options, next) {
    server.route(apiRoutes);
    next(); // method called when plugin has completed steps
};


module.exports.register.attributes = {
    name: "api",
    version: "0.0.0"
};
