var limit = 10

async function getAllCategories(){
	const categories_list = document.querySelector('#list3 ul.items');
	const response = await axios.get('/api/v1/tender/getAllCategories');
	let html = '';
	if(response.data && response.data.status === 'success'){
		let categories = response.data.categories;
		categories.forEach((category , index)=>{
			html += `<li>
				<input type="checkbox"/>	
				${category}
			</li>`;
		})
	}
	categories_list.innerHTML = html;	
}
//code added by abhishek jha
async function Filtertender(region , country , category , tender_value , deadline)
{
	let filtered_tenders = await axios.get('/api/v1/tender', {params : {
			//the name of params here should be the same as that in the model.
			//i did not add for tender value or deadline because they are generally searched
			//in a certain range, and I was not very sure on how to implement.
			category : category,
			deadline : deadline
		}
	}
	)

	let data = (filtered_tenders.data);
	let dataArr = data.data;
	let html1 = "";
	let html2 = "";



	for (let i = 0; i < dataArr.length; i++) {
		// var getDate= new Date(dataArr[i].lastDate).toDateString()
		let ts = new Date(dataArr[i].lastDate);
			console.log(ts);
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

					}


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
	fetchFreshtender(limit);
	getAllCategories();
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
				case 'list3' : {values.category.push(check_text.trim());break;}
				case 'list5' : {values.deadline.push(deadline);break;}
			}
		}
	})

	let deadline = document.getElementById('deadline-input').value;
	if(deadline === ''){
		deadline = "3000-12-12";
	}

	Filtertender(values.region , values.country , values.category , values.tender_value, new Date(deadline));



})
