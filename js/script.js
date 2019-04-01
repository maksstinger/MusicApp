let login_link = document.getElementsByClassName("txt-link"),
	form_in = document.getElementById("form-in").style,
	form_up = document.getElementById("form-up").style;
for (let i=0; i < login_link.length; i++) {
	login_link[i].addEventListener("click", hiden)
}
function hiden() {
	let targetElement = event.target;
	if (targetElement.textContent.trim() == "Sign up") {
		form_in.display = "none";
		form_up.display = "block";
	} else {
		form_up.display  = "";
		form_in.display  = "";
	}
}
