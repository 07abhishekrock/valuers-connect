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
			url: "/api/v1/tender",
			type: "GET",
			data: {
				page: page,
				limit: limit,
			},
			beforeSend: function () {
       
      var html = 
      `<div class=loader_wrap>
      <div class="loader"></div>
      </div>`;
$('#spinn').html(html)
    },
			success: function (data) {
				console.log(data);
 $("#spinn").hide();

				if (data.status) {
					var dataArr = data.data;
					totalrecord = data.result;
					console.log(dataArr);

					var html = "";
						let ts
						let ts2
						let openingdate
						let lastdate
					for (var i = 0; i < data.result; i++) {
						
						// var u = i + 1;
					if(dataArr[i].openingDate){
						ts=new Date(dataArr[i].openingDate)
						openingdate=ts.toLocaleDateString("en-GB")
					}
					else{
						openingdate="N/A"
					}
					if(dataArr[i].lastDate){
						ts2=new Date(dataArr[i].lastDate)
						lastDate=ts2.toLocaleDateString("en-GB")
					}
					else{
						lastDate="N/A"
					}


					// let ts=new Date(dataArr[i].openingDate)
					// let ts2=new Date(dataArr[i].lastDate)

					// let openingdate=ts.toLocaleDateString("en-GB")
					// let lastdate=ts2.toLocaleDateString("en-GB")
					// 	console.log("LLAASSTT  DDAATTEE",lastdate);
					// (dataArr[i].openingDate).split('T')[0] +


						html +=
							" <tr>" +
							" <td>" +
							// u +
							`<a   href=/tender/${dataArr[i]._id}>` +
							"<span id=viewTender style=background-color:#6A1B4D color:white> View </span>" +
							"</a>" +
							"</td>" +
							" <td>" +
							'   <a   href="#">' +
							dataArr[i].tenderId +
							"</a>" +
							"  </td>" +
							"  <td>" +
							dataArr[i].tenderAuthority +
							"  </td>" +
							" <td>" +
								openingdate +
							"  </td>" +
							" <td>" +
							lastDate +
							"  </td>" +
							" <td>" +
							dataArr[i].organizationDetail +
							"  </td>" +
							" <td>" +
							"₹" +
							dataArr[i].emd +
							"  </td>" +
							' <td class="smallcolumn">' +
							` <a onclick= 'return confirm("Are you sure?")' href=/api/v1/tender/delete/tender/${dataArr[i]._id}>` +
							' <i class="fas fa-trash-alt"></i>' +
							" </a>" +
							`<a   href="/admin/updatetender/${dataArr[i]._id}">` +
							' <i class="fas fa-pen"></i>' +
							"  </a>" +
							" </td>" +
							"  </tr>";
					}
					$("#admintenderajaxdiv").html(html);
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
