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

	var createUser = function (data) {
		$.ajax({
			url: 'api/users',
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
	
	$('#register').click(function () {

		var firstName = $('#first_name').val();
		var lastName = $('#last_name').val();
		var orgName = $('#org_name').val();

		var d = new Date();
		var month = d.getMonth()+1;
		var day = d.getDate();
		var registerDate = d.getFullYear() + '/' +
		    (month<10 ? '0' : '') + month + '/' +
		    (day<10 ? '0' : '') + day;

		var username = $('#username').val();
		var password = $('#password').val();
		var confirmPassword = $('#confirm_password').val();

		var data = {
			firstName: firstName,
			lastName: lastName,
			orgName: orgName,
			registerDate: registerDate,
			username: username,
			password: password,
			confirmPassword: confirmPassword
		};
		
		if (data.password === data.confirmPassword) {
			createOrganization(data);
			createUser(data);
		}
	});

});