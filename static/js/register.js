$(function (event) {

	var createOrganization = function (data) {
		$.ajax({
            url: 'api/organization/create',
            method: 'POST',
            data: data,
            success: function (data) {
                console.log(data);
            },
            error: function (xhr) {
                console.log(xhr);
            }
        }).done(function (data) {
            
        });
	};

	var getRecentOrganization = function () {
		$.ajax({
            url: 'api/organization/recent',
            method: 'GET',
            success: function (data) {
                console.log(data);
            },
            error: function (xhr) {
                console.log(xhr);
            }
        }).done(function (data) {
            orgID = data.org_id;
        });
	}

	var createUser = function (payload) {
		$.ajax({
            url: 'api/organization/recent',
            method: 'GET',
            success: function (data) {
                console.log(data);
                payload.orgID = data.result.rows[0].id;
                $.ajax({
                	url: 'api/users',
                	method: 'POST',
                	data: payload,
                	success: function (data) {
                		console.log(data);
                	},
                	error: function (xhr) {
                		console.log(xhr);
                	}
                }).done(function (data) {

                });
            },
            error: function (xhr) {
                console.log(xhr);
            }
        }).done(function (data) {

        });
		
	};
	
	$('#register').click(function () {

		var firstName = $('#first_name').val();
		var lastName = $('#last_name').val();
		var orgName = $('#org_name').val();

		var d = new Date();
		var month = d.getMonth()+1;
		var day = d.getDate();
		var registerDate = d.getFullYear() + '/' +
		    (month < 10 ? '0' : '') + month + '/' +
		    (day < 10 ? '0' : '') + day;

		var username = $('#username').val();
		var password = $('#password').val();
		var confirmPassword = $('#confirm_password').val();

		var orgData = {
			name: orgName,
			registerDate: registerDate
		};

		var userData = {
			username: username,
			password: password,
			confirmPassword: confirmPassword,
			firstName: firstName,
			lastName: lastName
		};
		
		if (userData.password === userData.confirmPassword) {
			createOrganization(orgData);
			createUser(userData);
		}
	});

});