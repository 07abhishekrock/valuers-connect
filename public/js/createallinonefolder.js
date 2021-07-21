// $("#createadminnews").click(function (event) {
//   event.preventDefault();
// });
// $("#createadminnews").on("click", function () {
//   var inputtitlenewsadmin = $("#inputtitlenewsadmin").val();
//   var inputcontentnewsadmin = $("#desc").val();
//   //   $("#ti").html(inputtitlenewsadmin);
//   //   $("#ti1").html(inputcontentnewsadmin);
//   console.log(inputtitlenewsadmin, " ", inputcontentnewsadmin);
//   $.ajax({
//     url: "https://valuers-connect.herokuapp.com/api/v1/news",
//     type: "POST",
//     dataType: "json",
//     contentType: "application/json;charset=utf-8",
//     processData: false,
//     data: {
//       title: inputtitlenewsadmin,
//       content: inputcontentnewsadmin,
//       featureImage: "http://ankushimage.com/1634x602.png/cc0000/ffffff",
//       cardImage: "http://ankushimage.com/500x500.png/dddddd/000000",
//     },
//     success: function (data) {
//       console.log("hooooooo");
//       console.log(data._id);

//       if (data.status) {
//         alert("successfully created");
//         $("#formadminnewscreate").reset();
//       }
//     },
//     error: function () {
//       console.log("error in this line");
//     },
//   });
// });
const addnews = document.querySelector(".newsClass");

if (addnews) {
	addnews.addEventListener("submit", (e) => {
		e.preventDefault();
		document.querySelector(".publishNews").innerHTML = "Adding Product....";
		//With photo
		const form = new FormData();
		form.append("title", document.getElementById("inputtitlenewsadmin").value);
		form.append("content", document.getElementById("desc").value);

		addNews(form);

		document.querySelector(".submitProduct").innerHTML = "Add Product";
	});
}
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"
	integrity="sha512-bZS47S7sPOxkjU/4Bt0zrhEtWx0y0CRkhEp8IckzK+ltifIIE9EMIMTuT/mEzoIMewUINruDBIR/jJnbguonqQ=="
	crossorigin="anonymous"
></script>;
import axios from "axios";
addnews = async (form) => {
	try {
		let button = document.getElementById('btn-notification-update');
		button.disabled = 'true';
		const res = await axios({
			method: "POST",
			url: "/api/v1/news",
			data: form,
		});
		button.removeAttribute('disabled');
		if (res.data.status === "success") {
			//log
			console.log("success");
		}

		console.log(res);
	} catch (err) {
		//log

		console.log("Not success");
	}
};
