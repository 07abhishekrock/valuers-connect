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

const signup = async (firstName, lastName, email, phoneNo, password,userType) => {
	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
		const res = await axios({
			method: "POST",
			url: "/api/v1/user/signup",
			data: {
				firstName,
				lastName,
				email,
				phoneNo,
				password,
				userType
			},
		});
		if (res.data.status === "success") {
			showAlert("success", res.data.message);
			document.querySelector('.signup').innerHTML="SignUp"
		    document.querySelector(".signupHeading").style.display="none";
		    document.querySelector(".afterSignup").style.display="block";
		    document.getElementById("signupForm").style.display="none";
		    document.querySelector(".askForLogin").style.display="none";
		    document.querySelector(".loginwhitebga").style.height="300px"

			//calling addOnlineUserapi to add user as onlineuser.
			console.log(res.data);
			await axios.post('/api/v1/chat/add',{
				user:res.data.user
			});


		}
	} catch (err) {
		showAlert("error", err.response.data.message);
		document.querySelector('.signup').innerHTML="SignUp"

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
const signupForm = document.getElementById("signupForm");

if (signupForm) {
	// alert("Entered If Block");
	signupForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const firstName = document.getElementById("fname").value;
		const lastName = document.getElementById("lname").value;
		const email = document.getElementById("email").value;
		const phoneNo = document.getElementById("phone").value;
		const password = document.getElementById("password").value;
		const strUsertype = document.getElementById("userType");
        var userType = strUsertype.options[strUsertype.selectedIndex].text;
		// const passwordConf = document.getElementById("passwordConf").value;
		document.querySelector('.signupload').innerHTML=`<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>`
		console.log(firstName, email, phoneNo, password, lastName,userType);
		signup(firstName, lastName, email, phoneNo, password,userType); 
	});
}
