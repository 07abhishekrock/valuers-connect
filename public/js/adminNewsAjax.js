$(function () {
	var page = 1,limit = 15,totalrecord = 0;

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
			url: "/api/v1/news",
			type: "GET",
			data: {
				page: page,
				limit: 15,
			},
			success: function (data) {
				console.log(data);

				if (data.status) {
					var dataArr = data.data;
					totalrecord = data.result;
					console.log(dataArr);

					var html = "";

					for (var i = 0; i < dataArr.length; i++) {
						var u = i + 1;
						html +=
							" <tr>" +
							" <td class='bigcol'>" +
							`  <a   href="/news/${dataArr[i]._id}">` +
							dataArr[i].title +
							"</a>" +
							" </td>" +
							"<td class='' style='width:120px !important'>2018-12-02" +
							" </td>" +
							'  <td class="smallcolumn">' +
							`<a onclick= 'return confirm("Are you sure?")' href=/api/v1/news/delete/${dataArr[i]._id}>` +
							' <i class="fas fa-trash-alt"></i>' +
							"   </a>" +
							' <a   href="/admin/updatenews/' +
							dataArr[i]._id +
							'">' +
							'  <i class="fas fa-pen"></i>' +
							"  </a>" +
							"  </td>" +
							" </tr>";
					}
					$("#adminnewsajaxdiv").html(html);
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
