$(function () {
	var page = 1,
		limit = 5,
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
		if (totalrecord === 10 ) {
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
			url: "/api/v1/upcoming-events",
			type: "GET",
			data: {
				page: page,
				limit: 10,
			},
			success: function (data) {
				console.log(data);

				if (data.status) {
					var dataArr = data.data;
					totalrecord = data.result;
					console.log(data.result);

					var html = "";
					var ts
					for (var i = 0; i < data.result; i++) {
					 ts=new Date(dataArr.events[i].fromDate)
						var u = i + 1;
						html +=
							" <tr>" +
							" <td>" +
							u +
							"</td>" +
							" <td>" +
							`<a   href="/events/${dataArr.events[i]._id}">` +
							dataArr.events[i].title +
							"</a>" +
							" </td>" +
							"<td>" +
							ts.toLocaleString() 
							// dataArr.events[i].date
							+" </td>" +
							'  <td class="smallcolumn" style="text-align: center;justify-content:center;">' +
							' <a   href="/admin/delete/events/' +
							dataArr.events[i]._id +
							'">' +
							' <i class="fas fa-trash-alt"></i>' +
							"   </a>" +
							' <a   href="event-update/' +
							dataArr.events[i]._id +
							'">' +
							'  <i class="fas fa-pen"></i>' +
							"  </a>" +
							"  </td>" +
							" </tr>";
					}
					$("#adminupcomingeventdiv").html(html);
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
