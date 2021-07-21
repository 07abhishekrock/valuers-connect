$(function () {
	var page = 1,
		limit = 5,
		totalrecord = 0;

	fetchData();

	$(".prev-btn").on("click", function () {
		if (page > 1) {
			page--;
			fetchData();
		}
		console.log("Prev Page: " + page);
	});

	// handling the next-btn
	$(".next-btn").on("click", function () {
		if (page * limit < totalrecord) {
			page++;
			fetchData();
		}
		console.log("Next Page: " + page);
	});

	function fetchData() {
		// ajax() method to make api calls
		$.ajax({
			url: "/api/v1/newsletter",
			type: "GET",
			data: {
				page: page,
				limit: 15,
			},
			success: function (data) {
				console.log(data);

				if (data.status) {
					var dataArr = data.newsLetters;
					console.log(dataArr);

					var html = "";

					for (var i = 0; i < data.newsLetters.length; i++) {
						var u = i + 1;
						html +=
							" <tr>" +
							" <td>" +
							u +
							"</td>" +
							" <td>" +
							` <a   href="${data.newsLetters[i].filelink}">${data.newsLetters[i].description}</a>` +
							"  </td>" +
							'<td>' +
							`<a onclick= 'return confirm("Are you sure?")' href="/api/v1/newsletter/del/${dataArr[i]._id}">` +
							' <i class="fas fa-trash-alt"></i>' +
							"     </a>" +
							" </td>" +
							"</tr>";
					}
					$("#admin-newsletter-ajaxdiv").html(html);
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
