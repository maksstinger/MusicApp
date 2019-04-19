let login_link = document.getElementsByClassName("txt-link"),
	form_in = document.getElementById("form-in"),
	form_up = document.getElementById("form-up"),
	form_in_inputs = document.querySelectorAll('.form_in_input'),
	form_up_inputs = document.querySelectorAll('.form_up_input'),
	form_up_sub = document.getElementById('submit'),
	form_in_warn = document.querySelector('.warning'),
	form_in_sub = document.getElementById('signin'),
	_local = window.localStorage,
    _session = window.sessionStorage;
window.onload = function () {
	form_in_inputs.forEach((input, index) => {
		form_in[index].onblur = (e) => onBlurHandler(e, form_in_inputs);
		form_in[index].onfocus = (e) => onFocusHandler(e, form_in_inputs);
	});
	form_up_inputs.forEach((input, index) => {
		form_up[index].onblur = (e) => onBlurHandler(e, form_up_inputs);
		form_up[index].onfocus = (e) => onFocusHandler(e, form_up_inputs);
	});
	Array.from(login_link).forEach((link, index) => {
		login_link[index].onclick = (e) => hide(e);
	});
	form_up_sub.onclick = (e) => passwordChecker(e);
	form_up_sub.disabled = true;
	form_in_sub.onclick = (e) => signInChecker(e);
};
function onBlurHandler(event, form) {
	if (!event.target.value) {
		event.target.parentNode.classList.add('alert-validate');
	}
	if (validate(form)) {
		form_up_sub.classList.remove('submit-disabled');
		form_up_sub.disabled = false;
	}
}
function onFocusHandler(event) {
		event.target.parentNode.classList.remove('alert-validate');
}
function hide(event) {
	form_in.style.display = (event.target.textContent.trim() === "Sign up") ? "none" : "";
	form_up.style.display = (event.target.textContent.trim() === "Sign up") ? "block" : "";
}
function passwordChecker(event) {
	event.preventDefault();
	let enter_password = document.getElementById('password'),
		repeat_password = document.getElementById('repeat_password');
	if (enter_password.value !== repeat_password.value){
		repeat_password.parentNode.classList.add('alert-validate');
	} else {
		if (!isUserExists(document.getElementById('username').value)) {
			let userData = {};
			userData.name = document.getElementById('name').value;
			userData.email = document.getElementById('email').value;
			userData.password = document.getElementById('password').value;
			userData.repeat_password = document.getElementById('repeat_password').value;
			_local.setItem(document.getElementById('username').value, JSON.stringify(userData));
			_session.setItem(document.getElementById('username').value, JSON.stringify(userData));
			// window.location.href = 'user_account.html'; //переход после регистрации новго юзера в ЛК
			hide(event); //переход на авторизацию, но не понятно, прошла ли регистрация успешно, ну так себе вариант)
		}
		else {
			alert('Sorry! This user already exists!')
		}
	}
}
function signInChecker(event) {
	event.preventDefault();
	let username = form_in_inputs[0].value;
	let password = form_in_inputs[1].value;
	let curUser;
	let curPass;
	if (_local.hasOwnProperty(username)){
		curUser = JSON.parse(_local.getItem(username));
		curPass = curUser.password;
		if (curPass === password) {
			window.location.href = 'user_account.html';
		} else {
			warnToggler(true);
		}
	} else {
		warnToggler(true);
	}
}
function isUserExists(user) {
	return !!_local.getItem(user);
}
function warnToggler(warn) {
	if(warn) {
		form_in.style.display = 'none';
		form_in_warn.style.display = 'flex';
	} else {
		form_in.style.display = 'flex';
		form_in_warn.style.display = 'none';
	}
}
function validate(inputs) {
	let validate = false;
	inputs.forEach((input) => {
		validate = input.value !== '';
	});
	return validate;
}