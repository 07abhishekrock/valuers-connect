$(function () {
	var page = 1,
		limit = 15,
		totalrecord = 0;

	fetchData();

	document.getElementById("prev-btn").addEventListener("click", function () {
		if (page > 1) {
			page--;
			fetchData();
		}		else{
			window.alert("There is no further data available");
		}
		console.log("Prev Page: " + page);
	});

	// handling the next-btn
	document.getElementById("next-btn").addEventListener("click",function () {
		if (totalrecord ===15 ) {
			page++;
			fetchData();
		}
		else{
			window.alert("There is no further data available");
		}
		console.log("Next Page: " + page);
	});

	function fetchData() {
		// ajax() method to make api calls
		$.ajax({
			url: "/api/v1/job",
			type: "GET",
			data: {
				page: page,
				limit: limit,
			},
			success: function (data) {
				console.log(data);

				if (data.status) {
					var dataArr = data.data;
					totalrecord = data.result;
					console.log(dataArr);

					var html = "";

					for (var i = 0; i < data.result; i++) {
						var u = i + 1;
						html +=
							" <tr>" +
							" <td>" +
							u +
							"</td>" +
							" <td>" +
							` <a   href="/job-detail/${dataArr[i]._id}">${dataArr[i].position}</a>` +
							"  </td>" +
							"<td>" +
							dataArr[i].location +
							" </td>" +
							" <td>" +
							dataArr[i].country +
							"</td>" +
							'<td class="smallcolumn">' +
							`<a onclick= 'return confirm("Are you sure?")' href=/api/v1/job/delete/${dataArr[i]._id}>` +
							' <i class="fas fa-trash-alt"></i>' +
							"     </a>" +
							" </td>" +
							' <td class="smallcolumn">' +
							' <a   href="/admin/updatejob/' +
							dataArr[i]._id +
							'">' +
							'<i class="fas fa-pen"></i>' +
							" </a>" +
							"</td>" +
							"</tr>";
					}
					$("#adminjobajaxdiv").html(html);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			},
		});
	}
});
