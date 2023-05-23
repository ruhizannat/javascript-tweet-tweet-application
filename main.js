//select element
const searchInputElm = document.querySelector('.search-input');
const formElm = document.querySelector('form');
const textElement = document.querySelector('.text-element');
const limitElm = document.querySelector('.limit');
const limitNumberElm = document.querySelector('.limit-number');
const btnElm = document.querySelector('.submit');
const dateElm = document.querySelector('.date-style');
const msgElm = document.querySelector('.msg');

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
