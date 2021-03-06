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
				defaultContent: '<a href="review-history"><button type="button" class="btn btn-primary">History</button></a>'
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
                getReviews(orgID, table);
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

	var getReviews = function (orgID, table) {
		$.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/review/dash/' + orgID,
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
                    var today = new Date().setHours(0, 0, 0, 0);
                	var date = new Date(row.date);
                	var nextReviewDate = new Date(row.next_review_date);
                	date = date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
                	nextReviewDate = nextReviewDate.getMonth() + 1 + "/" + nextReviewDate.getDate() + "/" + nextReviewDate.getFullYear();
                    var daysUntilReview = dayDiff(today, parseDate(nextReviewDate));
                    var status;
                    if (daysUntilReview > 62 ) {
                        status = 'Future Review';
                    } else if (daysUntilReview > 31) {
                        status = 'Due Within 2 Months';
                    } else if (daysUntilReview >= 0) {
                        status = 'Due Within A Month';
                    } else {
                        status = 'Past Due';
                    }

                	var row = table.row.add([
                		row.id,
                		row.flsa,
                		row.display_name,
                		row.supervisor,
                		date,
                		nextReviewDate,
                		status,
                		daysUntilReview,
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

    var parseDate = function (date) {
        var mdy = date.split('/');
        return new Date(mdy[2], mdy[0] - 1, mdy[1]);
    }

    var dayDiff = function (startDate, endDate) {
        return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    }

	var table = initiateDataTable();

	getUser(localStorage.getItem('userID'), table);

	table.on( 'click', 'button', function () {
        var data = table.row( $(this).parents('tr') ).data();
        localStorage.setItem("reviewHistoryUserID", data[0]);
    } );

});