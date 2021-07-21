var url_string
window.onload=function(){
    url_string = window.location.href
    url_string=url_string.split('/')[4]
    console.log(url_string);
    url=`/api/v1/user/reset_password/${url_string}`
}

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

  
const resetPassword = async (password) => {
        console.log(url_string);

	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
		const res = await axios({
			method: "PATCH",
			url: url,
			data: {
				password,
				
			},
		});
		if (res.data.status === "success") {
			showAlert("success", "Password Changed");
			console.log(res);
			location.assign("/");
			document.querySelector('.loginbutton').innerHTML="Reset Password"

		}
	} catch (err) {
		showAlert("error", err.response.data.message);
		document.querySelector('.loginbutton').innerHTML="Reset Password"
	}
};
const resetPasswordForm = document.querySelector(".resetPasswordForm");

if (resetPasswordForm) {
	// alert("Entered If Block");
	resetPasswordForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const password = document.getElementById("email-login").value;
		const confirmPassword = document.getElementById("password-login").value;
		// const phoneNo = document.getElementById("phone-login").value;
		// const password = document.getElementById("password-login").value;
        if(password !=confirmPassword){
            showAlert('error',"Password and Confirm Password Are Not Same !!")
        }
        else{

		document.querySelector('.loginbutton').innerHTML=`<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>`

		resetPassword(password);
        }
	});
}
