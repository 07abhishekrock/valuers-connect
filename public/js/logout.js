const logout = async () => {
	try {
		const res = await axios({
			method: "GET",
			url: "/api/v1/user/logout",
		});

		if (res.data.status === "success") {
			location.reload(true);
			location.assign("/");
		}
	} catch (error) {
		alert("Error in Logging Out. Please Try Again!!!");
	}
};

const logoutBtn = document.querySelector(".logout");
if (logoutBtn) {
	logoutBtn.addEventListener("click", logout);
}
