var viewRoutes = [
    {
        path: '/static/{path*}',
        method: 'GET',
        config: {
            auth: false
        },
        handler: {
            file: function (req) {
                return req.params.path;
            }
        }
    },

    {
        path: '/',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('index.html', {

            });
        }
    },

    {
        path: '/login',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('login.html', {

            });
        }
    },

    {
        path: '/settings',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('settings.html', {

            });
        }
    },

    {
        path: '/profile',
        method: 'GET',
        config: {
            auth: false
        },
        handler: function (req, res) {
            res.view('profile.html', {
                
            });
        }
    }
];

module.exports = viewRoutes;
