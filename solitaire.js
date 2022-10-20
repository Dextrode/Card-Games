const SUITS = ["♥", "♦", "♣", "♠"];
const VALUES = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
];

// Deck class for all cards
// Encapsulates anything that deals with a pile of cards
export default class Deck {
    // initialize the cards (objects)
    constructor(cards = freshDeck()) {
        this.cards = cards;
    }

    // Makes it so we dont need to type "this.cards.length"
    get numberOfCards() {
        return this.cards.length;
    }

    // Takes first card in array, takes off and returns it
    pop() {
        return this.cards.shift();
    }

    // Adds card to the bottom of array
    push(card) {
        this.cards.push(card);
    }

    shuffle() {
        // Will randomize but not perfectly
        // this.cards.sort((a, b) => Math.random() - .5)
        // Going from back of list(- 1) to the front
        for (let i = this.numberOfCards - 1; i > 0; i--) {
            // Gives placement in index that is somewhere else (Math.random)
            // Makes sure it is an integer (Math.floor)
            // newIndex will be a card we haven't accessed
            const newIndex = Math.floor(Math.random() * (i + 1));

            // Swap the card we are currently on with new card from i
            // Need access to old value before we override it
            const oldValue = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldValue;
        }
    }
}

export class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    }

    get color() {
        // If it is those suits set to black, if not set to red
        return this.suit === "♣" || this.suit === "♠" ? "black" : "red";
    }

    getHTML() {
        // Creates card div
        const card = document.createElement("div");

        //Sets inner html to the suit
        card.innerHTML = this.suit;

        // add card and the color to div's class
        card.classList.add("card", this.color);

        // set the data-value to value and suit
        card.dataset.value = `${this.value}${this.suit}`;
        return card;
    }
}

function freshDeck() {
    //flatMap condensenses the array to all 52 cards
    return SUITS.flatMap((suit) => {
        return VALUES.map((value) => {
            return new Card(suit, value);
        });
    });
}

/* ---------------------------- Solitaire New ---------------- */

const board = document.querySelector(".board");

// Gives the values to cards
const CARD_VALUE_MAP = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 1,
};

const stockDeckElement = document.querySelector(".stock-deck");
const stockDeckBase = document.querySelector(".stock");

const tableauDeckElement = document.querySelector(".tableau-deck");
// const tableauCardSlot = document.querySelector(".tableau");
const tableauCardSlots = document.querySelector(".tableaus");

const foundationSlot = document.querySelector(".foundation");
const wastePile = document.querySelector(".waste-pile");

let tableauDeck, stockDeck;
let stockDeckArray = [];
let tableauDeckArray = [];


function startGame() {
    const deck = new Deck();
    deck.shuffle();

    const solitaireMidpoint = Math.ceil(deck.numberOfCards - 24);

    tableauDeck = new Deck(deck.cards.slice(0, solitaireMidpoint));
    stockDeck = new Deck(
        deck.cards.slice(solitaireMidpoint, deck.numberOfCards),
    );

    for (let i = 0; i < 7; i++) {
        var tableauCardSlot = document.createElement("div");
        tableauCardSlot.classList.add("tableau", "card-slot");
        tableauCardSlots.appendChild(tableauCardSlot);
    }

    for (let i = 0; i < tableauDeck.cards.length; i++) {
        console.log(tableauDeck.cards.length);
        tableauCardSlot.appendChild(tableauDeck.cards[i].getHTML());
    }
}

stockDeckBase.addEventListener("click", () => {
    flipCards();
});

function flipCards() {
    const stockCard = stockDeck.pop();
    stockDeckElement.appendChild(stockCard.getHTML());
}

startGame();

console.log(tableauDeck);
console.log(stockDeck);
