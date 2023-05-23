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

formElm.addEventListener('submit', (e) => {
	//prevent browser reloading
	e.preventDefault();
	//receive the input value
	const inputValue = receiveInput();
});

textElement.addEventListener('input', (e) => {
	const text = e.target.value.trim();

	// get word count
	setWordCount(wordCount(text));
});
setInitialDOM();
