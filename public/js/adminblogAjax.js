
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
			url: "/api/v1/blog",
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

					for (var i = 0; i < dataArr.length; i++) {
						var u = i + 1;
						html +=
							" <tr>" +
							" <td class='bigcol'>" +
							`  <a   href="/blog/${dataArr[i]._id}">` +
							dataArr[i].title +
							"</a>" +
							" </td>" +
							'  <td class="smallcolumn" style="justify-content:center;">' +
							`<a onclick="return confirm('Are you Sure ?')" href=/api/v1/blog/del/blog/${dataArr[i]._id}>` +
							' <i class="fas fa-trash-alt"></i>' +
							"   </a>" +
							`<a   href=/admin/updateblog/${dataArr[i]._id}>` +
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
