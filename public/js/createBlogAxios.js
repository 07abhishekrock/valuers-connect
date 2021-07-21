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

const createBlog = async (form) => {
	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
		let button = document.getElementById('createBlog_btn');
		button.disabled = 'true';
		const res = await axios({
			method: "POST",
			url: "/api/v1/blog",
			data:form
		});
		button.removeAttribute('disabled');
		if (res.data.status === "success") {
			console.log("THIS IS RES ", res);
			showAlert("success", "Blog Created Successfully");
			document.querySelector(".blogformcreate").reset()
		}
	} catch (err) {
		showAlert("error", err);
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
const blogformcreate = document.getElementById("blogformcreate");

if (blogformcreate) {
	// alert("Entered If Block");
	blogformcreate.addEventListener("submit", (e) => {
		e.preventDefault();
		const form=new FormData()
		form.append('title',document.getElementById("blog_title").value)
		form.append('category',document.getElementById("blog_category").value)
		form.append('content',document.querySelector(".blog_content").value)
		form.append('blogFeatureImage',document.querySelector(".blogFeatureImage").files[0])
		form.append('blogThumbnailImage',document.querySelector(".blogThumbnailImage").files[0])
		// const title = document.getElementById("blog_title").value;
		// const category = document.getElementById("blog_category").value;
		// const content = document.querySelector(".blog_content").value;
		// console.log(title, category, content);
		createBlog(form);
	});
}
