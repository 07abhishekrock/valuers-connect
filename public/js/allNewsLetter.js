
function fetchData(flag) {
		// ajax() method to make api calls
		let loading_bar = document.querySelector('ul.newsletter-list');
		$.ajax({
			url: "/api/v1/newsletter",
			type: "GET",
			beforeSend: function () {
				loading_bar.classList.add('loading');
			},
			success: function (data) {
				console.log(data);
				loading_bar.classList.remove('loading');

				if (data.status) {
					var dataArr = data.newsLetters;
					console.log(dataArr);

					var new_html = "";
					var archive_html = "";
					for (var i = 0; i < dataArr.length; i++) {
						let news_letter_date = new Date(dataArr[i].createdAt);
						let current_date = new Date();
						if(news_letter_date.getFullYear() < current_date.getFullYear()){
							//archive section
							archive_html += `<li class="grid-element">
								<a   href="${dataArr[i].filelink}">
									${dataArr[i].description}<i class="fas fa-file-pdf"></i>
								</a>
							</li>
							`
						}
						else{

							new_html += `<li class="grid-element">
									<a   href="${dataArr[i].filelink}">
										${dataArr[i].description}<i class="fas fa-file-pdf"></i>
									</a>
								</li>
							`

						}
						
					}
					if(flag === 0){
						$("#newsletter-result").html(new_html);
					}
					else{
						$("#newsletter-result").html(archive_html);
					}
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
	//adding event listener to tab clicks
	fetchData(0);
	let tab = document.querySelector('div.newsletter-tab');
	Array.from(tab.children).forEach((element , index)=>{
		element.addEventListener('click' , (e)=>{
			tab.setAttribute('selected_index',`${index}`);
			fetchData(index);
		})
	})

});

//Upload the files
// var form = new FormData();
// form.append("newsletterdoc", fileInput.files[0], "/C:/Users/Santhosh kumar/Documents/sample.pdf");
// form.append("description", "Sample 1");

// var settings = {
//   "url": "http://localhost:3500/api/v1/newsletter",
//   "method": "POST",
//   "timeout": 0,
//   "processData": false,
//   "mimeType": "multipart/form-data",
//   "contentType": false,
//   "data": form
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });


// Get One Newsletter
// var form = new FormData();
// form.append("newsletterdoc", fileInput.files[0], "/C:/Users/Santhosh kumar/Documents/sample.pdf");
// form.append("description", "Sample 1");

// var settings = {
//   "url": "http://localhost:3500/api/v1/newsletter/60a4ec67a0f50112140c6ed6",
//   "method": "GET",
//   "timeout": 0,
//   "processData": false,
//   "mimeType": "multipart/form-data",
//   "contentType": false,
//   "data": form
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });

//Delete a file
// var form = new FormData();
// form.append("newsletterdoc", fileInput.files[0], "/C:/Users/Santhosh kumar/Documents/sample.pdf");
// form.append("description", "Sample 1");

// var settings = {
//   "url": "http://localhost:3500/api/v1/newsletter/del/60a4ec67a0f50112140c6ed6",
//   "method": "GET",
//   "timeout": 0,
//   "processData": false,
//   "mimeType": "multipart/form-data",
//   "contentType": false,
//   "data": form
// };

// $.ajax(settings).done(function (response) {
//   console.log(response);
// });