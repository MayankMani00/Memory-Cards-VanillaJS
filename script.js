const cardsContainer = $('#cards-container');
const addContainer = $('#add-container');

const prevBtn = $('#prev');
const nextBtn = $('#next');
const showBtn = $('#show');
const hideBtn = $('#hide');
const clearBtn = $('#clear');
const addCardBtn = $('#add-card');

const currentEl = $('#current');
const questionEl = $('#question');
const answerEl = $('#answer');

let currentActiveCard = 0;

const cardsEl = [];

const cardsData = getCardsData();

//Gets data from localstorage
function getCardsData() {
	const cards = localStorage.getItem('cards');
	// console.log(JSON.parse(cards));
	return cards.length === 0 ? [] : JSON.parse(cards);
}

//Add cards to local storage
function setCardsData(cards) {
	localStorage.setItem('cards', JSON.stringify(cards));
	window.location.reload();
}

//Create all cards
function createCards() {
	if (cardsData !== null)
		cardsData.forEach((data, index) => createCard(data, index));
}

//Create a single card
function createCard(data, index) {
	const card = document.createElement('div');
	card.classList.add('card');
	card.innerHTML = `<div class="inner-card">
                        <div class="inner-card-front">
                            <p>${data.question}</p>
                        </div>
                        <div class="inner-card-back">
                            <p>${data.answer}</p>
                        </div>
                    </div>
            `;

	card.addEventListener('click', () => card.classList.toggle('show-answer'));

	if (index === 0) card.classList.add('active');

	//Add to cards Element in DOM
	cardsEl.push(card);
	cardsContainer[0].appendChild(card);

	updateCurrentText();
	// localStorage.setItem('cards', card);
}

//Show card no/ total cards
function updateCurrentText() {
	currentEl[0].innerText = `${currentActiveCard + 1}/ ${cardsEl.length}`;
}

//EVENT LISTENERS

//Shows next card
nextBtn.click(() => {
	cardsEl[currentActiveCard].className = 'card left';

	if (currentActiveCard < cardsEl.length - 1) currentActiveCard++;
	cardsEl[currentActiveCard].className = 'card active';

	updateCurrentText();
});

//Shows previous card
prevBtn.click(() => {
	cardsEl[currentActiveCard].className = 'card right';

	if (currentActiveCard > 0) currentActiveCard--;
	cardsEl[currentActiveCard].className = 'card active';

	updateCurrentText();
});

//Show/hide add card container
showBtn.click(() => addContainer[0].classList.add('show'));
hideBtn.click(() => addContainer[0].classList.remove('show'));

//Adds new card
addCardBtn.click(() => {
	const question = questionEl[0].value;
	const answer = answerEl[0].value;
	if (question.trim() && answer.trim()) {
		const newCard = { question, answer };

		createCard(newCard);

		questionEl[0].value = '';
		answerEl[0].value = '';
		addContainer[0].classList.remove('show');

		cardsData.push(newCard);

		setCardsData(cardsData);
	}
});

//clear all the data
clearBtn.click(() => {
	localStorage.setItem('cards', '');
	window.location.reload();
});

createCards();
