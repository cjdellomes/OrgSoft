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
				defaultContent: `<div class="col-xs-1"><a><span title="Edit Time Record"><i class="fa fa-pencil-square-o fa-2x edit-time-record"></i></span></a></div>
                <div class="col-xs-1"><a><span title="Delete Time Record"><i class="fa fa-trash-o fa-2x delete-time-record"></i></span></a></div>`
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

	var getUser = function (userID) {
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

                $('#employee-name').text(data.result.rows[0].display_name);
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

    var getTimeRecords = function (table) {
		$.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/timerecord/' + localStorage.getItem('timecardID'),
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
						buttons: ['copy', 'excel', 'pdf', 'csv', 'print']
					});
                } else {
                    table = $('#Table').DataTable();
                }

                table.rows().remove().draw();

                rows.forEach(function (row) {
                    var date = new Date(row.date);
                	date = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();

                	var row = table.row.add([
                		row.id,
                		date,
                		row.time,
                		row.type,
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

    var createTimeRecord = function (data) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/timerecord/create',
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

                getTimeRecords(table);

                $('#add-time-record-modal').modal('hide');
                $('#time-record-id').html('');
                $('#time-record-date').val('');
                $('#time-record-time').val('');
                $('#time-record-type').val('');
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

    var editTimeRecord = function (data) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/timerecord/edit',
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

                getTimeRecords(table);

                $('#add-time-record-modal').modal('hide');
                $('#time-record-id').html('');
                $('#time-record-date').val('');
                $('#time-record-time').val('');
                $('#time-record-type').val('');
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

    var deleteTimeRecord = function (recordID) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/timerecord/delete/' + recordID,
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

                getTimeRecords(table);
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
        $('#time-record-id').text(data.timeRecordID);
        $('#time-record-date').val(data.date);
        $('#time-record-time').val(data.time);
        $('#time-record-type').val(data.type);
    }

    var table = initiateDataTable();

    getTimeRecords(table);

    $('#add-time-record-modal').on('hidden.bs.modal', function () {
        $('#time-record-id').html('');
        $('#time-record-date').val('');
        $('#time-record-time').val('');
        $('#time-record-type').val('');
    });

    $('#add-time-record-button').click(function () {
        $('#time-record-id').html('');
    });

    $('#cancel-time-record').click(function () {
        $('#time-record-id').html('');
        $('#add-time-record-modal').modal('hide');
    });

    $('#submit-time-record').click(function () {
        var data = {
            id: $('#time-record-id').text(),
            timecardID: localStorage.getItem('timecardID'),
            date: $('#time-record-date').val(),
            time: $('#time-record-time').val(),
            type: $('#time-record-type').val()
        };

        if ($('#time-record-id').text() == '') {
            createTimeRecord(data);
        } else {
            editTimeRecord(data);
        }
    });

    table.on( 'click', 'i', function () {
        var data = table.row( $(this).parents('tr') ).data();
        if ($(this).hasClass('delete-time-record')) {
            deleteTimeRecord(data[0])
        } else {
            var dates = {
                timeRecordID: data[0],
                date: data[1],
                time: data[2],
                type: data[3]
            };
            populateModal(dates);
            $('#add-time-record-modal').modal('show');
        }
    } );

    $("#time-record-date").datepicker();

});