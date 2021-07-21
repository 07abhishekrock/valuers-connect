
// var dataArr
var userData

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
		if (totalrecord === 15 ) {
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
			url: "/api/v1/user",
			type: "GET",
			data: {
				page: page,
				limit: limit,
			},
			beforeSend: function () {
				var html = `<div class=loader_wrap>
      						<div class="loader"></div></div>`;
				$("#spinn").html(html);
			},
			success: function (data) {
				$("#spinn").hide();

				if (data.status) {
					 dataArr = data.data;
					totalrecord = data.result;
					console.log(data.result);
					var html = "";

					for (var i = 0; i < data.result; i++) {
						if (dataArr.user[i].isMember) {
							var color = "green";
							var display = "none";
							var text = "Yes";
						} else {
							var color = "red";
							var display = "";
							var text = "No";
						}
						var u = i + 1;
						html +=
							" <tr>" +
							" <td>" +
							u +
							"</td>" +
							" <td>" +
							`  <a href="/user/profile/${dataArr.user[i]._id}">` +
							dataArr.user[i].firstName +
							"</a>" +
							" </td>" +
							" <td>" +
							'  <a>' +
							dataArr.user[i].lastName +
							"</a>" +
							" </td>" +
							" <td>" +
							dataArr.user[i].email +
							"</td>" +
							" <td>" +
							`<span style=color:#6A1B4D>${dataArr.user[i].phoneNo}</span>` +
							"</td>" +
							'  <td class="smallcolumn">' +
							` <a onclick ="return confirm('Are you Sure ?')" href=/admin/delete/user/${dataArr.user[i]._id}` 
							 
							+'>' +
							' <i class="fas fa-trash-alt"></i>' +
							"   </a>" +
							"</td>" +
							'   <td class="smallcolumn">' +
							' <a   href="/updateuser/' +
							dataArr.user[i]._id +
							'">' +
							// '  <i class="fas fa-pen"></i>' +
							"  </a>" +
							"  </td>" +
							`<td><span id=red style=background-color:${color}; >${text}</span></td>` +
							// `<td><button style=display:${display} class="tn btn-primary mailbutton"> <i class="fas fa-envelope"></i> Send Mail</button></td>` +
							" </tr>";
					}
					$("#adminuserajaxdiv").html(html);
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


//Search
window.onload = (event) => {
  console.log('page is fully loaded');
  getDataForSearch()
};


function getDataForSearch(){
	$.ajax({
			url: "/api/v1/user",
			type: "GET",
			
			success: function (data) {
				userData=data.data.user
			}
})}



// function startSearch(userData){
// let filterFirstname=document.getElementById('searchFirstName').value.toLowerCase()
$('#searchFirstName').on('keyup',function(){
	console.log('keyup Work');
	console.log('DARA FROM FUNC',userData);
	let filterFirstname=document.getElementById('searchFirstName').value.toLowerCase()
	var data=searchTable(filterFirstname,userData)
	console.log('Search Filter',filterFirstname);
	console.log('Search data',data);
	console.log('User',userData);
	buildTable(data)
}
)


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
                     //SEARCH BY EMAIL//
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////


$('#searchEmail').on('keyup',function(){
	console.log('keyup Work');
	console.log('DARA FROM FUNC',userData);
	let filterEmail=document.getElementById('searchEmail').value
	var data=searchEmail(filterEmail,userData)
	// console.log('Search Filter',filterEmail);
	// console.log('Search data',data);
	// console.log('User',userData);
	buildTable(data)
}
)
function searchEmail(value,userData){
	var filteredData=[]
	for(var i=0;i<userData.length;i++){
		console.log('hello there');
		value=value.toLowerCase()
		// var name=userData[i].firstName.toLowerCase()
		var email=userData[i].email

		console.log('ye hai Name',name);
		console.log('yea sa');
		if(email.includes(value)){
			filteredData.push(userData[i])
			console.log(true);
		}
		//test
		
		//test
	}
	return filteredData
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
                     //SEARCH BY Mobile No,//
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
$('#phoneNo').on('keyup',function(){
	console.log('keyup Work');
	console.log('DARA FROM FUNC',userData);
	let filterPhone=document.getElementById('phoneNo').value.toLowerCase()
	var data=searchPhone(filterPhone,userData)
	console.log('Search Filter',filterPhone);
	console.log('Search data',data);
	console.log('User',userData);
	buildTable(data)
}
)
function searchPhone(value,userData){
	var filteredData=[]
	for(var i=0;i<userData.length;i++){
		console.log('hello there');
		value=value.toLowerCase()
		var phoneNo=userData[i].phoneNo.toLowerCase()
		console.log('yea sa');
		if(phoneNo.match(value)){
			filteredData.push(userData[i])
			console.log(true);
		}
		else{
			console.log(false);
		}
	}
	return filteredData
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////


// let filterLastname=document.getElementById('searchLastName').value
// let filterEmail=document.getElementById('searchEmail').value

// }

function searchTable(value,userData){
	var filteredData=[]
	for(var i=0;i<userData.length;i++){
		console.log('hello there');
		value=value.toLowerCase()
		var name=userData[i].firstName.toLowerCase()
		console.log('ye hai Name',name);
		console.log('yea sa');
		if(name.includes(value)){
			filteredData.push(userData[i])
			console.log(true);
		}
		else{
			console.log(false);
		}
	}
	return filteredData
}


function buildTable(data){
var html = "";
console.log('lets test this build table ffuunnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',data);
					for (var i = 0; i < data.length; i++) {
						if (data[i].isMember) {
							var color = "green";
							var display = "none";
							var text = "Yes";
						} else {
							var color = "red";
							var display = "";
							var text = "No";
						}
						var u = i + 1;
						html +=
							" <tr>" +
							" <td>" +
							u +
							"</td>" +
							" <td>" +
							'  <a   href="#">' +
							data[i].firstName + 
							"</a>" +
							" </td>" +
							" </td>" +
							" <td>" +
							'  <a   href="#">' +
							data[i].lastName +
							"</a>" +
							" </td>" +
							" <td>" +
							data[i].email +
							"</td>" +
							" <td>" +
							`<span style=color:#6A1B4D>${data[i].phoneNo}</span>` +
							"</td>" +
							'  <td class="smallcolumn">' +
							` <a onclick =" return confirm('Are you Sure ?')" href=/admin/delete/user/${data[i]._id}` 
							 
							 +'>' +
							' <i class="fas fa-trash-alt"></i>' +
							"   </a>" +
							"</td>" +
							'   <td class="smallcolumn">' +
							' <a   href="/updateuser/' +
							data[i]._id +
							'">' +
							// '  <i class="fas fa-pen"></i>' +
							"  </a>" +
							"  </td>" +
							`<td><span id=red style=background-color:${color}; >${text}</span></td>` +
							// `<td><button style=display:${display} class="tn btn-primary mailbutton"> <i class="fas fa-envelope"></i> Send Mail</button></td>` +
							" </tr>";
					}
					$("#adminuserajaxdiv").html(html);
				
}

