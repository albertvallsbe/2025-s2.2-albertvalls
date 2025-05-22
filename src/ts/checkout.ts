// Exercise 6
const validate = () => {
	let error = 0;
	// Get the input fields
	const fName = document.getElementById('fName') as HTMLInputElement | null;
	const fEmail = document.getElementById('fEmail') as HTMLInputElement | null;

	// Get the error elements
	const errorName = document.getElementById('errorName');
	const errorEmail = document.getElementById('errorEmail');

	if (!fName || !fEmail || !errorName || !errorEmail) {
		console.error('Elements de formulari no trobats al DOM');
		return;
	}

	// Validate fields entered by the user: name, phone, password, and email
	if (fName.value.trim() === '') {
		error++;
		errorName.textContent = 'El nom és obligatori';
	} else {
		errorName.textContent = '';
	}

	if (fEmail.value.trim() === '') {
		error++;
		errorEmail.textContent = 'L’email és obligatori';
	} else {
		errorEmail.textContent = '';
	}

	if (error > 0) {
		alert('Please fill in all required fields.');
	} else {
		alert('Form submitted successfully');
	}
};
