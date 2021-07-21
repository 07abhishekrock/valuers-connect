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

const registration = async (degree,experience) => {
	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
		const res = await axios({
			method: "PATCH",
			url: "/api/v1/user/updateme",
			data: {
				degree,experience
			},
		});
		if (res.data.status === "success") {
			showAlert("success", res.data.message);
			console.log('Res reg',res.data);
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
const registrationForm = document.getElementById("regForm");

if (registrationForm) {
    const regSubmit= document.querySelector('.hello')
	// alert("Entered If Block");
	regSubmit.addEventListener("click", (e) => {
		e.preventDefault();
		const degree = JSON.parse(localStorage.getItem('degree'));
		const experience =JSON.parse(localStorage.getItem('experience'));
		// const lastName = document.getElementById("lname").value;
		// const email = document.getElementById("email").value;
		// const phoneNo = document.getElementById("phone").value;
		// const password = document.getElementById("password").value;
		// const passwordConf = document.getElementById("passwordConf").value;
		// document.querySelector('.registrationload').innerHTML=`<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>`
		console.log(degree,experience);
		registration(degree,experience); 
	});
}
