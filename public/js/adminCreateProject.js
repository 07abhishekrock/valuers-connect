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
const createProjectAdminVal = async (form) => {
	let button;
	try {
		button = document.getElementById('createadminproject');
		button.innerHTML=`<i class="fa fa-spinner fa-spin" style="font-size:24px"></i>`;
		button.disabled = 'true';
		const res = await axios({
			method: "POST",
			url: "/api/v1/project",
			data:form,

		});
		button.removeAttribute('disabled');
		if (res.data.status === "success") {
			console.log("THIS IS RES ", res);
			showAlert("success", "Published");
			button.innerHTML=`PUBLISH`;
            document.querySelector(".createProjectAdmin").reset()
		}
	} catch (err) {
		showAlert("error", 'Something Went Wrong');
		document.querySelector(".createProjectAdmin").reset()
		button.innerHTML=`PUBLISH`;
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
const createProject = document.querySelector(".createProjectAdmin");
console.log(createProject);
if (createProject) {
	createProject.addEventListener("submit", (e) => {
		e.preventDefault();
        const form= new FormData()
        form.append('category',document.querySelector(".projectCategory").value)
        form.append('institutionName',document.querySelector(".instituteName").value)
        form.append('assetLocation',document.querySelector(".assetLocation").value)
        form.append('assetCity',document.querySelector(".assetCity").value)

        form.append('applicationDeadline',document.querySelector(".projectDeadline").value)
        form.append('auctionDate',document.querySelector(".auctionDate").value)
        form.append('reservePrice',document.querySelector(".reservedPrice").value)
        form.append('propertyDetails', document.querySelector(".propertyDetails").value)
        form.append('projectDocuments',document.querySelector(".projectDocument").files[0])
       
 for(var pair of form.entries()) {
   console.log(pair[0]+ ', '+ pair[1]);
}
		// const emd = document.getElementById("adminEmd").value;
		// const openingDate = document.getElementById("openingDate").value;
		// const lastDate = document.getElementById("lastDate").value;
		// const organizationDetail = document.getElementById("adminOrganizationDetail").value;
		// const tenderAuthority = document.getElementById("adminAuthorityIssue").value;
		// const brief = document.querySelector(".adminTenderBrief").value;
        
        // console.log(emd,openingDate, lastDate, organizationDetail,tenderAuthority,brief);
		// createTenderAdminVal(emd,openingDate, lastDate, organizationDetail,tenderAuthority,brief);

		createProjectAdminVal(form);
	});
} 
