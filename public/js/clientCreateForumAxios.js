// const hideAlert = () => {
// 	const el = document.querySelector(".alert");
// 	if (el) el.parentElement.removeChild(el);
// };

// // type is 'success' or 'error'
// const showAlert = (type, msg, time = 7) => {
// 	hideAlert();
// 	const markup = `<div class="alert alert--${type}">${msg}</div>`;
// 	document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
// 	window.setTimeout(hideAlert, time * 1000);
// };

// const createForum = async (title,content, category, user) => {
// 	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

// 	try {
// 		const res = await axios({
// 			method: "POST",
// 			url: "/api/v1/forum-thread",
// 			data: {
// 				title,
// 				category,
// 				content,
//                 user
// 			},
// 		});
// 		if (res.data.status === "success") {
// 			console.log("THIS IS RES ", res);
// 			showAlert("success", "Your Forum Will be Published After Review");
//             document.getElementById("forumCreate").reset()
// 		}
// 	} catch (err) {
// 		showAlert("error", err);
//         console.log(err);
// 		// if (err.response.status === 500) {
// 		// 	document.querySelector(".hideAlert").classList.remove("alert");
// 		// 	document.getElementById("alert").innerHTML =
// 		// 		"Cannot Submit Form Please Fill Required Field Correctly";
// 		// } else {
// 		// 	document.querySelector(".hideAlert").classList.remove("alert");
// 		// 	document.getElementById("alert").innerHTML = err.response.data.message;
// 		// }
// 	}
// };
// const forumCreate = document.getElementById("forumCreate");

// if (forumCreate) {
// 	alert("Entered If Block");
// 	forumCreate.addEventListener("submit", (e) => {
// 		e.preventDefault();
// 		const title = document.getElementById("forum-title").value;
// 		const content = document.querySelector(".forum-content").value;
// 		const strCategory = document.getElementById("forum-category");
//        var category = strCategory.options[strCategory.selectedIndex].text;
// 		const user = document.getElementById("userId").value;
        

// 		// const featuredImage = document.getElementById("phone").value;
// 		// const password = document.getElementById("password").value;
// 		// const passwordConf = document.getElementById("passwordConf").value;
// 		console.log(title,content, category, user);
// 		createForum(title,content, category, user);
// 	});
// }
