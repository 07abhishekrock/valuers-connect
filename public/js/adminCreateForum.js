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

const createForumAdmin = async (form) => {
	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
		let button = document.getElementById('createadminnews');
		button.disabled = 'true';
		const res = await axios({
			method: "POST",
			url: "/api/v1/forum-thread",
			data: form
			// {
			// 	title,
			// 	category,
			// 	content,
            //     user,
            //     isApproved
			// },
		});
		button.removeAttribute('disabled');
		if (res.data.status === "success") {
			console.log("THIS IS RES ", res);
			const strCategory = document.getElementById("forum-category");
			let category = strCategory.options[strCategory.selectedIndex+1].text
			let current_thread_count = await axios({
				method:"GET",
				url : `/api/v1/category/${category}`
			})
			current_thread_count = current_thread_count.data.data.category.totalThreads;

			const res_thread = await axios({
				method: "PATCH",
				url: `/api/v1/category/${category}`,
				data:{
					totalThreads : current_thread_count + 1
				},
			});


			if(res_thread.data && res_thread.data.status === 'success'){
			showAlert("success", "Published");
			}

            document.querySelector(".addNewForumAdmin").reset()
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
const addNewForumAdmin = document.querySelector(".addNewForumAdmin");
console.log(addNewForumAdmin);
if (addNewForumAdmin) {
	addNewForumAdmin.addEventListener("submit", (e) => {
		e.preventDefault();
		const form=new FormData()
		form.append('title',document.querySelector(".forumTitle").value)
		form.append('content',document.querySelector(".forum-content").value)
		form.append('isApproved',true)
		const strCategory = document.getElementById("forum-category");

		form.append('category',strCategory.options[strCategory.selectedIndex+1].text)
		form.append('user',document.getElementById("userId").value)
		form.append('document',document.getElementById("forumDocument").files[0])
 
		// const title = document.querySelector(".forumTitle").value;
		// const content = document.querySelector(".forum-content").value;
        // const isApproved = true
		// const strCategory = document.getElementById("forum-category");
        // var category = strCategory.options[strCategory.selectedIndex+1].text;
		// //category=category.split(" ")[0]; 
		// console.log(category);
		// const user = document.getElementById("userId").value;
        

		// const featuredImage = document.getElementById("phone").value;
		// const password = document.getElementById("password").value;
		// const passwordConf = document.getElementById("passwordConf").value;
		//console.log(title,content, category, user,isApproved);
		createForumAdmin(form);
	});
}
