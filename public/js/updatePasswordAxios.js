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
	alert("Entered If Block")
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
