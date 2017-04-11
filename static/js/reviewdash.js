$(function (event) {

	var initiateDataTable = function () {

		var table = $('#Table').DataTable({
			initComplete: function (settings, json) {
			    $("#Table").show();
			},
			paging: false,
			dom: "Bfrtip",
			buttons: ['copy', 'excel', 'pdf', 'csv', 'print']
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
	}

	var getReviews = function () {
		$.ajax({
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("authorization"));
            },
            url: 'api/review/dash',
            method: 'GET',
            success: function (data) {
                console.log(data);

                fillTable(data.result.rows)
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

	var fillTable = function (rows) {
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			
			$('#tbody').append('<tr>' + '<td>' + row.flsa + '</td>' +
				'<td>' + row.display_name + '</td>' +
				'<td>' + row.sup_id + '</td>' +
				'<td>' + row.date + '</td>' +
				'<td>' + row.next_review_date + '</td>' +
				'<td>' + row.status + '</td>' +
				'<td>' + row.days_until_review + '</td>');
		}
	}

	initiateDataTable();

	getReviews();

});