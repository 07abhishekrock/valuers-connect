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
			url: "https://valuers-connect.herokuapp.com/api/v1/news",
			type: "GET",
			data: {
				page: page,
				limit: 9,
			},
			success: function (data) {
				console.log(data);

				if (data.status) {
					var dataArr = data.data;
					totalrecord = data.totalRecord;
					console.log(dataArr);

					var html = "";

					for (var i = 0; i < dataArr.length; i++) {
						html +=
							'<div class="carriertablefull">' +
							'<div class="row container customerorg">' +
							' <div class="col-lg-9 col-md-9">' +
							' <p class="customerorgbold">Customer Org</p>' +
							" </div>" +
							' <div class="col-lg-3 col-md-3">' +
							' <p class="customerorgrey">11 Open Positions</p>' +
							" </div>" +
							" </div>" +
							' <div class="container carriertable">' +
							" <table>" +
							"  <thead>" +
							"   <th>Position</th>" +
							"   <th>Location</th>" +
							"  <th>Country</th>" +
							" <th></th>" +
							"  </thead>" +
							"   <tbody>" +
							"<tr>" +
							"  <td>Senior Renewal Specialist</td>" +
							" <td>Remote</td>" +
							" <td>US</td>" +
							' <td><a   href="/job-detail">Learn More..</a></td>' +
							"  </tr>" +
							"   <tr>" +
							" <td>Senior Renewal Specialist</td>" +
							" <td>Remote</td>" +
							"  <td>US</td>" +
							'  <td><a   href="/job-detail">Learn More..</a></td>' +
							"  </tr>" +
							" <tr>" +
							" <td>Senior Renewal Specialist</td>" +
							" <td>Remote</td>" +
							"  <td>US</td>" +
							' <td><a   href="/job-detail">Learn More..</a></td>' +
							"  </tr>" +
							"  <tr>" +
							"  <td>Senior Renewal Specialist</td>" +
							"   <td>Remote</td>" +
							"  <td>US</td>" +
							'<td><a   href="/job-detail">Learn More..</a></td>' +
							"  </tr>" +
							"  </tbody>" +
							"</table>" +
							"</div>" +
							"</div>";
					}
					$("#carierajaxdiv").html(html);
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
