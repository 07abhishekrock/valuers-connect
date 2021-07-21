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

const createNewsAdminVal = async(formData) => {

	try {
		let button = document.getElementById('createadminnews');
		button.disabled = 'true';
		const res = await axios({
			method: "POST",
			url: "/api/v1/news",
			data:formData

		});
		button.removeAttribute('disabled');
		if (res.data.status === "success") {
			console.log("THIS IS RES ", res);
			showAlert("success", "Published");
            document.querySelector(".newsformcreate").reset()
		}
	} catch (err) {
		showAlert("error", err);
        console.log(err)
	}
}


const createNewsAdmin = document.querySelector(".newsformcreate");
let myObj={}
console.log(createNewsAdmin);
if (createNewsAdmin) {
	createNewsAdmin.addEventListener("submit", (e) => {
		e.preventDefault();
        // const title=document.querySelector(".newsTitleAdmin").value
        // const content=document.querySelector(".contentNews").value
        // // const featImage=document.querySelector(".newsFeatureImage").files[0]

        const formData= new FormData()
        formData.append('title',document.querySelector(".newsTitleAdmin").value)
        formData.append('content',document.querySelector(".contentNews").value)
        formData.append('featureImage',document.querySelector(".newsFeatureImage").files[0])
		formData.append('newsThumbnailImage',document.querySelector(".newsThumbnailImage").files[0])
		formData.append('isImportant',Boolean(Number(document.querySelector('#is-important').getAttribute('check'))))
		console.log(document.querySelector(".newsFeatureImage").files[0]);

        for(var pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]);
        }

   createNewsAdminVal(formData);
	});
}
