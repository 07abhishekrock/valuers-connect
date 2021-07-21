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

const registration = async (form) => {
	// var ws = new WebSocket("ws://localhost:3000/alok/api/v1/login");

	try {
		const res = await axios({
			method: "PATCH",
			url: "/api/v1/user/updateme",
			data: form,
		});
		if (res.data.status === "success") {
			showAlert("success", "Profile Updated");
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
	regSubmit.addEventListener("click", (e) => {
		e.preventDefault();
        const form = new FormData()
        
        form.append('degree',localStorage.getItem('degree'))
        form.append('experience',localStorage.getItem('experience'))
        // form.append('experience',JSON.parse(localStorage.getItem('experience')))
        form.append('website',document.getElementById('websiteurlreg').value)
        form.append('linkedIn',document.getElementById('linkedinidreg').value)
        form.append('whatsappNo',document.getElementById('whatsappnoreg').value)
        form.append('position',document.getElementById('position').value)
        form.append('about',document.getElementById('About').value)
        form.append('userProfile',document.getElementById('photoinputreg').files[0])

 

		// const degree = JSON.parse(localStorage.getItem('degree'));
		// const experience =JSON.parse(localStorage.getItem('experience'));
        // const name=document.getElementById('websiteurlreg').value
        // const name=document.getElementById('linkedinidreg').value
        // const name=document.getElementById('whatsappnoreg').value
        // const name=document.getElementById('position').value
        // const name=document.getElementById('About').value
        

		
		// console.log(degree,experience);
		registration(form); 
	});
}
