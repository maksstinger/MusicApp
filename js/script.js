let login_link = document.getElementsByClassName("txt-link"),
	form_in = document.getElementById("form-in"),
	form_up = document.getElementById("form-up");
for (let i=0; i < login_link.length; i++) {
	login_link[i].addEventListener("click", hiden);
}
for (let i=0; i < form_in.length; i++) {
	form_in[i].onblur = function() {
		if (!event.target.value) {
			event.target.parentNode.classList.add('alert-validate');
		}
	};
	form_in[i].onfocus = function() {
		event.target.parentNode.classList.remove('alert-validate');
	}
}
for ( let i=0; i < form_up.length; i++) {
	form_up[i].onblur = function () {
		if (!event.target.value) {
			event.target.parentNode.classList.add('alert-validate');
		}
	};
	form_up[i].onfocus = function () {
		event.target.parentNode.classList.remove('alert-validate');
	}
}
function hiden() {
	form_in.style.display = (event.target.textContent.trim() == "Sign up") ? "none" : "";
	form_up.style.display = (event.target.textContent.trim() == "Sign up") ? "block" : "";
}