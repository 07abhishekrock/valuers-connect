//var userId=document.getElementById('userId').value
//api
const hideAlert = () => {
	const el = document.querySelector(".alert");
	if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
const showAlert = (type, msg, time = 7) => {
	hideAlert();
	const markup = `<div class="alert alert--${type}">${msg}</div>`;
	document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
	window.setTimeout(hideAlert, time * 1000);
};

const registration = async (website , linkedIn , address , position , about, phoneNo ) => {
	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
        const user_id = document.querySelector('#userId').value;
		const res = await axios({
			method: "PATCH",
			url: "/api/v1/user/updateUserContact/" + user_id,
			data: {
                website , linkedIn , address , position , about, phoneNo
            }
		});
		if (res.data.status === "success") {
			showAlert("success", "Profile Updated");
			console.log('Res reg',res.data);
            location.reload();
			// document.querySelector('.registration').innerHTML="registration"
		    // document.getElementById("registrationForm").value="";


		}
	} catch (err) {
		// showAlert("error", err.response.data.message);
				showAlert("error", err);

		// document.querySelector('.registration').innerHTML="registration"

		// if (err.response.status === 500) {
		// 	document.querySelector(".hideAlert").classList.remove("alert");
		// 	document.getElementById("alert").innerHTML =
		// 		"Cannot Submit Form Please Fill Required Field Correctly";
		// } else {
		// 	document.querySelector(".hideAlert").classList.remove("alert");
		// 	document.getElementById("alert").innerHTML = err.response.data.message;
		// }
	}
};
const registrationForm = document.querySelector("form.my-modal");

if (registrationForm) {
    const regSubmit= document.querySelector('#form-contact-submit-update');
	regSubmit.addEventListener("click", (e) => {
		e.preventDefault();

        const website=document.getElementById('website').value
        const linkedIn=document.getElementById('linkedIn').value
        const address=document.getElementById('address').value
        const position=document.getElementById('position').value
        const about=document.getElementById('about').value
        const phoneNo=document.getElementById('phoneNo').value



		// console.log(degree,experience);
		registration(website , linkedIn , address , position , about, phoneNo );
	});
}


///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



const updatePassword = async (passwordCurrent, password) => {
	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
		const res = await axios({
			method: "PATCH",
			url: "/api/v1/user/update_password",
			data: {
				passwordCurrent, password
			},
		});
		if (res.data.status === "success") {
			showAlert("success", 'Password Updated');
			document.querySelector('.updatePassBtn').innerHTML="Submit"
		    document.getElementById("updatePasswordForm").reset();
console.log(res);

		}
	} catch (err) {
		showAlert("error", err);
		document.querySelector('.updatePassBtn').innerHTML="Submit"
        console.log(err);

		// if (err.response.status === 500) {
		// 	document.querySelector(".hideAlert").classList.remove("alert");
		// 	document.getElementById("alert").innerHTML =
		// 		"Cannot Submit Form Please Fill Required Field Correctly";
		// } else {
		// 	document.querySelector(".hideAlert").classList.remove("alert");
		// 	document.getElementById("alert").innerHTML = err.response.data.message;
		// }
	}
};
const updatePasswordForm = document.getElementById("updatePasswordForm");
console.log('pass foorm',updatePasswordForm);
if (updatePasswordForm) {
	//;updatePassBtn
	updatePasswordForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const passwordCurrent = document.getElementById("currentPassword").value;
		const password = document.getElementById("newPassword").value;
		document.querySelector('.updatePassBtn').innerHTML=`<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>`
		console.log(passwordCurrent, password,);
		updatePassword(passwordCurrent, password); 
	});
 }


const createForum = async (form) => {
	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
		const res = await axios({
			method: "POST",
			url: "/api/v1/forum-thread",
			data: form
			// {
			// 	title,
			// 	category,
			// 	content,
            //     user
			// },
		});
		if (res.data.status === "success") {
			console.log("THIS IS RES ", res);
			showAlert("success", "Your Forum Will be Published After Review");
            document.getElementById("forumCreate").reset()
		}
	} catch (err) {
		showAlert("error", err);
        console.log(err);
		// if (err.response.status === 500) {
		// 	document.querySelector(".hideAlert").classList.remove("alert");
		// 	document.getElementById("alert").innerHTML =
		// 		"Cannot Submit Form Please Fill Required Field Correctly";
		// } else {
		// 	document.querySelector(".hideAlert").classList.remove("alert");
		// 	document.getElementById("alert").innerHTML = err.response.data.message;
		// }
	}
};
const forumCreate = document.getElementById("forumCreate");

