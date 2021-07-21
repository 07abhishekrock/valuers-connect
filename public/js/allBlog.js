var limit=5

function fetchData(lim) {
		// ajax() method to make api calls
		$.ajax({
			url: "/api/v1/blog",
			type: "GET",
			data: {
				limit: lim,
			},
			beforeSend: function () {
				var html = `<div class=loader_wrap>
      						<div class="loader"></div></div>`;
				$("#spinn").html(html);
			},
			success: function (data) {
				console.log(data);

				if (data.status) {
					var dataArr = data.data;
					totalrecord = data.totalRecord;
					console.log(dataArr);

					var html = "";
					for (var i = 0; i < dataArr.length; i++) {
						let images = [];
						if( dataArr[i].blogFeatureImage !== null && dataArr[i].blogFeatureImage !== undefined  ){
							images = dataArr[i].blogFeatureImage.split(",");
						}

						html += `<div class="grid-element">
							<a   href="/blog/${dataArr[i]._id}">
							<div style="background-image:url('${images[0]}')">
								<span class="inner-span" style="display:none"></span>
							</div>
							<p>
								${dataArr[i].title}
							</p>
							</a>
						</div>
						`
						// html +=
						// 	'<div class="past-episode-row-margin col-md-6 col-lg-4">' +
						// 	'<div class="card" style="width: 21rem;position: relative;">' +
						// 	'<img class="card-img-top" src="' +
						// 	 dataArr[i].blogFeatureImage +
						// 	'" alt="Card image cap"' +
						// 	'style="margin-top:-35px;z-index: 0;">' +
						// 	'<div class="card-body">' +
						// 	'<p class="past-episode-heading"><span class="past-episode-heading-bold"><a   href="/blog/' +
						// 	dataArr[i]._id +
						// 	'">' +
						// 	dataArr[i].title +
						// 	" </a> </span></p>" +
						// 	//   '<p class="past-episode-heading">'+
						// 	//   "</p>"+;
						// 	`<a   href= /blog/${dataArr[i]._id}  class="guest-show-episode">Read more <i` +
						// 	'class="fas fa-chevron-right guest-right-arrow"></i></a>' +
						// 	"</div>" +
						// 	"</div>" +
						// 	"</div>";
					}
					$("#blogs-result").html(html);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			},
		});
	}









$(function () {
	fetchData(limit);
});



window.addEventListener('scroll', () => {
   limit=limit+1
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
	console.log( { scrollTop, scrollHeight, clientHeight});
	
	if(clientHeight + scrollTop >= scrollHeight-20) {
		// show the loading animation
	fetchData(limit)
	}
});