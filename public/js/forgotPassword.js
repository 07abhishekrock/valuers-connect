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

const forgotPassword = async (email) => {
	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
		const res = await axios({
			method: "POST",
			url: "/api/v1/user/forgot_password",
			data: {
				email,
				
			},
		});
		if (res.data.status === "success") {
			showAlert("success", "Check your Mail to Reset Password");
			document.querySelector('.loginbutton').innerHTML="Send Link"
			document.querySelector('.head').style.display="none"
			document.querySelector('.forgotPasswordform').style.display="none"
			document.querySelector('.message-forgotPass').style.display="block"


			
			console.log(res);
			document.querySelector('.loginbutton').innerHTML="Send Link"

		}
	} catch (err) {
		showAlert("error", err.response.data.message);
		document.querySelector('.loginbutton').innerHTML="Send Link"
	}
};
const forgotPassForm = document.querySelector(".forgotPasswordform");

if (forgotPassForm) {
	// alert("Entered If Block");
	forgotPassForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const email = document.getElementById("email-login").value;
		// const phoneNo = document.getElementById("phone-login").value;
		// const password = document.getElementById("password-login").value;
		document.querySelector('.loginbutton').innerHTML=`<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>`

		forgotPassword(email);
	});
}
