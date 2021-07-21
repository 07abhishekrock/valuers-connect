// var page=1
var limit = 10

//code added by abhishek jha
async function Filtertender(region , country , category , tender_value , deadline)
{
	let filtered_tenders = await axios.get('/api/v1/tender', {
		//the name of params here should be the same as that in the model.
		//i did not add for tender value or deadline because they are generally searched
		//in a certain range, and I was not very sure on how to implement.


		params:{
			region:region,
			country:country,
			category:category,
		}
	})

	let data = (filtered_tenders.data);
	let dataArr = data.data;
	let html1 = "";
	let html2 = "";

	//initialising empty categories
	let categories = [];


	for (let i = 0; i < dataArr.length; i++) {
		// var getDate= new Date(dataArr[i].lastDate).toDateString()
		let ts = new Date(dataArr[i].lastDate);


		//replace tenderId with the category label when schema is ready
		if(dataArr[i].category && !categories.includes(dataArr[i].category)){
			categories.push(dataArr[i].category)
		}
				console.log(ts < new Date());
				if(ts < new Date()){
					html2 += '<div class="row clienttendercontentbody">' +
					'<div class="col-lg-8">' +
					`<a href="/tender/${
						dataArr[i]._id
					}" class="tenderidsmall"><span style=" font-size:16px"> ${
						i + 1
					})  <b >Tender Id</b></span><span style="color:green; font-size:20px"> : ${
						dataArr[i].tenderId
					}<span> ` +
					"</a><br>" +
					`<a style="font-size:18px" href="/tender/${dataArr[i]._id}">` +
					`${dataArr[i].title}` +
					"</a>" +
					"</div>" +
					'<div class="col-lg-2 clienttenderheadingcenter">' +
					' <span class="phpgreycolor">EMD</span><br>' +
					`<span>${(dataArr[i].emd !== null && dataArr[i].emd !== undefined) ? `₹ ${dataArr[i].emd} ` : "N / A"}</span><br>` +
					// "<span>Million</span><br>" +
					"</div>" +
					' <div class="col-lg-2 clienttenderheadingcenter daysleftpadding">' +
					// "<span></span><br>" +

					`<span>${ts.toLocaleDateString("en-GB")}</span> ` +
					"</div>" +
					"</div>";
				}

		html1 +=
			'<div class="row clienttendercontentbody">' +
			'<div class="col-lg-8">' +
			`<a href="/tender/${
				dataArr[i]._id
			}" class="tenderidsmall"><span style=" font-size:16px"> ${
				i + 1
			})  <b >Tender Id</b></span><span style="color:green; font-size:20px"> : ${
				dataArr[i].tenderId
			}<span> ` +
			"</a><br>" +
			`<a style="font-size:18px" href="/tender/${dataArr[i]._id}">` +
			`${dataArr[i].title}` +
			"</a>" +
			"</div>" +
			'<div class="col-lg-2 clienttenderheadingcenter">' +
			' <span class="phpgreycolor">EMD</span><br>' +
			`<span>${(dataArr[i].emd !== null && dataArr[i].emd !== undefined) ? `₹ ${dataArr[i].emd} ` : "N / A"}</span><br>` +
			// "<span>Million</span><br>" +
			"</div>" +
			' <div class="col-lg-2 clienttenderheadingcenter daysleftpadding">' +
			// "<span></span><br>" +

			`<span>${ts.toLocaleDateString("en-GB")}</span> ` +
			"</div>" +
			"</div>";
	}

	$("#result1").html(html1);
	$("#result2").html(html2);

}


