//select element
const searchInputElm = document.querySelector('.search-input');
const formElm = document.querySelector('form');
const textElement = document.querySelector('.text-element');
const limitElm = document.querySelector('.limit');
const limitNumberElm = document.querySelector('.limit-number');
const btnElm = document.querySelector('.submit');
const dateElm = document.querySelector('.date-style');
const msgElm = document.querySelector('.msg');
const collectionElm = document.querySelector('.collection');

let count;
let limitNum = 250;
const limit = 0;

let tweets = [];

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

const generateDate = () => {
	const date = new Date();

	const time = dateFns.format(new Date(date), 'D MMM, YY h:mm a');
	return time;
};
generateDate();
const setWordCount = (count) => {
	// DOM update
	limitElm.textContent = count;
};

const setInitialDOM = () => {
	limitNumberElm.textContent = limitNum;
	limitElm.textContent = limit;
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
	if (inputValue.length > limitNum && count > limitNum) {
		isValid = false;
		showMessage(
			`You cannot put more than ${limitNum} words in this text area.`,
			'danger'
		);
	}

	return isValid;
};

const resetInputs = () => {
	textElement.value = '';
	limitElm.textContent = limit;
	limitNumberElm.textContent = limitNum;
};

const addTweet = (inputValue) => {
	const tweet = {
		serialNumber: tweets.length + 1 + '.',
		date: generateDate(),
		id: tweets.length + 1,
		textInput: inputValue,
	};

	// memory data store

	tweets.push(tweet);
	return tweet;
};
const showTweetToUI = (tweetInfo) => {
	const { serialNumber, id, textInput, date } = tweetInfo;
	const elm = `<li class='mb-3' data-tweetId='${id}'>
	
	  <p class='text-input '> <span class='me-2 serial-number'>${serialNumber}</span>${textInput}</p>
	
		<div>
				<span class="date-style">${date}</span>
				<i class="fa-regular fa-pen-to-square edit-tweet text-info ms-4"></i>
				<i class="fa-sharp fa-solid fa-trash delete-tweet text-danger ms-3"></i>
		</div>
	
</li>`;
	collectionElm.insertAdjacentHTML('afterbegin', elm);
	showMessage('New Tweet Added Successfully', 'success');
};
const getTweetId = (e) => {
	const liElm = e.target.parentElement.parentElement;
	const id = +liElm.getAttribute('data-tweetId');

	return id;
};
const removeTweetFromDataMemory = (id) => {
	tweets = tweets.filter((tweet) => tweet.id !== id);
};
const removeTweetFromUI = (id) => {
	document.querySelector(`[data-tweetId='${id}']`).remove();
	showMessage('tweet deleted successfully', 'success');
};
const addTweetToLocalStorage = (tweet) => {
	let tweets;
	if (localStorage.getItem('storeTweets')) {
		tweets = JSON.parse(localStorage.getItem('storeTweets'));
		tweets.push(tweet);
		localStorage.setItem('storeTweets', JSON.stringify(tweets));
	} else {
		tweets = [];
		tweets.push(tweet);
		localStorage.setItem('storeTweets', JSON.stringify(tweets));
	}
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

	//Add tweet to data store
	const tweet = addTweet(inputValue);

	//add tweet to localStorage
	addTweetToLocalStorage(tweet);

	// add tweet to UI
	showTweetToUI(tweet);
	console.log(inputValue);
});
collectionElm.addEventListener('click', (e) => {
	if (e.target.classList.contains('delete-tweet')) {
		//get the tweet id
		const id = getTweetId(e);
		//tweet remove from data store
		removeTweetFromDataMemory(id);
		//tweet remove from UI
		removeTweetFromUI(id);
	}
});

textElement.addEventListener('input', (e) => {
	const text = e.target.value.trim();

	// get word count
	setWordCount(wordCount(text));
});

setInitialDOM();
