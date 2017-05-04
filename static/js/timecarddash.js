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
				defaultContent: '<a href="timecard-details"><button type="button" class="btn btn-primary">Details</button></a>'
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
                getTimecards(orgID, table);
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

	var getTimecards = function (orgID, table) {
		$.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/timecard/dash/' + orgID,
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
                	var startDate = new Date(row.start_date);
                	var endDate = new Date(row.end_date);
                	startDate = startDate.getMonth() + 1 + "/" + startDate.getDate() + "/" + startDate.getFullYear();
                	endDate = endDate.getMonth() + 1 + "/" + endDate.getDate() + "/" + endDate.getFullYear();

                	var row = table.row.add([
                		row.id,
                		row.user_id,
                		startDate,
                		endDate,
                		row.employee_signed,
                		row.admin_signed,
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

    var createTimecard = function (data) {
        console.log(data);
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/timecard/create',
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

                $('#add-timecard-modal').modal('hide');
                $('#timecard-id').html('');
                $('#timecard-user').val(),
                $('#timecard-start-date').val('');
                $('#timecard-end-date').val('');
                $('#timecard-eployee-signed').val('false');
                $('#timecard-admin-signed').val('false');
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

	var table = initiateDataTable();

	getUser(localStorage.getItem('userID'), table);

	table.on( 'click', 'button', function () {
        var data = table.row( $(this).parents('tr') ).data();
        localStorage.setItem("timecardID", data[0]);
    } );

    $('#add-timecard-modal').on('hidden.bs.modal', function () {
        $('#timecard-id').html('');
        $('#timecard-user').val(),
        $('#timecard-start-date').val('');
        $('#timecard-end-date').val('');
        $('#timecard-eployee-signed').val('false');
        $('#timecard-admin-signed').val('false');
    });

    $('#add-timecard-button').click(function () {
        $('#timecard-id').html('');
    });

    $('#cancel-timecard').click(function () {
        $('#timecard-id').html('');
        $('#add-timecard-modal').modal('hide');
    });

    $('#submit-timecard').click(function () {
        var data = {
            id: $('#timecard-id').val(),
            userID: $('#timecard-user').val(),
            startDate: $('#timecard-start-date').val(),
            endDate: $('#timecard-end-date').val(),
            employeeSigned: $('#timecard-employee-signed').val(),
            adminSigned: $('#timecard-admin-signed').val()
        };

        if ($('#timecard-id').text() == '') {
            createTimecard(data);
        } else {
            editTimecard(data);
        }
    });

    $("#timecard-start-date").datepicker();
    $("#timecard-end-date").datepicker();

});