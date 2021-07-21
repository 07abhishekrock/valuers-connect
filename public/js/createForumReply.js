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

const creatReply = async (user, forumThread, threadReply) => {
	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
		const res = await axios({
			method: "POST",
			url: "/api/v1/forum-replies",
			data: {
				user,
				forumThread,
				threadReply,
			},
		});
		if (res.data.status === "success") {
			console.log("THIS IS RES ", res);
			showAlert("success", "Created Successfully");
			window.setTimeout(location.reload(true), 2 * 1000);
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
const creatReplyForm = document.getElementById("creatReply");

if (creatReplyForm) {
	// alert("Entered If Block");
	creatReplyForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const user = document.getElementById("user").value;
		const forumThread = document.getElementById("threadId").value;
		const threadReply = document.querySelector(".reply").value;
		// const featuredImage = document.getElementById("phone").value;
		// const password = document.getElementById("password").value;
		// const passwordConf = document.getElementById("passwordConf").value;
		console.log(user, forumThread, threadReply);
		creatReply(user, forumThread, threadReply);
	});
}
