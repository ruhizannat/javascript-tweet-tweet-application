//select element
const searchInputElm = document.querySelector('.search-input');
const formElm = document.querySelector('form');
const textElement = document.querySelector('.text-element');
const limitElm = document.querySelector('.limit');
const limitNumberElm = document.querySelector('.limit-number');
const btnElm = document.querySelector('.submit');
const dateElm = document.querySelector('.date-style');
const msgElm = document.querySelector('.msg');

let count;
const num1 = 250;
const num2 = 0;

const wordCount = (text) => {
	const arrayOfWords = text.split(' ');
	count = 0;
	for (let word of arrayOfWords) {
		if (/[a-zA-Z0-9]/.test(word)) {
			count += 1;
		}
	}

	return count;
};
const setWordCount = (count) => {
	// DOM update
	limitElm.textContent = count;
};

const setInitialDOM = () => {
	limitNumberElm.textContent = num1;
	limitElm.textContent = num2;
};

const receiveInput = () => {
	const inputValue = textElement.value;
	return inputValue;
};
const clearMsg = () => {
	msgElm.textContent = '';
};
const showMessage = (msg, action) => {
	const textMsg = `<div class="alert alert-${action} text-center" role="alert">
  ${msg}
</div>`;
	msgElm.insertAdjacentHTML('afterbegin', textMsg);
	setTimeout(() => {
		clearMsg();
	}, 2000);
};
const validatedInput = (inputValue) => {
	let isValid = true;
	//check input is empty
	if (inputValue === '') {
		isValid = false;
		showMessage('please provide necessary info', 'danger');
	}
	if (inputValue.length > num1 && count > num1) {
		isValid = false;
		showMessage(
			`You cannot put more than ${num1} words in this text area.`,
			'danger'
		);
	}
	return isValid;
};

const resetInputs = () => {
	textElement.value = '';
	limitElm.textContent = num2;
	limitNumberElm.textContent = num1;
};
formElm.addEventListener('submit', (e) => {
	//prevent browser reloading
	e.preventDefault();
	//receive the input value
	const inputValue = receiveInput();

	//check validation
	const isValid = validatedInput(inputValue);
	if (!isValid) return;

	// reset the inputs
	resetInputs();
	console.log(inputValue);
});

textElement.addEventListener('input', (e) => {
	const text = e.target.value.trim();

	// get word count
	setWordCount(wordCount(text));
});
setInitialDOM();