function fetchFreshtender(limit) {
		// ajax() method to make api calls
		$.ajax({
			url: "/api/v1/tender",
			type: "GET",
			data: {
			//   page: page,
			  limit: limit,
			},
			success: function (data) {
				console.log(data);

				if (data.status) {
					var dataArr = data.data;
					totalrecord = data.totalRecord;
					var html1 = "";
					var html2 = "";

					//initialising empty categories
					let categories = [];


					for (var i = 0; i < dataArr.length; i++) {
						// var getDate= new Date(dataArr[i].lastDate).toDateString()
						let ts = new Date(dataArr[i].lastDate);

						console.log(ts < new Date());
						if(ts < new Date()){
							html2 += '<div class="row clienttendercontentbody">' +
							'<div class="col-lg-8">' +
							`<a href="/tender/${
								dataArr[i]._id
							}" class="tenderidsmall"><span style=" font-size:16px"> ${
								i + 1
							})  <b >Tender Id</b></span><span style="color:green; font-size:20px"> : ${
								dataArr[i].tenderId
							}<span> ` +
							"</a><br>" +
							`<a style="font-size:18px" href="/tender/${dataArr[i]._id}">` +
							`${dataArr[i].title}` +
							"</a>" +
							"</div>" +
							'<div class="col-lg-2 clienttenderheadingcenter">' +
							' <span class="phpgreycolor">EMD</span><br>' +
							`<span>${(dataArr[i].emd !== null && dataArr[i].emd !== undefined) ? `₹ ${dataArr[i].emd} ` : "N / A"}</span><br>` +
							// "<span>Million</span><br>" +
							"</div>" +
							' <div class="col-lg-2 clienttenderheadingcenter daysleftpadding">' +
							// "<span></span><br>" +

							`<span>${ts.toLocaleDateString("en-GB")}</span> ` +
							"</div>" +
							"</div>";
						}

						html1 +=
							'<div class="row clienttendercontentbody">' +
							'<div class="col-lg-8">' +
							`<a href="/tender/${
								dataArr[i]._id
							}" class="tenderidsmall"><span style=" font-size:16px"> ${
								i + 1
							})  <b >Tender Id</b></span><span style="color:green; font-size:20px"> : ${
								dataArr[i].tenderId
							}<span> ` +
							"</a><br>" +
							`<a style="font-size:18px" href="/tender/${dataArr[i]._id}">` +
							`${dataArr[i].title}` +
							"</a>" +
							"</div>" +
							'<div class="col-lg-2 clienttenderheadingcenter">' +
							' <span class="phpgreycolor">EMD</span><br>' +
							`<span> ${(dataArr[i].emd !== null && dataArr[i].emd !== undefined) ? `₹ ${dataArr[i].emd} ` : "N / A"}</span><br>` +
							// "<span>Million</span><br>" +
							"</div>" +
							' <div class="col-lg-2 clienttenderheadingcenter daysleftpadding">' +
							// "<span></span><br>" +

							`<span>${ts.toLocaleDateString("en-GB")}</span> ` +
							"</div>" +
							"</div>";



//-----------------------category works only on data that has category ,
//------------------------and the list is updated only once the list items
//-------------------------visible have a category field.

					if(dataArr[i].category && !categories.includes(dataArr[i].category)){
							categories.push(dataArr[i].category)
						}
//----------------------------the categories are added in an array upon loading , this array
//----------------------------is then placed in the category list in the filter box on the page.


					}


					let category_div = document.querySelector('div#list3');
					let html_element = '';


//the categories are pushed into the filter box div from here
				categories.forEach((category)=>{
					html_element += `
						<li>
							<input type="checkbox"/>${category}
						</li>
					`
				})
				category_div.children[1].innerHTML = (html_element);
//ends here

//adding tenders to tender page
					$("#result1").html(html1);
					$("#result2").html(html2);
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
	// var page1 = 1,
	// 	limit1 = 10,
	// 	totalrecord1 = 0;

	fetchFreshtender(limit);



	// function archive() {
	// 	// ajax() method to make api calls
	// 	$.ajax({
	// 		url: "/api/v1/tender",
	// 		type: "GET",
	// 		data: {
	// 			page1: page1,
	// 			limit1: limit1,
	// 			live: "yes",
	// 		},
	// 		success: function (data) {
	// 			console.log(data);

	// 			if (data.status) {
	// 				var dataArr = data.data;
	// 				totalrecord = data.totalRecord;
	// 				console.log("Hellow");
	// 				var html1 = "";

	// 				for (var i = 0; i < dataArr.length; i++) {
	// 					// var getDate= new Date(dataArr[i].lastDate).toDateString()
	// 					let ts = new Date(dataArr[i].lastDate);
	// 					console.log("Date", ts.toLocaleDateString("en-GB"));
	// 					html1 +=
	// 						'<div class="row clienttendercontentbody">' +
	// 						'<div class="col-lg-8">' +
	// 						`<a href="/tender/${
	// 							dataArr[i]._id
	// 						}" class="tenderidsmall"><span> ${i + 1})  Tender Id : ${
	// 							dataArr[i].tenderId
	// 						} </span>` +
	// 						"</a><br>" +
	// 						`<a href="/tender/${dataArr[i]._id}">` +
	// 						`${dataArr[i].title}` +
	// 						"</a>" +
	// 						"</div>" +
	// 						'<div class="col-lg-2 clienttenderheadingcenter">' +
	// 						' <span class="phpgreycolor">EMD</span><br>' +
	// 						`<span>$ ${dataArr[i].emd}</span><br>` +
	// 						// "<span>Million</span><br>" +
	// 						"</div>" +
	// 						' <div class="col-lg-2 clienttenderheadingcenter daysleftpadding">' +
	// 						// "<span></span><br>" +

	// 						`<span>${ts.toLocaleDateString("en-GB")}</span> ` +
	// 						"</div>" +
	// 						"</div>";
	// 				}
	// 				$("#result1").html(html1);
	// 			}
	// 		},
	// 		error: function (jqXHR, textStatus, errorThrown) {
	// 			console.log(jqXHR);
	// 			console.log(textStatus);
	// 			console.log(errorThrown);
	// 		},
	// 	});
	// }

	// var page2 = 1,
	//   limit2 = 5,
	//   totalrecord2 = 0;

	// fetchlivetender();

	// function fetchlivetender() {
	//   // ajax() method to make api calls
	//   $.ajax({
	//     url: "https://valuers-connect.herokuapp.com/api/v1/tender",
	//     type: "GET",
	//     data: {
	//       page2: 1,
	//       limit2: 10,
	//     },
	//     success: function (data) {
	//       console.log(data);

	//       if (data.status) {
	//         var dataArr = data.data;
	//         totalrecord = data.totalRecord;
	//         console.log(dataArr);

	//         var html2 = "";

	//         for (var i = 0; i < 5; i++) {
	//           html2 +=
	//             '<div class="row clienttendercontentbody">' +
	//             '<div class="col-lg-8">' +
	//             '<a href="/insidetenderclientpage" class="tenderidsmall"><span>1) </span> T247 ID : Page-2 ' +
	//             "</a><br>" +
	//             '<a href="/insidetenderclientpage">' +
	//             "Hiring Of Consultant To Conduct Of The Highest And Best Use (Habu) Study With Valuation Of Development And Usufructuary Rights (Dur) And Crafting Of The Terms Of Reference (Tor) For The Development Of" +
	//             "</a>" +
	//             "</div>" +
	//             '<div class="col-lg-2 clienttenderheadingcenter">' +
	//             ' <span class="phpgreycolor">PHP</span><br>' +
	//             "<span>8.35</span><br>" +
	//             "<span>Million</span><br>" +
	//             "</div>" +
	//             ' <div class="col-lg-2 clienttenderheadingcenter daysleftpadding">' +
	//             "<span>19 Days Left</span><br>" +
	//             "<span>28-04-2021</span> " +
	//             "</div>" +
	//             "</div>";
	//         }
	//         $("#result2").html(html2);
	//       }
	//     },
	//     error: function (jqXHR, textStatus, errorThrown) {
	//       console.log(jqXHR);
	//       console.log(textStatus);
	//       console.log(errorThrown);
	//     },
	//   });
	// }

	// var page3 = 1,
	//   limit3 = 5,
	//   totalrecord3 = 0;

	// fetchDatat3();

	// $(".prev-btn3").on("click", function () {
	//   if (page3 > 1) {
	//     page3--;
	//     fetchDatat3();
	//   }
	//   console.log("Prev Page: " + page3);
	// });

	// // handling the next-btn
	// $(".next-btn3").on("click", function () {
	//   if (page3 * limit3 < totalrecord3) {
	//     page3++;
	//     fetchDatat3();
	//   }
	//   console.log("Next Page: " + page3);
	// });

	// function fetchDatat3() {
	//   // ajax() method to make api calls
	//   $.ajax({
	//     url: "https://valuers-connect.herokuapp.com/api/v1/tender",
	//     type: "GET",
	//     data: {
	//       page3: 1,
	//       limit3: 10,
	//     },
	//     success: function (data) {
	//       console.log(data);

	//       if (data.status) {
	//         var dataArr = data.data;
	//         totalrecord = data.totalRecord;
	//         console.log(dataArr);

	//         var html3 = "";

	//         for (var i = 0; i < 5; i++) {
	//           html3 +=
	//             '<div class="row clienttendercontentbody">' +
	//             '<div class="col-lg-8">' +
	//             '<a href="/insidetenderclientpage" class="tenderidsmall"><span>1) </span> T247 ID : Page-3 ' +
	//             "</a><br>" +
	//             '<a href="/insidetenderclientpage">' +
	//             "Hiring Of Consultant To Conduct Of The Highest And Best Use (Habu) Study With Valuation Of Development And Usufructuary Rights (Dur) And Crafting Of The Terms Of Reference (Tor) For The Development Of" +
	//             "</a>" +
	//             "</div>" +
	//             '<div class="col-lg-2 clienttenderheadingcenter">' +
	//             ' <span class="phpgreycolor">PHP</span><br>' +
	//             "<span>8.35</span><br>" +
	//             "<span>Million</span><br>" +
	//             "</div>" +
	//             ' <div class="col-lg-2 clienttenderheadingcenter daysleftpadding">' +
	//             "<span>19 Days Left</span><br>" +
	//             "<span>28-04-2021</span> " +
	//             "</div>" +
	//             "</div>";
	//         }
	//         $("#result3").html(html3);
	//       }
	//     },
	//     error: function (jqXHR, textStatus, errorThrown) {
	//       console.log(jqXHR);
	//       console.log(textStatus);
	//       console.log(errorThrown);
	//     },
	//   });
	// }

});


window.addEventListener('scroll', () => {
   limit=limit+10
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

	console.log( { scrollTop, scrollHeight, clientHeight });

	if(clientHeight + scrollTop >= scrollHeight-5) {
		// show the loading animation
	fetchFreshtender(limit)
	}
});

//abhishek jha
let refine_btn = document.querySelector('#refine-btn');
refine_btn.addEventListener('click',() => {
	// get all checkboxes in refine form

	let checkboxes = document.querySelectorAll("form#filter-form input[type='checkbox']");

	let values = {
		region:[],
		category:[],
		country:[],
		tender_value:[],
		deadline:[]
	}

	checkboxes.forEach((element)=>{
		if(element.checked){
			let list_name = element.parentNode.parentNode.parentNode.id;
			let check_text = element.parentNode.innerText;
			switch(list_name){
				case 'list1' : {values.region.push(check_text);break;}
				case 'list2' : {values.country.push(check_text);break;}
				case 'list3' : {values.category.push(check_text);break;}
				case 'list4' : {values.tender_value.push(check_text);break;}
				case 'list5' : {values.deadline.push(check_text);break;}
			}
		}
	})

	Filtertender(values.region , values.country , values.category , values.tender_value, values.deadline);



})
