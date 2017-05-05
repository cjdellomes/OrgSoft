$(function (event) {

	var initiateDataTable = function () {

		var table = $('#Table').DataTable({
			initComplete: function (settings, json) {
			    $("#Table").show();
			},
			paging: false,
			dom: "Bfrtip",
			buttons: ['copy', 'excel', 'pdf', 'csv', 'print'],
			columnDefs: [ {
				targets: -1,
				data: null,
				defaultContent: `<div class="col-xs-1"><a href="employee-details"><span title="Employee Details"><i class="fa fa-info-circle fa-2x details-employee"></i></span></a></div>
                <div class="col-xs-1"><a><span title="Edit Employee"><i class="fa fa-pencil-square-o fa-2x edit-employee"></i></span></a></div>
                <div class="col-xs-1"><a><span title="Delete Employee"><i class="fa fa-trash-o fa-2x delete-employee"></i></span></a></div>`
			} ]
		});

		// On column text box change, search input and redraw datatable
		table.columns().eq(0).each(function (colIdx) {
		    $("input", table.column(colIdx).header()).on("keyup change", function () {
		        table.column(colIdx)
		            .search(this.value)
		            .draw();
		    });

		    // When clicking the search box, the sort won't occur
		    $("input", table.column(colIdx).header()).on("click", function (e) {
		        e.stopPropagation();
		    });
		});

		// Move datatables search to the panel header
		$('.dataTables_filter').appendTo('#dt-search');

		// Move datatables export buttons to the panel header
		$('.dt-buttons').appendTo('#dt-buttons');
		$('.buttons-html5').hide();
		$('.buttons-print').hide();

		// Show export button based on dropdown selection
		$('#export').change(function () {
		    var option = $(this).val();
		    $('.buttons-html5').hide();
		    $('.buttons-print').hide();
		    if (option != "") {
		        var button = '.buttons-' + option;
		        $(button).show();
		    }
		});

		return table;
	}

	var getUser = function (userID, table) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/users/get/' + userID,
            method: 'GET',
            success: function (data) {
                console.log(data);

                var orgID = data.result.rows[0].org_id
                getUsers(orgID, table);
            },
            error: function (xhr) {
                console.log(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
    }

	var getUsers = function (orgID, table) {
		$.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/users/dash/' + orgID,
            method: 'GET',
            success: function (data) {
                console.log(data);

                var rows = data.result.rows;

                if (!$.fn.DataTable.isDataTable('#Table')) {
                    table = $('#Table').DataTable({
						initComplete: function (settings, json) {
						    $("#Table").show();
						},
						paging: false,
						dom: "Bfrtip",
						buttons: ['copy', 'excel', 'pdf', 'csv', 'print'],
					});
                } else {
                    table = $('#Table').DataTable();
                }

                table.rows().remove().draw();

                rows.forEach(function (row) {

                	var row = table.row.add([
                		row.id,
                		row.sup_id,
                		row.display_name,
                		row.is_admin,
                		row.flsa,
                		null
                	]).draw(false);
                });
            },
            error: function (xhr) {
                console.log(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
    }

    var createUser = function (userID, payload) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/users/get/' + userID,
            method: 'GET',
            success: function (data) {
                console.log(data);

                var orgID = data.result.rows[0].org_id
                payload.orgID = orgID;
                console.log(payload);
                $.ajax({
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
                    },
                    url: 'api/users',
                    method: 'POST',
                    data: payload,
                    success: function (data) {
                        console.log(data);

                        if (!$.fn.DataTable.isDataTable('#Table')) {
                            table = $('#Table').DataTable({
                                initComplete: function (settings, json) {
                                    $("#Table").show();
                                },
                                paging: false,
                                dom: "Bfrtip",
                                buttons: ['copy', 'excel', 'pdf', 'csv', 'print']
                            });
                        } else {
                            table = $('#Table').DataTable();
                        }

                        table.rows().remove().draw();

                        getUser(localStorage.getItem('userID'), table);

                        $('#add-employee-modal').modal('hide');
                        $('#employee-login-username').val('');
                        $('#employee-login-password').val('');
                        $('#employee-login-confirm-password').val(''),
                        $('#employee-id').html('');
                        $('#employee-supervisor-id').val(0),
                        $('#employee-first-name').val('');
                        $('#employee-last-name').val('');
                        $('#employee-is-admin').val('false');
                        $('#employee-flsa').val('N');
                    },
                    error: function (xhr) {
                        console.log(xhr);

                        if (xhr.status === 401) {
                            localStorage.removeItem("authorization");
                        }
                    }
                }).done(function (data) {

                });
            },
            error: function (xhr) {
                console.log(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
    }

    var editUser = function (data) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/users/edit',
            method: 'POST',
            data: data,
            success: function (data) {
                console.log(data);

                if (!$.fn.DataTable.isDataTable('#Table')) {
                    table = $('#Table').DataTable({
                        initComplete: function (settings, json) {
                            $("#Table").show();
                        },
                        paging: false,
                        dom: "Bfrtip",
                        buttons: ['copy', 'excel', 'pdf', 'csv', 'print']
                    });
                } else {
                    table = $('#Table').DataTable();
                }

                table.rows().remove().draw();

                getUser(localStorage.getItem('userID'), table);

                $('#add-employee-modal').modal('hide');
                $('#employee-login-username').val('');
                $('#employee-login-password').val('');
                $('#employee-login-confirm-password').val(''),
                $('#employee-id').html('');
                $('#employee-supervisor-id').val(0),
                $('#employee-first-name').val('');
                $('#employee-last-name').val('');
                $('#employee-is-admin').val('false');
                $('#employee-flsa').val('N');
            },
            error: function (xhr) {
                console.log(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
    }

    var deleteUser = function (userID) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/users/delete/' + userID,
            method: 'POST',
            success: function (data) {
                console.log(data);

                if (!$.fn.DataTable.isDataTable('#Table')) {
                    table = $('#Table').DataTable({
                        initComplete: function (settings, json) {
                            $("#Table").show();
                        },
                        paging: false,
                        dom: "Bfrtip",
                        buttons: ['copy', 'excel', 'pdf', 'csv', 'print']
                    });
                } else {
                    table = $('#Table').DataTable();
                }

                table.rows().remove().draw();

                getUser(localStorage.getItem('userID'), table);
            },
            error: function (xhr) {
                console.log(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
    }

    var deleteTimecards = function (userID) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/timecard/delete/user/' + userID,
            method: 'POST',
            success: function (data) {
                console.log(data);
            },
            error: function (xhr) {
                console.log(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
    }

    var deleteReviews = function (userID) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/review/delete/user/' + userID,
            method: 'POST',
            success: function (data) {
                console.log(data);
            },
            error: function (xhr) {
                console.log(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
    }

    var deleteTimeRecords = function (timecardID) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/timerecord/delete/timecard/' + timecardID,
            method: 'POST',
            success: function (data) {
                console.log(data);
            },
            error: function (xhr) {
                console.log(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
    }

    var getTimecards = function (userID) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/timecard/user/' + userID,
            method: 'GET',
            success: function (data) {
                console.log(data);

                var rows = data.result.rows;

                rows.forEach(function (row) {
                    deleteTimeRecords(row.id);
                });

            },
            error: function (xhr) {
                console.log(xhr);

                if (xhr.status === 401) {
                    localStorage.removeItem("authorization");
                }
            }
        }).done(function (data) {

        });
    }

    var populateModal = function (data) {
        $('#employee-id').html(data.id);
        $('#employee-supervisor-id').val(data.supID),
        $('#employee-first-name').val(data.firstName);
        $('#employee-last-name').val(data.lastName);
        $('#employee-is-admin').val(data.isAdmin);
        $('#employee-flsa').val(data.flsa);
    }

	var table = initiateDataTable();

	getUser(localStorage.getItem('userID'), table);

	table.on( 'click', 'button', function () {
        var data = table.row( $(this).parents('tr') ).data();
        localStorage.setItem("userDetailsID", data[0]);
    } );

    table.on( 'click', 'i', function () {
        var data = table.row( $(this).parents('tr') ).data();
        if ($(this).hasClass('delete-employee')) {
            getTimecards(data[0]);
            deleteTimecards(data[0]);
            deleteReviews(data[0]);
            deleteUser(data[0])
        } else if ($(this).hasClass('edit-employee')) {
            var data = {
                id: data[0],
                supID: data[1],
                firstName: data[2].substr(0,data[2].indexOf(' ')),
                lastName: data[2].substr(data[2].indexOf(' ')+1),
                isAdmin: '' + data[3],
                flsa: data[4]
            };
            populateModal(data);
            $('#add-employee-modal').modal('show');
            $('#employee-login-username').hide();
            $('#employee-login-password').hide();
            $('#employee-login-confirm-password').hide();
        }
    } );

    $('#add-employee-modal').on('hidden.bs.modal', function () {
        $('#add-employee-modal').modal('hide');
        $('#employee-login-username').hide();
        $('#employee-login-password').hide();
        $('#employee-login-confirm-password').hide(),
        $('#employee-username').val('');
        $('#employee-password').val('');
        $('#employee-confirm-password').val('');
        $('#employee-id').html('');
        $('#employee-supervisor-id').val(0),
        $('#employee-first-name').val('');
        $('#employee-last-name').val('');
        $('#employee-is-admin').val('false');
        $('#employee-flsa').val('N');
    });

    $('#add-employee-button').click(function () {
        $('#employee-id').html('');
        $('#employee-login-username').show();
        $('#employee-login-password').show();
        $('#employee-login-confirm-password').show();
    });

    $('#cancel-employee').click(function () {
        $('#employee-id').html('');
        $('#employee-login-username').val('');
        $('#employee-login-password').val('');
        $('#employee-login-confirm-password').val('');
        $('#employee-supervisor-id').val(0);
        $('#add-employee-modal').modal('hide');
    });

    $('#submit-employee').click(function () {
        var data = {
            id: $('#employee-id').text(),
            username: $('#employee-username').val(),
            password: $('#employee-password').val(),
            confirmPassword: $('#employee-confirm-password').val(),
            supID: $('#employee-supervisor-id').val(),
            firstName: $('#employee-first-name').val(),
            lastName: $('#employee-last-name').val(),
            displayName: $('#employee-first-name').val() + ' ' + $('#employee-last-name').val(),
            isAdmin: $('#employee-is-admin').val(),
            flsa: $('#employee-flsa').val()
        };

        if ($('#employee-id').text() == '') {
            if (data.password == data.confirmPassword) {
                console.log(data);
                createUser(localStorage.getItem('userID'), data);
            }
        } else {
            editUser(data);
        }
    });

});