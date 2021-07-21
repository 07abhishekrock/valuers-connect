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
			url: "/api/v1/banner/get-all-banner",
			type: "GET",
			data: {
				page: page,
				limit: limit,
			},
			success: function (data) {
				console.log(data);

				if (data.status) {
					var dataArr = data.banner;
					console.log(dataArr);

					var html = "";

					for (var i = 0; i < data.banner.length; i++) {
						var u = i + 1;
						html +=
							" <tr>" +
							" <td>" +
							u +
							"</td>" +
							" <td>" +
							` <a   href="${data.banner[i].bannerImage}">${"click to view image"}</a>` +
							"  </td>" +
							'<td>' +
							`<a onclick= 'return confirm("Are you sure?")' href="/api/v1/banner/delete/banner/${dataArr[i]._id}">` +
							' <i class="fas fa-trash-alt"></i>' +
							"     </a>" +
							" </td>" +
							"</tr>";
					}
					$("#adminBannerajaxdiv").html(html);
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
