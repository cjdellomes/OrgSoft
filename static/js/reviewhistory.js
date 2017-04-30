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
				defaultContent: '<div class="col-xs-1"><a><span title="Edit Review"><i class="fa fa-pencil-square-o fa-2x edit-review"></i></span></a></div><div class="col-xs-1"><a><span title="Delete Review"><i class="fa fa-trash-o fa-2x delete-review"></i></span></a></div>'
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
                $('#employee-flsa').text('FLSA: ' + data.result.rows[0].flsa);
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

	var getReviews = function (table) {
		$.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/review/user/' + localStorage.getItem('reviewHistoryUserID'),
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
                	var nextReviewDate = new Date(row.next_review_date);
                	date = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
                	nextReviewDate = nextReviewDate.getMonth() + 1 + "/" + nextReviewDate.getDate() + "/" + nextReviewDate.getFullYear();

                	var row = table.row.add([
                		row.id,
                		row.supervisor,
                		date,
                		nextReviewDate,
                		row.status,
                		row.days_until_review,
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

	var deleteReview = function (reviewID) {
		$.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/review/delete/' + reviewID,
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

                getReviews(table);
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

    var createReview = function (data) {
        $.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/review/create',
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

                getReviews(table);

                $('#add-review-modal').modal('hide');
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

    var calculateReviewData = function () {
        var userID = localStorage.getItem('reviewHistoryUserID');
        var date = $('#review-date').val();
        var nextReviewDate = $('#next-review-date').val();
        var daysUntilReview = 150;
        var status = 'Future Review';

        var data = {
            userID: userID,
            date: date,
            nextReviewDate: nextReviewDate,
            daysUntilReview: daysUntilReview,
            status: status
        };

        console.log(data);

        return data;
    }

    getUser(localStorage.getItem('reviewHistoryUserID'));

	var table = initiateDataTable();

	getReviews(table);

	table.on( 'click', 'i', function () {
        var data = table.row( $(this).parents('tr') ).data();
        if ($(this).hasClass('delete-review')) {
            deleteReview(data[0])
        }
    } );

    $('#cancel-review').click(function () {
        $('#add-review-modal').modal('hide');
    });

    $('#submit-review').click(function () {
        createReview(calculateReviewData());
    });

    $("#review-date").datepicker();
    $("#next-review-date").datepicker();

});