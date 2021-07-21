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

// const createTenderAdminVal = async (emd,openingDate, lastDate, organizationDetail,tenderAuthority,brief) => {
const createTenderAdminVal = async (form) => {
	let button;
	try {
		button = document.getElementById('create-tender-btn');
		button.innerHTML=`<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>`;
		button.disabled = 'true';
		const res = await axios({
			method: "POST",
			url: "/api/v1/tender",
			data:form,

		});
		button.removeAttribute('disabled');
		if (res.data.status === "success") {
			console.log("THIS IS RES ", res);
			showAlert("success", "Published");
			button.innerHTML=`Create`;
            document.querySelector(".createTenderAdmin").reset()
		}
	} catch (err) {
		showAlert("error", err);
		button.removeAttribute('disabled');
		button.innerHTML=`Create`;
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
const createTender = document.querySelector(".createTenderAdmin");
console.log(createTender);
if (createTender) {
	createTender.addEventListener("submit", (e) => {
		e.preventDefault();
        const form= new FormData()
        form.append('title',document.getElementById("Tendertitle").value)
        form.append('category',document.getElementById("category").value)

        form.append('emd',document.getElementById("adminEmd").value)
        form.append('openingDate',document.getElementById("openingDate").value)
        form.append('lastDate',document.getElementById("lastDate").value)
        form.append('organizationDetail',document.getElementById("adminOrganizationDetail").value)
        form.append('tenderAuthority',document.getElementById("adminAuthorityIssue").value)
        form.append('brief', document.querySelector(".adminTenderBrief").value)
        form.append('documents',document.querySelector(".tenderDocuments").files[0])


		// const emd = document.getElementById("adminEmd").value;
		// const openingDate = document.getElementById("openingDate").value;
		// const lastDate = document.getElementById("lastDate").value;
		// const organizationDetail = document.getElementById("adminOrganizationDetail").value;
		// const tenderAuthority = document.getElementById("adminAuthorityIssue").value;
		// const brief = document.querySelector(".adminTenderBrief").value;

        // console.log(emd,openingDate, lastDate, organizationDetail,tenderAuthority,brief);
		// createTenderAdminVal(emd,openingDate, lastDate, organizationDetail,tenderAuthority,brief);

		createTenderAdminVal(form);
	});
}
