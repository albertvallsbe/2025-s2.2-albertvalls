// Exercise 6
const validate = () => {
	let error = 0;
	// Get the input fields
	const formFirstName = document.getElementById(
		'fName'
	) as HTMLInputElement | null;
	const formLastName = document.getElementById(
		'fLastN'
	) as HTMLInputElement | null;
	const formEmail = document.getElementById(
		'fEmail'
	) as HTMLInputElement | null;
	const formAddress = document.getElementById(
		'fAddress'
	) as HTMLInputElement | null;
	const formPhone = document.getElementById(
		'fPhone'
	) as HTMLInputElement | null;
	const formPassword = document.getElementById(
		'fPassword'
	) as HTMLInputElement | null;

	// Get the error elements
	const errorFirstName = document.getElementById(
		'errorName'
	) as HTMLElement | null;
	const errorLastName = document.getElementById(
		'errorName'
	) as HTMLElement | null;
	const errorEmail = document.getElementById(
		'errorEmail'
	) as HTMLElement | null;
	const errorAddress = document.getElementById(
		'errorAddress'
	) as HTMLElement | null;
	const errorPhone = document.getElementById(
		'errorPhone'
	) as HTMLElement | null;
	const errorPassword = document.getElementById(
		'errorPassword'
	) as HTMLElement | null;

	if (
		!formFirstName ||
		!formLastName ||
		!formEmail ||
		!formAddress ||
		!formPhone ||
		!formPassword
	) {
		console.error('Elements de formulari no trobats al DOM');
		return;
	}

	if (
		!errorFirstName ||
		!errorLastName ||
		!errorEmail ||
		!errorAddress ||
		!errorPhone ||
		!errorPassword
	) {
		console.error('Elements de formulari no trobats al DOM');
		return;
	}

	const onlyLetters = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/;
	const onlyDigits = /^\d+$/;
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,8}$/;
	const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

	const markInvalid = (input: HTMLInputElement, errorDiv: HTMLElement) => {
		input.classList.add('is-invalid');
		input.classList.remove('is-valid');

		error += 1;
	};

	const markValid = (input: HTMLInputElement) => {
		input.classList.remove('is-invalid');
		input.classList.add('is-valid');
	};

	// Nom
	if (formFirstName.value.trim().length < 3) {
		markInvalid(formFirstName, errorFirstName);
		error++;
	} else if (!onlyLetters.test(formFirstName.value.trim())) {
		markInvalid(formFirstName, errorFirstName);
	} else {
		markValid(formFirstName);
	}

	// Cognom
	if (formLastName.value.trim().length < 3) {
		markInvalid(formLastName, errorLastName);
	} else if (!onlyLetters.test(formLastName.value.trim())) {
		markInvalid(formLastName, errorLastName);
	} else {
		markValid(formLastName);
	}

	// Email
	if (
		formEmail.value.trim().length < 3 ||
		!formEmail.checkValidity() ||
		!emailRegex.test(formEmail.value.trim())
	) {
		markInvalid(formEmail, errorEmail);
	} else {
		markValid(formEmail);
	}

	// Adreça
	if (formAddress.value.trim().length < 3) {
		markInvalid(formAddress, errorAddress);
	} else {
		markValid(formAddress);
	}

	// Telèfon
	if (
		!onlyDigits.test(formPhone.value.trim()) ||
		formPhone.value.trim().length !== 9
	) {
		markInvalid(formPhone, errorPhone);
	} else {
		markValid(formPhone);
	}

	// Contrasenya
	if (!passwordRegex.test(formPassword.value)) {
		markInvalid(formPassword, errorPassword);
	} else {
		markValid(formPassword);
	}

	if (error > 0) {
		alert('Si us plau, completa tots els camps obligatoris.');
	} else {
		alert('Formulari enviat correctament!');
	}
};

const validateForm = () => {
	const form = document.getElementById(
		'checkoutForm'
	) as HTMLFormElement | null;
	if (form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			event.stopPropagation();
			validate();
		});
	}
};

document.addEventListener('DOMContentLoaded', () => {
	validateForm();
});