if (forumCreate) {
	forumCreate.addEventListener("submit", (e) => {
		e.preventDefault();
		const form =new FormData()
		form.append('title',document.getElementById("forum-title").value)
		form.append('content',document.getElementById("forum-title").value)	
		const strCategory = document.getElementById("forum-category");
		form.append('category',strCategory.options[strCategory.selectedIndex+1].text)	
		form.append('user',document.getElementById("userId").value)
		form.append('document',document.getElementById("forumDoc").files[0])	


		// const title = document.getElementById("forum-title").value;
		// const content = document.querySelector(".forum-content").value;
		// const strCategory = document.getElementById("forum-category");
		// var category = strCategory.options[strCategory.selectedIndex+1].text;
		// const user = document.getElementById("userId").value;
		// console.log(title,content, category, user);
		createForum(form);
	});
}



















const updateDegreeUser = async (form,userId) => {
	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
		const res = await axios({
			method: "PATCH",
			url: `/api/v1/user/updateuserdegree/${userId}`,
			data: form
			// {
			// 	title,
			// 	category,
			// 	content,
            //     user
			// },
		});
		if (res.data.status === "success") {
			console.log("THIS IS RES ", res);
			showAlert("success", "Education Updated");
			location.reload()
		}
	} catch (err) {
		showAlert("error", err);
        console.log(err);
	}
};




const forumDegreeUpdate = document.getElementById("form-education-submit-update");
console.log('Button',forumDegreeUpdate);
if(forumDegreeUpdate){
		forumDegreeUpdate.addEventListener("click", (e) => {
		e.preventDefault();
		const currentUserId= document.getElementById('userId').value
		const form =new FormData()
		form.append('degreeName',document.getElementById("degreeName").value)
		form.append('fromDate',document.getElementById("fromdegree").value)	
		form.append('toDate',document.getElementById("todegree").value)
		// const strCategory = document.getElementById("todegree");
		// form.append('category',strCategory.options[strCategory.selectedIndex+1].text)	
		form.append('college',document.getElementById("collegenamedegree").value)
		form.append('university',document.getElementById("universitynamedegree").value)	
		form.append('spec',document.getElementById("specializationdegree").value)	
		

		updateDegreeUser(form,currentUserId);
	});
 }




const updateExperienceUser = async (form,userId) => {
	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
		const res = await axios({
			method: "PATCH",
			url: `/api/v1/user/updateUserExperience/${userId}`,
			data: form
		});
		if (res.data.status === "success") {
			console.log("THIS IS RES ", res);
			showAlert("success", "Experience Updated");
			location.reload()
		}
	} catch (err) {
		showAlert("error", err);
        console.log(err);
	}
};




const forumExperienceUpdate = document.getElementById("form-experience-submit-update");
console.log('Button EXPERIENCE',forumExperienceUpdate);
if(forumExperienceUpdate){
		forumExperienceUpdate.addEventListener("click", (e) => {
			alert('hello')
		e.preventDefault();
		const currentUserId= document.getElementById('userId').value
		const form =new FormData()
		form.append('designation',document.getElementById("designation").value)
		form.append('fromDate',document.getElementById("fromDateExp").value)	
		form.append('toDate',document.getElementById("toDateExp").value)
		// const strCategory = document.getElementById("todegree");
		// form.append('category',strCategory.options[strCategory.selectedIndex+1].text)	
		form.append('organization',document.getElementById("organization").value)
		

		updateExperienceUser(form,currentUserId);
	});
 }










const uploadprofile = async (form,userId) => {
	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
		const res = await axios({
			method: "PATCH",
			url: `/api/v1/user/updateUserProfile/${userId}`,
			data: form
		});
		if (res.data.status === "success") {
			console.log("THIS IS RES ", res);
			showAlert("success", "Profile Photo Updated");
			location.reload()
		}
	} catch (err) {
		showAlert("error", err);
        console.log(err);
	}
};


// console.log('file');
const uploadprofileButton=document.getElementById('updateProfilePhotoForm')
// const foto=document.getElementById('profile_file')
if(uploadprofileButton) {
	// if(foto.files[0]){
uploadprofileButton.addEventListener("submit",(e)=>{
	e.preventDefault()
 const form=new FormData()
 form.append('userProfile',document.getElementById('profile_file').files[0])
const currentUserId= document.getElementById('userId').value
 uploadprofile(form,currentUserId)

})
// }
}



