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

const login = async (email, password) => {
	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
		const res = await axios({
			method: "POST",
			url: "/api/v1/user/login",
			data: {
				email,
				password,
			},
		});
		if (res.data.status === "success") {
			showAlert("success", "Logged In Successfully");
			console.log(res);
			location.assign("/my/profile");
			document.querySelector('.loginbutton').innerHTML="Login"

		}
	} catch (err) {
		showAlert("error", err.response.data.message);
		document.querySelector('.loginbutton').innerHTML="Login"

		// showAlert("error", err);
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
const loginForm = document.getElementById("loginform");

if (loginForm) {
	// alert("Entered If Block");
	loginForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const email = document.getElementById("email-login").value;
		// const phoneNo = document.getElementById("phone-login").value;
		const password = document.getElementById("password-login").value;
		// const passwordConf = document.getElementById("passwordConf").value;
		document.querySelector('.loginbutton').innerHTML=`<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>`

		login(email, password);
	});
}
