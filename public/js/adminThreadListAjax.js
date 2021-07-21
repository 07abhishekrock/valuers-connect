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
			url: "/api/v1/forum-replies",
			type: "GET",
			data: {
				page: page,
				limit:limit
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
						try{
							html +=
							" <tr>" +
							" <td>" +
							dataArr[i].id +
							"</td>" +
							"   <td>" +
							`  <a   href="/forum-thread/${dataArr[i].forumThread._id}">`+ dataArr[i].forumThread._id+'</a>    ' +
							"    </td>" +
							"   <td>" +
							dataArr[i].user._id +
							"    </td>" +
							"   <td>" +
							dataArr[i].user.firstName +
							"  </td>" +
							"  <td>" +
							` <a   href=/api/v1/forum-replies/admin/del/reply/${dataArr[i].id}>` +
							' <i class="fas fa-trash-alt"></i>' +
							" </a>" +
							" </td>" +
							"   </tr>";
						}catch(err){
							console.log(err);
						}

					}
					$("#adminthreadajaxdiv").html(html);
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
