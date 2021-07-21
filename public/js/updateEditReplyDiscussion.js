// function edit(i){
// 	console.log(document.getElementById("inputreplyupdateform").value);
// //     var url_string=""
// //     window.onload=function(){
// //         url_string = window.location.href
// //  url_string= url_string.split('/')[4]
// // console.log(url_string);
// //     }
//     const hideAlert = () => {
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

// // const createTenderAdminVal = async (emd,openingDate, lastDate, organizationDetail,tenderAuthority,brief) => {
// const createTenderAdminVal = async (form) => {

// 	try {
// 		const res = await axios({
// 			method: "PATCH",
// 			url: `/api/v1/forum-replies?_id=${document.getElementById("inputreplyupdateform"+i).value}`,
// 			data:form,

// 		});
// 		if (res.data.status === "success") {
// 			console.log("THIS IS RES ", res);
// 			showAlert("success", "Published");
//             // document.querySelector(".upcomingeventformcreate").reset()
//             // location.replace("/forum-thread");
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
// const createTender = document.querySelector(".editreplyformdiscussion"+i);
// if (createTender) {
// 	createTender.addEventListener("submit", (e) => {
// 		e.preventDefault();
//        // const threadReply=document.querySelector("#editdiscussionpagecontent").value
// 		const form=new FormData()
//         form.append('threadReply',document.querySelector("#texteditorreplyupdate"+i).value)
//         // form.append('featureImage',document.querySelector(".updatefileupcomingeventadmininput").files[0])
//         // form.append('lastDate',document.getElementById("lastDate").value)
//         // form.append('organizationDetail',document.getElementById("adminOrganizationDetail").value)
//         // form.append('tenderAuthority',document.getElementById("adminAuthorityIssue").value)
//         // form.append('brief', document.querySelector(".adminTenderBrief").value)
//         // form.append('documents',document.querySelector(".tenderDocuments").files[0])
       

// 		// const emd = document.getElementById("adminEmd").value;
// 		// const openingDate = document.getElementById("openingDate").value;
// 		// const lastDate = document.getElementById("lastDate").value;
// 		// const organizationDetail = document.getElementById("adminOrganizationDetail").value;
// 		// const tenderAuthority = document.getElementById("adminAuthorityIssue").value;
// 		// const brief = document.querySelector(".adminTenderBrief").value;
        
//         // console.log(emd,openingDate, lastDate, organizationDetail,tenderAuthority,brief);
// 		// createTenderAdminVal(emd,openingDate, lastDate, organizationDetail,tenderAuthority,brief);
// 		createTenderAdminVal(form);
// 	});
// } }